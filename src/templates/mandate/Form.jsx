import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Alert, SafeAreaView, ScrollView, Text, View } from "react-native";
import { getUniqueId } from "react-native-device-info";
import { NetworkInfo } from "react-native-network-info";
import { useDispatch, useSelector } from "react-redux";
import { getBackendData, putBackendData } from "../../services/employees/employeeServices";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import {
  addData,
  addVerifyMsg,
  addVerifyStatus,
  addVerifyTimestamp,
  resetMandate,
} from "../../store/slices/mandateSlice";
import { styles } from "../../styles";
import { showToast } from "../../components/atoms/Toast";
import {
  createMandateOrder,openRazorpayCheckout
} from "../../services/mandate/Razorpay/services";
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
    if (deviceId !== 0 && ipAddress !== 0) {
      setFetched(true);
    }
  }, [deviceId, ipAddress]);

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
    return putBackendData({
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
      .then((res) => {
        console.log("mandatePush res.data: ", res.data);
        if (res.data.status === 200){
          setVerifyStatus(verifyStatus);
        }
        else{
          setVerifyStatus(res.data.verifyStatus);
        }
        throw res.data;
      })
      .catch((error) => {
        console.log("mandatePush error: ", error);
        throw error;
      });
  };

  const refreshMandateFromBackend = () => {
    getBackendData({
      params: { unipeEmployeeId: unipeEmployeeId },
      xpath: "mandate",
      token: token,
    })
      .then((res) => {
        console.log("Form mandateFetch response.data", res.data);
        dispatch(resetMandate(res?.data?.body));
        dispatch(addVerifyStatus(res?.data?.body?.verifyStatus));
        setVerifyStatus(res?.data?.body?.verifyStatus);
      })
  }

  const initiateRazorpayCheckout = async ({customerId, orderId, notes}) => {
    let verifyMsg;
    try {
      let res = await openRazorpayCheckout({
        customerId,
        orderId,
        notes,
        description: "Unipe Mandate Verification",
        prefill: {
          name: accountHolderName,
          email: email,
          contact: phoneNumber,
        },
        extraParams: {
          recurring: "1",
        }
      })
      console.log("Mandate Checkout Success", res);
      Analytics.trackEvent("Mandate|Authorize|InProgress|Checkout|Success", {
        unipeEmployeeId: unipeEmployeeId,
      });
      verifyMsg = "Mandate Initiated from App Checkout Success";
    } catch (error) {
      console.log("Mandate Checkout Error", error);
      Analytics.trackEvent("createOrderandate|Authorize|InProgress|Checkout|Error", {
        unipeEmployeeId: unipeEmployeeId,
      });
      verifyMsg =  JSON.stringify(error);
    } finally {
      setModalVisible(true);
      backendPush({
        data: {
          orderId,
          customerId
        },
        verifyMsg,
        verifyStatus: "INPROGRESS",
        verifyTimestamp: Date.now(),
      })
      .then(() => {})
      .catch((error) => {
        setModalVisible(false);
        Alert("Error", error);
      });
    };
  }

  const ProceedButton = async ({ authType }) => {
    console.log("proceed button pressed", authType)
    setLoading(true);
    setAuthType(authType);
    try {
      const res = await createMandateOrder({
        authType,
        unipeEmployeeId,
        token
      })
      const createOrderResponse = res.data;
      console.log(`Mandate|CreateOrder|${authType} res.data:`, createOrderResponse);
      if (createOrderResponse.status === 200) {
        let razorpayOrder = createOrderResponse.body
        
        Analytics.trackEvent(`Mandate|CreateOrder|${authType}|Success`, {
          unipeEmployeeId: unipeEmployeeId,
        });
        await initiateRazorpayCheckout({
          orderId: razorpayOrder.id,
          customerId: razorpayOrder.customer_id,
          notes: razorpayOrder.notes
        })  
      } else {
        throw createOrderResponse
      }
    } catch (error) {
      console.log("error", error)
      if (error?.status === 409) {
        Alert.alert("Create Mandate Error", "Mandate Registration Process already started, Please check the status after sometime");
        refreshMandateFromBackend();
      } else {
        Alert.alert("Create Order Error", JSON.stringify(error));
      }
      Analytics.trackEvent(`Mandate|CreateOrder|${authType}|Error`, {
        unipeEmployeeId: unipeEmployeeId,
        error: JSON.stringify(error),
      });
    } finally {
      setAuthType("");
      setLoading(false);
    }
  };

  const cardData = () => {
    return [
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
          {!fetched ? (
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
