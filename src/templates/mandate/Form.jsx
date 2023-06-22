import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Alert, SafeAreaView, ScrollView, Text } from "react-native";
import { getUniqueId } from "react-native-device-info";
import { NetworkInfo } from "react-native-network-info";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import HelpCard from "../../components/atoms/HelpCard";
import InfoCard from "../../components/atoms/InfoCard";
import { showToast } from "../../components/atoms/Toast";
import MandateOptions from "../../components/molecules/MandateOptions";
import MandateLoading from "../../components/organisms/MandateLoading";
import { COLORS, FONTS } from "../../constants/Theme";
import { strings } from "../../helpers/Localization";
import Analytics, {
  InteractionTypes,
} from "../../helpers/analytics/commonAnalytics";
import { EWA_POLLING_DURATION, KYC_POLLING_DURATION } from "../../services/constants";
import {
  createMandateOrder,
  openRazorpayCheckout,
} from "../../services/mandate/Razorpay/services";
import { useGetKycQuery } from "../../store/apiSlices/kycApi";
import {
  useGetMandateQuery,
  useUpdateMandateMutation,
} from "../../store/apiSlices/mandateApi";
import {
  addVerifyStatus
} from "../../store/slices/mandateSlice";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { styles } from "../../styles";
const MandateFormTemplate = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [deviceId, setDeviceId] = useState(0);
  const [ipAddress, setIpAdress] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [fetched, setFetched] = useState(false);
  const unipeEmployeeId = useSelector((state) => state.auth?.unipeEmployeeId);
  const token = useSelector((state) => state.auth?.token);
  const phoneNumber = useSelector((state) => state.auth?.phoneNumber);

  const { data: kycData, isLoading: kycLoading } = useGetKycQuery(
    unipeEmployeeId,
    {
      pollingInterval: KYC_POLLING_DURATION,
    }
  );

  const { aadhaar, pan, bank, profile } = kycData ?? {};

  const email = profile?.email || pan?.data?.email;
  console.log({ bank });

  const { accountHolderName, accountNumber, ifsc, bankName } = bank?.data ?? {};

  const {
    data: mandateData,
    isLoading: mandateLoading,
    isError: mandateError,
    refetch: refreshMandateFromBackend
  } = useGetMandateQuery(unipeEmployeeId, {
    pollingInterval: EWA_POLLING_DURATION,
  });

  const [loading, setLoading] = useState(false);
  const [authType, setAuthType] = useState();
  const {verifyStatus , verifyTimestamp } = mandateData || {}
  const campaignId = useSelector(
    (state) =>
      state.campaign.ewaCampaignId || state.campaign.onboardingCampaignId
  );
  const [updateMandate] = useUpdateMandateMutation();
  useEffect(() => {
    getUniqueId().then((id) => {
      setDeviceId(id);
    });
    NetworkInfo.getIPV4Address().then((ipv4Address) => {
      setIpAdress(ipv4Address);
    });
    dispatch(addCurrentScreen("Mandate"));
    refreshMandateFromBackend().then(() => {
      setFetched(true)
    });
  }, []);

  
  useEffect(() => {
    dispatch(addVerifyStatus(verifyStatus));
    if (fetched && props?.type === "EWA" && verifyStatus === "SUCCESS") {
      showToast("Mandate verified successfully", "success");
      setModalVisible(false);
      // TODO Check props
      navigation.navigate("HomeStack");
    } else if (fetched && props?.type === "EWA" && verifyStatus === "ERROR") {
      showToast("Mandate verification error", "warning");
      setModalVisible(false);
      navigation.navigate("EWA_MANDATE");
    }
  }, [verifyStatus]);

  const backendPush = ({ data, verifyMsg, verifyStatus, verifyTimestamp }) => {
    console.log("mandateData: ", mandateData);
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
      .catch((error) => {
        console.log("mandatePush error: ", error);
        throw error;
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
        .catch((error) => {
          console.log({innerError: error})
          setModalVisible(false);
          Alert.alert("Error", error?.message || "Something went wrong");
        });
    }
  };

  const ProceedButton = async ({ authType }) => {
    console.log("proceed button pressed", authType);
    setLoading(true);
    setAuthType(authType);
    try {
      const res = await createMandateOrder({
        authType,
        unipeEmployeeId,
        token,
      });
      const createOrderResponse = res?.data;
      console.log(
        `Mandate|CreateOrder|${authType} res.data:`,
        createOrderResponse
      );
      if (createOrderResponse.status === 200) {
        let razorpayOrder = createOrderResponse.body;
        Analytics.trackEvent({
          interaction: InteractionTypes.BUTTON_PRESS,
          component: "Mandate",
          action: `CreateOrder_${authType}`,
          status: "Success",
        });
        await initiateRazorpayCheckout({
          orderId: razorpayOrder.id,
          customerId: razorpayOrder.customer_id,
          notes: razorpayOrder.notes,
        });
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
        refreshMandateFromBackend().then(() => {
          setFetched(true)
        });
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

  const lastDigitsAccount = accountNumber?.slice(0, 4);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingWrapper>
        <ScrollView showsVerticalScrollIndicator={false}>
          <InfoCard
            info={`${strings.registerMandateNote}`.replace("{{bankName}}", bankName).replace("{{lastFour}}", lastDigitsAccount)}
            infoStyle={{ ...FONTS.body3, color: COLORS.black }}
            variant={"gradient"}
          />

          {verifyStatus != "INPROGRESS" && (
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.black,
                marginVertical: 10,
              }}
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
              bankData={bank?.data}
            />
          )}
          <InfoCard
            info={
              "Mandate is required to auto-debit loan payments on Due Date. This is 100% secure and executed by an RBI approved entity."
            }
          />
          <HelpCard text="repayment methods" />
        </ScrollView>
      </KeyboardAvoidingWrapper>
      {modalVisible && (
        <MandateLoading
          {...props}
          mandateVerifyStatus={verifyStatus}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </SafeAreaView>
  );
};

export default MandateFormTemplate;
