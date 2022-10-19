import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { getUniqueId } from "react-native-device-info";
import { NetworkInfo } from "react-native-network-info";
import Icon1 from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import CollapsibleCard from "../../components/CollapsibleCard";
import PrimaryButton from "../../components/PrimaryButton";
import { mandatePush } from "../../helpers/BackendPush";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import {
  addType,
  addVerifyMsg,
  addVerifyStatus,
  addOrderId,
  addCustomerId,
  addVerifyTimestamp,
} from "../../store/slices/mandateSlice";
import { bankform, styles } from "../../styles";
import { showToast } from "../../components/Toast";
import RazorpayCheckout from "react-native-razorpay";
import {
  createCustomer,
  createNetBankingOrder,
  createUpiOrder,
  createDebitOrder,
  getToken,
} from "../../services/mandate/Razorpay/services";
import { RZP_TEST_KEY_ID } from "@env";
import FormInput from "../../components/atoms/FormInput";
import { COLORS } from "../../constants/Theme";
import Analytics from "appcenter-analytics";

const Form = (props) => {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [deviceId, setDeviceId] = useState(0);
  const [ipAddress, setIpAdress] = useState(0);
  
  const employeeId = useSelector((state) => state.auth.id);
  const mandateSlice = useSelector((state) => state.mandate);
  const bankVerifyStatus = useSelector((state) => state.bank.verifyStatus);
  const [timestamp, setTimestamp] = useState(mandateSlice?.verifyTimestamp);

  const [name, setName] = useState(
    useSelector((state) => state.bank.data.accountHolderName)
  );
  const [number, setNumber] = useState(
    useSelector((state) => state.bank.data.accountNumber)
  );
  const [ifsc, setIfsc] = useState(
    useSelector((state) => state.bank.data.ifsc)
  );
  const [verifyStatus, setVerifyStatus] = useState(mandateSlice?.verifyStatus);
  const [verifyMsg, setVerifyMsg] = useState(mandateSlice?.verifyMsg);
  const [data, setData] = useState(mandateSlice?.data);
  const [type, setType] = useState(mandateSlice?.data.type);
  const [backendPush, setBackendPush] = useState(false);
  const [orderId, setOrderId] = useState(mandateSlice?.orderId);
  const [customerId, setCustomerId] = useState(mandateSlice?.customerId);
  const email = useSelector(
    (state) => state.pan.data.email || state.profile.email
  );
  const phoneNumber = useSelector((state) => state.auth.phoneNumber);

  useEffect(() => {
    getUniqueId().then((id) => {
      setDeviceId(id);
    });
    NetworkInfo.getIPV4Address().then((ipv4Address) => {
      setIpAdress(ipv4Address);
    });
  }, []);

  useEffect(() => {
    dispatch(addOrderId(orderId));
  }, [orderId]);

  useEffect(() => {
    dispatch(addCustomerId(customerId));
  }, [customerId]);

  useEffect(() => {
    dispatch(addVerifyStatus(verifyStatus));
  }, [verifyStatus]);

  useEffect(() => {
    dispatch(addType(type));
  }, [type]);

  useEffect(() => {
    dispatch(addVerifyTimestamp(timestamp));
  }, [timestamp]);

  useEffect(() => {
    dispatch(addVerifyMsg(verifyMsg));
  }, [verifyMsg]);

  useEffect(() => {
    setTimestamp(Date.now());
    if (backendPush) {
      console.log("Mandate Slice", mandateSlice);
      mandatePush({
        unipeEmployeeId: employeeId,
        ipAddress: ipAddress,
        deviceId: deviceId,
        data: data,
        verifyMsg: verifyMsg,
        verifyStatus: verifyStatus,
        verifyTimestamp: timestamp,
      });
      setBackendPush(false);
    }
  }, [backendPush]);

  useEffect(() => {
    if (!customerId) {
      createCustomer({
        name: name,
        email: email,
        phoneNumber: phoneNumber,
      })
        .then((res) => {
          console.log("createCustomer", res.data);
          setCustomerId(res.data.id);
          Analytics.trackEvent("Mandate|CreateCustomer|Success", {
            userId: employeeId,
          });
        })
        .catch(function (error) {
          Analytics.trackEvent("Mandate|CreateCustomer|Error", {
            userId: employeeId,
            error: error,
          });
          console.log(error);
        });
    }
  }, [customerId]);

  useEffect(() => {
    if (orderId) {
      var options = {
        description: "Unipe Mandate Verification",
        name: "Unipe",
        key: RZP_TEST_KEY_ID,
        order_id: orderId,
        customer_id: customerId,
        recurring: "1",
        prefill: {
          name: name,
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
              console.log("getToken", token.data);
              setData({
                type: type,
                extTokenId: token.data.token_id,
                extOrderId: orderId,
                extPaymentId: data.razorpay_payment_id,
                extPaymentSignature: data.razorpay_signature,
                extCustomerId: customerId,
              });
              setVerifyMsg("");
              setVerifyStatus("SUCCESS");
              setBackendPush(true);
              Analytics.trackEvent("Mandate|GetToken|Success", {
                userId: employeeId,
              });
              showToast("Mandate Verified Successfully");
              props?.type == "Onboarding" ? navigation.navigate("Home") : null;
            })
            .catch((error) => {
              console.log(error);
              Analytics.trackEvent("Mandate|GetToken|Error", {
                userId: employeeId,
                error: error.description,
              });
            });
        })
        .catch((error) => {
          console.log(error);
          alert(`Error: ${error.code} | ${error.description}`);
          setVerifyMsg(error.description);
          Analytics.trackEvent("Mandate|Register|Error", {
            userId: employeeId,
            error: error.description,
          });
          setVerifyStatus("ERROR");
          setBackendPush(true);
          setOrderId("");
        });
    }
  }, [orderId]);

  const netIcon = () => {
    return <Icon1 name="passport" size={24} color="#FF6700" />;
  };

  const upiIcon = () => {
    return <Icon1 name="wallet" size={24} color="#FF6700" />;
  };

  const debitIcon = () => {
    return <Icon1 name="smart-card" size={24} color="#FF6700" />;
  };

  const BankingButton = (type) => {
    return (
      <PrimaryButton
        title="Proceed"
        onPress={() => {
          setType(type);
          setVerifyStatus("PENDING");
          setVerifyMsg("To be confirmed by user");
          setTimestamp(Date.now());
          Analytics.trackEvent(`Mandate|${type}|Pending`, {
            userId: employeeId,
          });
          setBackendPush(true);
          let func = 0;
          type === "NETBANKING"
            ? (func = createNetBankingOrder)
            : (func = createDebitOrder);
          func({
            customerId: customerId,
            accountHolderName: name,
            accountNumber: number,
            ifsc: ifsc,
          })
            .then((res) => {
              console.log(type, res.data);
              setOrderId(res.data.id);
              Analytics.trackEvent(`Mandate|${type}|Success`, {
                userId: employeeId,
              });
            })
            .catch((error) => {
              console.log(error);
              Analytics.trackEvent(`Mandate|${type}|Error`, {
                userId: employeeId,
                error: error,
              });
            });
        }}
      />
    );
  };
  const NetBankbutton = () => {
    return BankingButton("NETBANKING");
  };
  const Debitbutton = () => {
    return BankingButton("DEBITCARD");
  };

  const Upibutton = () => {
    return (
      <PrimaryButton
        title="Proceed"
        onPress={() => {
          setType("UPI");
          setVerifyStatus("PENDING");
          setVerifyMsg("To be confirmed by user");
          Analytics.trackEvent(`Mandate|${type}|Pending`, {
            userId: employeeId,
          });
          setTimestamp(Date.now());
          setBackendPush(true);s
          createUpiOrder({ customerId: customerId })
            .then((res) => {
              console.log("UPI", res.data);
              setOrderId(res.data.id);
              Analytics.trackEvent(`Mandate|${type}|Success`, {
                userId: employeeId,
              });
            })
            .catch(function (error) {
              console.log(error);
              Analytics.trackEvent(`Mandate|${type}|Error`, {
                userId: employeeId,
                error: error,
              });
            });
        }}
      />
    );
  };

  return (
    <SafeAreaView style={[styles.container, { padding: 0 }]}>
      <KeyboardAvoidingWrapper>
        {bankVerifyStatus === "PENDING" ? (
          <View style={{ alignSelf: "center", marginTop: "20%" }}>
            <Text style={{ fontSize: 20, alignSelf: "center" }}>
              Verifying Bank Details is a requirement to register Mandate
            </Text>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <FormInput
              placeholder={"Account Holder Name"}
              containerStyle={{ marginVertical: 10 }}
              autoCapitalize="words"
              value={name}
              onChange={setName}
              disabled={true}
              required
            />
            <FormInput
              placeholder={"Bank Account Number"}
              containerStyle={{ marginVertical: 10 }}
              autoCapitalize="words"
              value={number}
              onChange={setNumber}
              disabled={true}
              required
            />
            <FormInput
              placeholder={"IFSC"}
              containerStyle={{ marginVertical: 10 }}
              autoCapitalize="words"
              value={ifsc}
              onChange={setIfsc}
              disabled={true}
              required
            />

            {/* <CollapsibleCard
              title="Net Banking "
              TitleIcon={netIcon}
              isClosed={true}
              Component={NetBankbutton}
            />
            <CollapsibleCard
              title="UPI "
              TitleIcon={upiIcon}
              isClosed={true}
              Component={Upibutton}
            /> */}
            <CollapsibleCard
              title="Debit Card "
              TitleIcon={debitIcon}
              isClosed={true}
              Component={Debitbutton}
            />
            <View style={bankform.padding}></View>
          </ScrollView>
        )}
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
};

export default Form;
