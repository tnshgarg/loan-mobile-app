import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Alert, SafeAreaView, ScrollView, Text } from "react-native";
import { getUniqueId } from "react-native-device-info";
import { NetworkInfo } from "react-native-network-info";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../../components/PrimaryButton";
import { mandatePush } from "../../helpers/BackendPush";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import {
  addCustomerId,
  addData,
  addOrderId,
  addVerifyMsg,
  addVerifyStatus,
  addVerifyTimestamp,
} from "../../store/slices/mandateSlice";
import { styles, bankform } from "../../styles";
import { showToast } from "../../components/Toast";
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

const MandateFormTemplate = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [deviceId, setDeviceId] = useState(0);
  const [ipAddress, setIpAdress] = useState(0);
  const [backendPush, setBackendPush] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth?.unipeEmployeeId);
  const phoneNumber = useSelector((state) => state.auth?.phoneNumber);
  const email = useSelector(
    (state) => state.pan?.data?.email || state.profile?.email
  );
  const accountHolderName = useSelector(
    (state) => state.bank?.data?.accountHolderName
  );
  const accountNumber = useSelector((state) => state.bank?.data?.accountNumber);
  const ifsc = useSelector((state) => state.bank?.data?.ifsc);
  const bankVerifyStatus = useSelector((state) => state.bank?.verifyStatus);

  const mandateSlice = useSelector((state) => state.mandate);
  const [authType, setAuthType] = useState(mandateSlice?.data?.authType);
  const [customerId, setCustomerId] = useState();
  const [data, setData] = useState(mandateSlice?.data);
  const [orderId, setOrderId] = useState();
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
    dispatch(addCustomerId(customerId));
  }, [customerId]);

  useEffect(() => {
    dispatch(addOrderId(orderId));
  }, [orderId]);

  useEffect(() => {
    dispatch(addVerifyMsg(verifyMsg));
  }, [verifyMsg]);

  useEffect(() => {
    dispatch(addVerifyStatus(verifyStatus));
  }, [verifyStatus]);

  useEffect(() => {
    dispatch(addVerifyTimestamp(verifyTimestamp));
  }, [verifyTimestamp]);

  useEffect(() => {
    dispatch(addData(data));
  }, [data]);

  useEffect(() => {
    if (backendPush) {
      console.log("mandateSlice: ", mandateSlice);
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
      setBackendPush(false);
    }
  }, [backendPush]);

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
              // TODO: check response status code
              console.log("mandate token.data: ", token.data);
              setData({
                authType: authType,
                extTokenId: token.data.token_id,
                extOrderId: orderId,
                extPaymentId: data.razorpay_payment_id,
                extPaymentSignature: data.razorpay_signature,
                extCustomerId: customerId,
              });
              setVerifyMsg("Mandate Verified Successfully");
              setVerifyStatus("SUCCESS");
              setVerifyTimestamp(Date.now());
              setBackendPush(true);
              showToast("Mandate Verified Successfully");
              Analytics.trackEvent("Mandate|GetToken|Success", {
                unipeEmployeeId: unipeEmployeeId,
              });
              props?.type === "Onboarding" ? navigation.navigate("Home") : null;
            })
            .catch((error) => {
              console.log("mandate error:", error.description);
              setVerifyMsg(error.description);
              setVerifyStatus("ERROR");
              setBackendPush(true);
              Alert.alert("Error", error.description);
              Analytics.trackEvent("Mandate|GetToken|Error", {
                unipeEmployeeId: unipeEmployeeId,
                error: error.description,
              });
            });
        })
        .catch((error) => {
          console.log("mandate error:", error.description);
          setVerifyMsg(error.description);
          setVerifyStatus("ERROR");
          setBackendPush(true);
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
    setVerifyMsg(`Mandate|CreateOrder|${authType} PENDING`);
    setVerifyStatus("PENDING");
    setBackendPush(true);
    createOrder({
      authType: authType,
      customerId: customerId,
      accountHolderName: accountHolderName,
      accountNumber: accountNumber,
      ifsc: ifsc,
    })
      .then((res) => {
        console.log(`Mandate|CreateOrder|${authType} res.data:`, res.data);
        setVerifyMsg(`Mandate|CreateOrder|${authType} SUCCESS`);
        setOrderId(res.data.id);
        Analytics.trackEvent(`Mandate|CreateOrder|${authType}|Success`, {
          unipeEmployeeId: unipeEmployeeId,
        });
      })
      .catch((error) => {
        console.log(`Mandate|CreateOrder|${authType} error:`, error.toString());
        setVerifyMsg(
          `Mandate|CreateOrder|${authType} ERROR ${error.toString()}`
        );
        setVerifyStatus("ERROR");
        setBackendPush(true);
        Alert.alert("Error", error.toString());
        Analytics.trackEvent(`Mandate|CreateOrder|${authType}|Error`, {
          unipeEmployeeId: unipeEmployeeId,
          error: error.toString(),
        });
      });
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      {bankVerifyStatus === "SUCCESS" ? (
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
            <PrimaryButton
              title="Debit Card"
              onPress={() => {
                ProceedButton({ authType: "debitcard" });
              }}
            />
            <PrimaryButton
              title="Net Banking"
              onPress={() => {
                ProceedButton({ authType: "netbanking" });
              }}
            />
            <PrimaryButton
              title="UPI"
              onPress={() => {
                ProceedButton({ authType: "upi" });
              }}
            />
          </ScrollView>
        </KeyboardAvoidingWrapper>
      ) : (
        <>
          <Text style={bankform.subTitle}>
            Please verify your Bank Information first
          </Text>
          <PrimaryButton
            title="Verify Bank Info Now"
            onPress={() => {
              props?.route?.params?.type
                ? navigation.navigate("KYC", {
                    screen: "BANK",
                  })
                : navigation.navigate("BankForm");
            }}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default MandateFormTemplate;
