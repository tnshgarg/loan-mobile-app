import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Alert, SafeAreaView, ScrollView, Text } from "react-native";
import { getUniqueId } from "react-native-device-info";
import { NetworkInfo } from "react-native-network-info";
import { useDispatch, useSelector } from "react-redux";
import { mandatePush } from "../../helpers/BackendPush";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import {
  addData,
  addVerifyMsg,
  addVerifyStatus,
  addVerifyTimestamp,
} from "../../store/slices/mandateSlice";
import { styles } from "../../styles";
import { showToast } from "../../components/atoms/Toast";
import RazorpayCheckout from "react-native-razorpay";
import {
  createCustomer,
  createOrder,
  getToken,
} from "../../services/mandate/Razorpay/services";
import { RZP_KEY_ID } from "../../services/constants";
import FormInput from "../../components/atoms/FormInput";
import { COLORS } from "../../constants/Theme";
import Analytics from "appcenter-analytics";
import MandateOptions from "../../components/molecules/MandateOptions";

const MandateFormTemplate = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [deviceId, setDeviceId] = useState(0);
  const [ipAddress, setIpAdress] = useState(0);

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
  const [authType, setAuthType] = useState();
  const [customerId, setCustomerId] = useState(mandateSlice?.data?.customerId);
  const [orderId, setOrderId] = useState(null);
  const [data, setData] = useState(mandateSlice?.data);
  const [verifyMsg, setVerifyMsg] = useState(mandateSlice?.verifyMsg);
  const [verifyStatus, setVerifyStatus] = useState(mandateSlice?.verifyStatus);
  const [verifyTimestamp, setVerifyTimestamp] = useState(
    mandateSlice?.verifyTimestamp
  );

  useEffect(() => {
    console.log("mandateSlice: ", mandateSlice);
    getUniqueId().then((id) => {
      setDeviceId(id);
    });
    NetworkInfo.getIPV4Address().then((ipv4Address) => {
      setIpAdress(ipv4Address);
    });
  }, []);

  useEffect(() => {
    dispatch(addData(data));
  }, [data]);

  useEffect(() => {
    dispatch(addVerifyMsg(verifyMsg));
  }, [verifyMsg]);

  useEffect(() => {
    dispatch(addVerifyStatus(verifyStatus));
  }, [verifyStatus]);

  useEffect(() => {
    dispatch(addVerifyTimestamp(verifyTimestamp));
  }, [verifyTimestamp]);

  const backendPush = ({ data, verifyMsg, verifyStatus, verifyTimestamp }) => {
    console.log("mandateSlice: ", mandateSlice);
    setData(data);
    setVerifyMsg(verifyMsg);
    setVerifyStatus(verifyStatus);
    setVerifyTimestamp(verifyTimestamp);
    mandatePush({
      data: {
        unipeEmployeeId: unipeEmployeeId,
        ipAddress: ipAddress,
        deviceId: deviceId,
        data: data,
        verifyMsg: verifyMsg,
        verifyStatus: verifyStatus,
        verifyTimestamp: verifyTimestamp,
      },
      token: token,
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
      };

      RazorpayCheckout.open(options)
        .then((data) => {
          getToken({ paymentId: data.razorpay_payment_id })
            .then((token) => {
              console.log("mandate token.data: ", token.data);
              backendPush({
                data: {
                  authType: authType,
                  customerId: customerId,
                  orderId: orderId,
                  paymentId: data.razorpay_payment_id,
                  paymentSignature: data.razorpay_signature,
                  provider: "razropay",
                  tokenId: token.data.token_id,
                },
                verifyMsg: "Mandate Verified Successfully",
                verifyStatus: "SUCCESS",
                verifyTimestamp: Date.now(),
              });
              showToast("Mandate Verified Successfully");
              Analytics.trackEvent("Mandate|GetToken|Success", {
                unipeEmployeeId: unipeEmployeeId,
              });
              props?.type === "EWA"
                ? navigation.navigate("EWA_AGREEMENT")
                : null;
            })
            .catch((error) => {
              console.log("mandate error:", error.description);
              backendPush({
                data: {},
                verifyMsg: error.description,
                verifyStatus: "ERROR",
                verifyTimestamp: Date.now(),
              });
              Alert.alert("Error", error.description);
              Analytics.trackEvent("Mandate|GetToken|Error", {
                unipeEmployeeId: unipeEmployeeId,
                error: error.description,
              });
            });
        })
        .catch((error) => {
          console.log("mandate error:", error.description);
          backendPush({
            data: {},
            verifyMsg: error.description,
            verifyStatus: "ERROR",
            verifyTimestamp: Date.now(),
          });
          Alert.alert("Error", error.description);
          Analytics.trackEvent("Mandate|Register|Error", {
            unipeEmployeeId: unipeEmployeeId,
            error: error.description,
          });
        });
    }
  }, [orderId]);

  const ProceedButton = ({ authType }) => {
    setAuthType(authType);
    backendPush({
      data: { authType: authType },
      verifyMsg: `Mandate|CreateOrder|${authType} PENDING`,
      verifyStatus: "PENDING",
      verifyTimestamp: Date.now(),
    });
    createOrder({
      authType: authType,
      customerId: customerId,
      accountHolderName: accountHolderName,
      accountNumber: accountNumber,
      ifsc: ifsc,
      aCTC: aCTC,
    })
      .then((res) => {
        console.log(`Mandate|CreateOrder|${authType} res.data:`, res.data);
        setOrderId(res.data.id);
        backendPush({
          data: { authType: authType },
          verifyMsg: `Mandate|CreateOrder|${authType} SUCCESS`,
          verifyStatus: "PENDING",
          verifyTimestamp: Date.now(),
        });
        Analytics.trackEvent(`Mandate|CreateOrder|${authType}|Success`, {
          unipeEmployeeId: unipeEmployeeId,
        });
      })
      .catch((error) => {
        console.log(`Mandate|CreateOrder|${authType} error:`, error.toString());
        backendPush({
          data: { authType: authType },
          verifyMsg: `Mandate|CreateOrder|${authType} ERROR ${error.toString()}`,
          verifyStatus: "ERROR",
          verifyTimestamp: Date.now(),
        });
        Alert.alert("Error", error.toString());
        Analytics.trackEvent(`Mandate|CreateOrder|${authType}|Error`, {
          unipeEmployeeId: unipeEmployeeId,
          error: error.toString(),
        });
      });
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingWrapper>
        <ScrollView showsVerticalScrollIndicator={false}>
          <FormInput
            placeholder={"Account Holder Name"}
            containerStyle={{ marginVertical: 10 }}
            autoCapitalize="words"
            value={accountHolderName}
            disabled={true}
          />
          <FormInput
            placeholder={"Bank Account Number"}
            containerStyle={{ marginVertical: 10 }}
            autoCapitalize="words"
            value={accountNumber}
            disabled={true}
          />
          <FormInput
            placeholder={"IFSC"}
            containerStyle={{ marginVertical: 10 }}
            autoCapitalize="words"
            value={ifsc}
            disabled={true}
          />
          {customerId == null ? (
            <Text>Initializing ... </Text>
          ) : (
            <MandateOptions ProceedButton={ProceedButton} />
          )}
        </ScrollView>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
};

export default MandateFormTemplate;
