import { STAGE } from "@env";
import { MaterialIcons } from "@expo/vector-icons";
import CheckBox from "@react-native-community/checkbox";
import { useNavigation } from "@react-navigation/core";
import Analytics from "appcenter-analytics";
import { useEffect, useState } from "react";
import {
  Alert, Dimensions,
  Pressable, SafeAreaView,
  Text,
  TextInput,
  View
} from "react-native";
import { getUniqueId } from "react-native-device-info";
import Modal from "react-native-modal";
import { NetworkInfo } from "react-native-network-info";
import StepIndicator from "react-native-step-indicator";
import { AntDesign } from "react-native-vector-icons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { WebView } from "react-native-webview";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../../components/atoms/Header";
import PrimaryButton from "../../../../components/PrimaryButton";
import { COLORS } from "../../../../constants/Theme";
import { ewaOfferPush } from "../../../../helpers/BackendPush";
import { addLoanAmount } from "../../../../store/slices/ewaLiveSlice";
import { checkBox, styles, welcome } from "../../../../styles";
import TnC from "../../../../templates/docs/EWATnC.js";

const Offer = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [fetched, setFetched] = useState(false);
  const [deviceId, setDeviceId] = useState(0);
  const [ipAddress, setIpAdress] = useState(0);

  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [validAmount, setValidAmount] = useState(true);

  const unipeEmployeeId = useSelector((state) => state.auth.id);
  const ewaLiveSlice = useSelector((state) => state.ewaLive);
  const offerId = useSelector((state) => state.ewaLive.offerId);
  const eligibleAmount = useSelector((state) => state.ewaLive.eligibleAmount);
  const [isTermsOfUseModalVisible, setIsTermsOfUseModalVisible] =
    useState(false);
  const [amount, setAmount] = useState(ewaLiveSlice?.eligibleAmount.toString());

  useEffect(() => {
    getUniqueId().then((id) => {
      setDeviceId(id);
    });
    NetworkInfo.getIPV4Address().then((ipv4Address) => {
      setIpAdress(ipv4Address);
    });
  }, []);

  useEffect(() => {
    if (deviceId !== 0 && ipAddress !== 0) {
      setFetched(true);
    }
  }, [deviceId, ipAddress]);

  useEffect(() => {
    if (parseInt(amount) <= eligibleAmount) {
      if (STAGE !== "prod" || (STAGE === "prod" && parseInt(amount) > 999)) {
        setValidAmount(true);
        dispatch(addLoanAmount(parseInt(amount)));
      } else {
        setValidAmount("false");
      }
    } else {
      setValidAmount("false");
    }
  }, [amount]);

  useEffect(() => {
    if (fetched) {
      ewaOfferPush({
        offerId: offerId,
        unipeEmployeeId: unipeEmployeeId,
        status: "INPROGRESS",
        timestamp: Date.now(),
        ipAddress: ipAddress,
        deviceId: deviceId,
      })
        .then((response) => {
          console.log("ewaOfferPush response.data: ", response.data);
        })
        .catch((error) => {
          console.log("ewaOfferPush error: ", error);
          Alert.alert("An Error occured", error);
        });
    }
  }, [fetched]);

  function handleAmount() {
    setLoading(true);
    if (validAmount) {
      ewaOfferPush({
        offerId: offerId,
        unipeEmployeeId: unipeEmployeeId,
        status: "CONFIRMED",
        timestamp: Date.now(),
        ipAddress: ipAddress,
        deviceId: deviceId,
        loanAmount: parseInt(amount),
      })
        .then((response) => {
          console.log("ewaOfferPush response.data: ", response.data);
          Analytics.trackEvent("Ewa|OfferPush|Success", {
            userId: unipeEmployeeId,
          });
          navigation.navigate("EWA_KYC");
          setLoading(false);
        })
        .catch((error) => {
          console.log("ewaOfferPush error: ", error);
          Analytics.trackEvent("Ewa|OfferPush|Error", {
            userId: unipeEmployeeId,
            error: error
          });
          Alert.alert("An Error occured", error);
        });
    }
  }

  const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
    const iconConfig = {
      color: "white",
      size: 18,
      name: "check",
    };
    return iconConfig;
  };

  const renderStepIndicator = (params) => (
    <MaterialIcons {...getStepIndicatorIconConfig(params)} />
  );

  const data = ["KYC", "Agreement", "Money In Account"];

  const stepIndicatorStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeWidth: 3,
    separatorStrokeFinishedWidth: 2,
    stepStrokeFinishedColor: "#aaaaaa",
    stepStrokeUnFinishedColor: "#006400",
    separatorFinishedColor: "#aaaaaa",
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: "#006400",
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: "#ffffff",
    stepIndicatorLabelFontSize: 14,
    currentStepIndicatorLabelFontSize: 14,
    stepIndicatorLabelCurrentColor: "#006400",
    stepIndicatorLabelFinishedColor: "#006400",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "black",
    labelSize: 14,
    labelAlign: "flex-start",
  };

  return (
    <SafeAreaView style={[styles.container, { padding: 0 }]}>
      <Header
        title="On Demand Salary"
        onLeftIconPress={() => navigation.navigate("Home")}
      />
      <View style={styles.container}>
        <View style={{ flexDirection: "column" }}>
          <View
            style={{
              flexDirection: "row",
              width: "50%",
              paddingBottom: 10,
              alignSelf: "center",
            }}
          >
            <Icon
              name="currency-inr"
              color="green"
              size={32}
              style={{ marginTop: 8, marginRight: 10 }}
            />

            <TextInput
              style={{
                fontSize: 32,
                color: "green",
                borderWidth: 1,
                width: "60%",
              }}
              keyboardType="numeric"
              textAlign={"center"}
              value={amount}
              onChangeText={setAmount}
              isFocused={true}
            />
          </View>
          <Text
            style={{
              fontSize: 14,
              alignSelf: "center",
              color: "#0D2A4E",
              marginTop: 10,
            }}
          >
            You can choose between 1000 to {eligibleAmount}
          </Text>
        </View>

        <Text
          style={{
            fontSize: 20,
            alignSelf: "center",
            fontWeight: "bold",
            color: "#0D2A4E",
            marginTop: 10,
          }}
        >
          Steps to Cash
        </Text>
        <View style={welcome.steps}>
          <StepIndicator
            customStyles={stepIndicatorStyles}
            stepCount={3}
            direction="vertical"
            currentPosition={5}
            renderStepIndicator={renderStepIndicator}
            labels={data}
          />
        </View>

        {/* <Checkbox
        text={"I agree to the Terms and Conditions."}
        value={consent}
        setValue={setConsent}
      /> */}
        <View style={{ flexDirection: "row" }}>
          <CheckBox
            value={consent}
            onValueChange={setConsent}
            style={checkBox.checkBox}
            tintColors={{ true: COLORS.primary }}
          />
          <Text style={checkBox.checkBoxText}>
            I agree to the
            <Text
              onPress={() => setIsTermsOfUseModalVisible(true)}
              style={styles.termsText}
            >
              {" "}
              Terms and Conditions
            </Text>
            .
          </Text>
        </View>
        <PrimaryButton
          title={loading ? "Processing" : "Continue"}
          disabled={loading || !consent || !validAmount}
          onPress={() => {
            handleAmount();
          }}
        />
      </View>

      <Modal
        isVisible={isTermsOfUseModalVisible}
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
        }}
      >
        <Pressable
          onPress={() => setIsTermsOfUseModalVisible(false)}
          style={{
            position: "absolute",
            top: 30,
            right: 50,
            zIndex: 999,
          }}
        >
          <AntDesign name="closesquareo" size={24} color="black" />
        </Pressable>
        <View
          style={{
            height: Dimensions.get("window").height - 100,
            width: Dimensions.get("window").width - 40,
            backgroundColor: "white",
            borderRadius: 5,
          }}
        >
          <WebView
            style={{ flex: 1 }}
            containerStyle={{ padding: 10 }}
            originWhitelist={["*"]}
            source={{ html: TnC }}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Offer;
