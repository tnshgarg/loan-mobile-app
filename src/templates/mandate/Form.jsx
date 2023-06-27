import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import {
  Alert,
  Linking,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { getUniqueId } from "react-native-device-info";
import { NetworkInfo } from "react-native-network-info";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import RBI from "../../assets/RBI.svg";
import Shield from "../../assets/Shield.svg";
import { showToast } from "../../components/atoms/Toast";
import DetailsCard from "../../components/molecules/DetailsCard";
import MandateOptions from "../../components/molecules/MandateOptions";
import MandateLoading from "../../components/organisms/MandateLoading";
import { COLORS, FONTS } from "../../constants/Theme";
import { strings } from "../../helpers/Localization";
import { openRazorpayCheckout } from "../../services/mandate/Razorpay/services";
import { createMandateOrder } from "../../services/mandate/services";
import {
  useGetMandateQuery,
  useUpdateMandateMutation,
} from "../../store/apiSlices/mandateApi";
import {
  addData,
  addVerifyMsg,
  addVerifyStatus,
  addVerifyTimestamp,
  resetMandate,
} from "../../store/slices/mandateSlice";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { styles } from "../../styles";
import Analytics, {
  InteractionTypes,
} from "../../helpers/analytics/commonAnalytics";
import PoweredByTag from "../../components/atoms/PoweredByTag";

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
  const [updateMandate] = useUpdateMandateMutation();
  const { mandateData, error, isLoading } = useGetMandateQuery(
    unipeEmployeeId,
    {
      pollingInterval: 1000 * 60 * 2,
    }
  );
  useEffect(() => {
    getUniqueId().then((id) => {
      setDeviceId(id);
    });
    NetworkInfo.getIPV4Address().then((ipv4Address) => {
      setIpAdress(ipv4Address);
    });
    dispatch(addCurrentScreen("Mandate"));
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
      showToast("Mandate verified successfully", "success");
      setModalVisible(false);
      navigation.navigate("EWA_AGREEMENT");
    } else if (fetched && props?.type === "EWA" && verifyStatus === "ERROR") {
      showToast("Mandate verification error", "warning");
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
    let payload = {
      unipeEmployeeId: unipeEmployeeId,
      ipAddress: ipAddress,
      deviceId: deviceId,
      data: data,
      verifyMsg: verifyMsg,
      verifyStatus: verifyStatus,
      verifyTimestamp: verifyTimestamp,
      campaignId: campaignId,
    };
    return updateMandate(payload)
      .then((res) => {
        console.log("mandatePush res: ", res.error.data.error);
        if (res.status === 200) {
          setVerifyStatus(verifyStatus);
        } else {
          setVerifyStatus(res.error.data.error.verifyStatus);
          throw res.error;
        }
      })
      .catch((error) => {
        console.log("mandatePush error: ", error);
        throw error;
      });
  };

  const refreshMandateFromBackend = () => {
    if (mandateData && !isLoading && !error) {
      console.log("Form mandateFetch response.data", mandateData);
      dispatch(resetMandate(mandateData?.data?.body));
      setVerifyStatus(mandateData?.data?.body?.verifyStatus);
    }
  };

  const initiateCashfreeCheckout = async ({ upiIntent }) => {
    let verifyMsg;
    Linking.openURL(upiIntent)
      .then(() => {
        setModalVisible(true);
        verifyMsg = "Mandate Initiated from App Intent Success";
        backendPush({
          verifyMsg,
          verifyStatus: "INPROGRESS",
          verifyTimestamp: Date.now(),
        })
          .then(() => {})
          .catch((error) => {
            setModalVisible(false);
            Alert.alert("Error", error?.message || "Something went wrong");
          });
      })
      .catch((error) => {
        setModalVisible(false);
        Alert.alert("Error", error?.message || "Something went wrong");
      });
  };

  
  const initiateRazorpayCheckout = async ({ customerId, orderId, notes }) => {
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
        },
      });
      console.log("Mandate Checkout Success", res);
      Analytics.trackEvent({
        interaction: InteractionTypes.BUTTON_PRESS,
        component: "Mandate",
        action: "AuthorizeCheckout",
        status: "Success",
      });
      verifyMsg = "Mandate Initiated from App Checkout Success";
    } catch (error) {
      console.log("Mandate Checkout Error", error);
      Analytics.trackEvent({
        interaction: InteractionTypes.BUTTON_PRESS,
        component: "Mandate",
        action: "AuthorizeCheckout",
        status: "Checkout|Error",
      });
      verifyMsg = error.message;
    } finally {
      setModalVisible(true);
      backendPush({
        data: {
          orderId,
          customerId,
        },
        verifyMsg,
        verifyStatus: "INPROGRESS",
        verifyTimestamp: Date.now(),
      })
        .then(() => {})
        .catch((error) => {
          setModalVisible(false);
          Alert.alert("Error", error?.message || "Something went wrong");
        });
    }
  };

  const ProceedButton = async ({ authType, provider = "razorpay" , app = ""}) => {
    console.log("proceed button pressed", authType);
    setLoading(true);
    setAuthType(authType);
    try {
      const res = await createMandateOrder({
        authType,
        unipeEmployeeId,
        token,
        provider,
      });
      const createOrderResponse = res?.data;
      console.log(
        `Mandate|CreateOrder|${authType} res.data:`,
        createOrderResponse
      );
      if (createOrderResponse.status === 200) {
        let order = createOrderResponse.body;
        Analytics.trackEvent({
          interaction: InteractionTypes.BUTTON_PRESS,
          component: "Mandate",
          action: `CreateOrder_${authType}`,
          status: "Success",
        });
        if (provider == "razorpay") {
          await initiateRazorpayCheckout({
            orderId: order.id,
            customerId: order.customer_id,
            notes: order.notes,
          });
        } else if (provider == "cashfree") {
          await initiateCashfreeCheckout({
            upiIntent:
              order.authPaymentData.upiIntentData.androidAuthAppLinks[app],
          });
        }
      } else {
        throw createOrderResponse;
      }
    } catch (error) {
      console.log("Create Mandate Error: ", error);
      if (error?.status === 409) {
        Alert.alert(
          "Create Mandate Error",
          "Mandate Registration Process already started, Please check the status after sometime"
        );
        refreshMandateFromBackend();
      } else {
        Alert.alert("Create Order Error", error.message);
      }
      Analytics.trackEvent({
        interaction: InteractionTypes.BUTTON_PRESS,
        component: "Mandate",
        action: `CreateOrder:${authType}`,
        status: "Error",
        error: error.message,
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
              {strings.choosePreferredMode}
            </Text>
          )}
          {!fetched ? (
            <Text style={{ ...FONTS.body4, color: COLORS.gray }}>
              {strings.initializing}
            </Text>
          ) : verifyStatus === "INPROGRESS" ? (
            <Text style={{ ...FONTS.body4, color: COLORS.black }}>
              {strings.mandateRegistrationInProgress}
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
              {strings.MandateRequired}
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
                {strings.secured}
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
                {strings.rbiApproved}
              </Text>
            </View>
          </View>
          <PoweredByTag
            image={[
              require("../../assets/rzp.png"),
              require("../../assets/cf.png"),
            ]}
            title="RBI regulated payment partners"
          />
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
