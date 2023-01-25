import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Alert, SafeAreaView, ScrollView, Text, View } from "react-native";
import { getUniqueId } from "react-native-device-info";
import { NetworkInfo } from "react-native-network-info";
import { useDispatch, useSelector } from "react-redux";
import RazorpayCheckout from "react-native-razorpay";
import { putBackendData } from "../../services/employees/employeeServices";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import {
  addData,
  addVerifyMsg,
  addVerifyStatus,
  addVerifyTimestamp,
} from "../../store/slices/mandateSlice";
import { styles } from "../../styles";
import { showToast } from "../../components/atoms/Toast";
import {
  createCustomer,
  createOrder,
  getPaymentState,
} from "../../services/mandate/Razorpay/services";
import { RZP_KEY_ID } from "../../services/constants";
import { COLORS, FONTS } from "../../constants/Theme";
import Analytics from "appcenter-analytics";
import DetailsCard from "../../components/molecules/DetailsCard";
import MandateOptions from "../../components/molecules/MandateOptions";
import Shield from "../../assets/Shield.svg";
import RBI from "../../assets/RBI.svg";
import MandateLoading from "../../components/organisms/MandateLoading";

const MandateFormTemplate = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [deviceId, setDeviceId] = useState(0);
  const [ipAddress, setIpAdress] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const [fetched, setFetched] = useState(false);

  const token = useSelector((state) => state.auth?.token);
  const unipeEmployeeId = useSelector((state) => state.auth?.unipeEmployeeId);
  const aCTC = useSelector((state) => state.auth?.aCTC);
  const phoneNumber = useSelector((state) => state.auth?.phoneNumber);
  const email = useSelector(
    (state) => state.profile?.email || state.pan?.data?.email
  );
  const accountHolderName = useSelector(
    (state) => state.bank?.data?.accountHolderName
  );
  const accountNumber = useSelector((state) => state.bank?.data?.accountNumber);
  const ifsc = useSelector((state) => state.bank?.data?.ifsc);
  const mandateSlice = useSelector((state) => state.mandate);
  const [loading, setLoading] = useState(false);
  const [authType, setAuthType] = useState();
  const [customerId, setCustomerId] = useState(mandateSlice?.data?.customerId);
  const [orderId, setOrderId] = useState(null);
  const [data, setData] = useState(mandateSlice?.data);
  const [verifyMsg, setVerifyMsg] = useState(mandateSlice?.verifyMsg);
  const [verifyStatus, setVerifyStatus] = useState(mandateSlice?.verifyStatus);
  const [verifyTimestamp, setVerifyTimestamp] = useState(
    mandateSlice?.verifyTimestamp
  );
  const campaignId = useSelector(
    (state) =>
      state.campaign.ewaCampaignId || state.campaign.onboardingCampaignId
  );

  useEffect(() => {
    getUniqueId().then((id) => {
      setDeviceId(id);
    });
    NetworkInfo.getIPV4Address().then((ipv4Address) => {
      setIpAdress(ipv4Address);
    });
  }, []);

  useEffect(() => {
    if (deviceId !== 0 && ipAddress !== 0 && customerId) {
      setFetched(true);
    }
  }, [deviceId, ipAddress, customerId]);

  useEffect(() => {
    dispatch(addData(data));
  }, [data]);

  useEffect(() => {
    dispatch(addVerifyMsg(verifyMsg));
  }, [verifyMsg]);

  useEffect(() => {
    dispatch(addVerifyStatus(verifyStatus));
    if (fetched && props?.type === "EWA" && verifyStatus === "SUCCESS") {
      showToast("Mandate verified successfully");
      setModalVisible(false);
      navigation.navigate("EWA_AGREEMENT");
    } else if (fetched && props?.type === "EWA" && verifyStatus === "ERROR") {
      showToast("Mandate verification error");
      setModalVisible(false);
      navigation.navigate("EWA_MANDATE");
    }
  }, [verifyStatus]);

  useEffect(() => {
    dispatch(addVerifyTimestamp(verifyTimestamp));
  }, [verifyTimestamp]);

  const backendPush = ({ data, verifyMsg, verifyStatus, verifyTimestamp }) => {
    console.log("mandateSlice: ", mandateSlice);
    setData(data);
    setVerifyMsg(verifyMsg);
    setVerifyTimestamp(verifyTimestamp);
    putBackendData({
      data: {
        unipeEmployeeId: unipeEmployeeId,
        ipAddress: ipAddress,
        deviceId: deviceId,
        data: data,
        verifyMsg: verifyMsg,
        verifyStatus: verifyStatus,
        verifyTimestamp: verifyTimestamp,
        campaignId: campaignId,
      },
      xpath: "mandate",
      token: token,
    })
      .then((response) => {
        console.log("mandatePush response: ", response.data);
        if (response.data.status === 200){
          console.log("mandatePush pushed");
          setVerifyStatus(verifyStatus);
        }
        else{
          console.log("mandatePush not expected");
          setVerifyStatus(response.data.verifyStatus);
        }
      })
      .catch((error) => {
        console.log("mandatePush error: ", error);
        return error;
      });
  };

  useEffect(() => {
    console.log("createCustomer customerId: ", customerId, !customerId);
    if (!customerId) {
      try {
        createCustomer({
          name: accountHolderName,
          email: email,
          contact: phoneNumber,
          unipeEmployeeId: unipeEmployeeId,
        })
          .then((res) => {
            console.log("createCustomer res.data: ", res.data);
            setCustomerId(res.data.id);
            Analytics.trackEvent("Mandate|CreateCustomer|Success", {
              unipeEmployeeId: unipeEmployeeId,
            });
          })
          .catch((error) => {
            console.log("createCustomer Catch Error: ", error.toString());
            Alert.alert("Error", error.toString());
            Analytics.trackEvent("Mandate|CreateCustomer|Error", {
              unipeEmployeeId: unipeEmployeeId,
              error: error.toString(),
            });
          });
      } catch (error) {
        console.log("createCustomer Try Catch Error: ", error.toString());
        Alert.alert("Error", error.toString());
        Analytics.trackEvent("Mandate|CreateCustomer|Error", {
          unipeEmployeeId: unipeEmployeeId,
          error: error.toString(),
        });
      }
    }
  }, [customerId]);

  useEffect(() => {
    console.log("createMandate orderId: ", orderId, !orderId);
    if (orderId) {
      var options = {
        description: "Unipe Mandate Verification",
        name: "Unipe",
        key: RZP_KEY_ID,
        order_id: orderId,
        customer_id: customerId,
        recurring: "1",
        prefill: {
          name: accountHolderName,
          email: email,
          contact: phoneNumber,
        },
        theme: { color: COLORS.primary },
        notes: { unipeEmployeeId: unipeEmployeeId },
        // callback_url: "https://eooylq2n69q46f9.m.pipedream.net",
      };

      RazorpayCheckout.open(options)
        .then((data) => {
          console.log("mandate checkout:", data, options);
          backendPush({
            data: {
              authType: authType,
              customerId: customerId,
              orderId: orderId,
              paymentId: data.razorpay_payment_id,
              paymentSignature: data.razorpay_signature,
              provider: "razorpay",
            },
            verifyMsg: "Mandate Initiated from App Checkout Success",
            verifyStatus: "INPROGRESS",
            verifyTimestamp: Date.now(),
          });
          setLoading(false);
          Analytics.trackEvent("Mandate|Authorize|InProgress|Checkout|Success", {
            unipeEmployeeId: unipeEmployeeId,
          });
        })
        .catch((error) => {
          console.log("mandate checkout error :", error);
          backendPush({
            data: {
              authType: authType,
              customerId: customerId,
              orderId: orderId,
              provider: "razorpay",
            },
            verifyMsg: "Mandate Initiated from App Checkout Error",
            verifyStatus: "INPROGRESS",
            verifyTimestamp: Date.now(),
          });
          setLoading(false);
          Analytics.trackEvent("Mandate|Authorize|InProgress|Checkout|Error", {
            unipeEmployeeId: unipeEmployeeId,
          });
        })
    }
  }, [orderId]);

  const ProceedButton = ({ authType }) => {
    setLoading(true);
    setAuthType(authType);

    createOrder({
      authType: authType,
      customerId: customerId,
      accountHolderName: accountHolderName,
      accountNumber: accountNumber,
      ifsc: ifsc,
      aCTC: aCTC,
      unipeEmployeeId: unipeEmployeeId,
    })
      .then((res) => {
        console.log(`Mandate|CreateOrder|${authType} res.data:`, res.data);
        setOrderId(res.data.id);
        backendPush({
          data: {
            authType: authType,
            customerId: customerId,
            orderId: res.data.id,
          },
          verifyMsg: `Mandate|CreateOrder|${authType} SUCCESS`,
          verifyStatus: "INPROGRESS",
          verifyTimestamp: Date.now(),
        });
        setModalVisible(true);
        Analytics.trackEvent(`Mandate|CreateOrder|${authType}|Success`, {
          unipeEmployeeId: unipeEmployeeId,
        });
        setAuthType("");
      })
      .catch((error) => {
        console.log(
          `Mandate|CreateOrder|${authType} JSON.stringify(error):`,
          JSON.stringify(error)
        );
        console.log(`Mandate|CreateOrder|${authType} error:`, error.toString());
        Alert.alert("Error", error.toString());
        backendPush({
          data: { authType: authType, customerId: customerId },
          verifyMsg: `Mandate|CreateOrder|${authType} ERROR ${error.toString()}`,
          verifyStatus: "ERROR",
          verifyTimestamp: Date.now(),
        });
        Analytics.trackEvent(`Mandate|CreateOrder|${authType}|Error`, {
          unipeEmployeeId: unipeEmployeeId,
          error: error.toString(),
        });
        setAuthType("");
      });
  };

  const cardData = () => {
    var res = [
      {
        subTitle: "Account Holder Name",
        value: accountHolderName,
        fullWidth: true,
      },
      {
        subTitle: "Bank Account No*",
        value: accountNumber,
        fullWidth: true,
      },
      {
        subTitle: "IFSC code",
        value: ifsc,
        fullWidth: true,
      },
    ];
    return res;
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingWrapper>
        <ScrollView showsVerticalScrollIndicator={false}>
          <DetailsCard data={cardData()} />
          {verifyStatus != "INPROGRESS" && (
            <Text
              style={{ ...FONTS.body4, color: COLORS.gray, marginVertical: 10 }}
            >
              Please choose your preferred mode
            </Text>
          )}
          {customerId === null || !fetched ? (
            <Text style={{ ...FONTS.body4, color: COLORS.gray }}>
              Initializing ...
            </Text>
          ) : verifyStatus === "INPROGRESS" ? (
            <Text style={{ ...FONTS.body4, color: COLORS.black }}>
              Your Mandate Registration is currently in progress.
            </Text>
          ) : verifyStatus === "SUCCESS" ? null : (
            <MandateOptions
              ProceedButton={ProceedButton}
              disabled={loading}
              authType={authType}
            />
          )}
          <View
            style={{
              padding: 10,
              backgroundColor: COLORS.lightGray,
              marginVertical: 10,
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "center",
              marginTop: "10%",
            }}
          >
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.gray,
                marginBottom: 5,
                textAlign: "center",
              }}
            >
              Mandate is required to auto-debit loan payments on Due Date. This
              is 100% secure and executed by an RBI approved entity.
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              padding: 10,
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <Shield />
              <Text
                style={{ ...FONTS.body4, color: COLORS.gray, marginTop: 5 }}
              >
                100% Secure
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <RBI />
              <Text
                style={{ ...FONTS.body4, color: COLORS.gray, marginTop: 5 }}
              >
                RBI Approved
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingWrapper>
      {modalVisible && (
        <MandateLoading
          {...props}
          setMandateVerifyStatus={setVerifyStatus}
          mandateVerifyStatus={verifyStatus}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </SafeAreaView>
  );
};

export default MandateFormTemplate;
