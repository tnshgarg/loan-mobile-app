import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { getUniqueId } from "react-native-device-info";
import { NetworkInfo } from "react-native-network-info";
import Icon1 from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import CollapsibleCard from "../../components/CollapsibleCard";
import PrimaryButton from "../../components/PrimaryButton";
import { mandatePush } from "../../helpers/BackendPush";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import {
  addDeviceId,
  addDeviceIp,
  addType,
  addVerifyMsg,
  addVerifyStatus,
  addOrderId,
  addCustomerId,
  addVerifyTimestamp,
} from "../../store/slices/mandateSlice";
import { bankform } from "../../styles";
import RazorpayCheckout from "react-native-razorpay";
import {
  createCustomer,
  createNetBankingOrder,
  createUpiOrder,
  createDebitOrder,
  getToken,
} from "../../services/mandate/Razorpay/services";
import { RZP_TEST_KEY_ID } from "@env";

const Form = (props) => {
  const navigation = useNavigation();
  const [deviceId, setDeviceId] = useState(
    useSelector((state) => state.mandate.deviceId)
  );
  const [deviceIp, setDeviceIp] = useState(
    useSelector((state) => state.mandate.deviceIp)
  );
  getUniqueId().then((id) => {
    setDeviceId(id);
  });
  NetworkInfo.getIPV4Address().then((ipv4Address) => {
    setDeviceIp(ipv4Address);
  });
  const dispatch = useDispatch();
  const employeeId = useSelector((state) => state.auth.id);
  const mandateSlice = useSelector((state) => state.mandate);
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
  const email = useSelector((state) => state.profile.email);
  const phoneNumber = useSelector((state) => state.auth.phoneNumber);

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
    dispatch(addDeviceId(deviceId));
  }, [deviceId]);

  useEffect(() => {
    dispatch(addDeviceIp(deviceIp));
  }, [deviceIp]);

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
        ipAddress: deviceIp,
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
        })
        .catch(function (error) {
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
        theme: { color: "#4E46F1" },
      };
      RazorpayCheckout.open(options)
        .then((data) => {
          setVerifyMsg("");
          setVerifyStatus("SUCCESS");
          getToken({ paymentId: data.razorpay_payment_id })
            .then((token) => {
              console.log("getToken", token.data);
              setData({
                type: type,
                extTokenId: token.data.token_id,
                extOrderId: orderId,
                extPaymentId: data.razorpay_payment_id,
                extPaymentSignature: data.razorpay_signature,
                extCustomerId: customerId,
              });
              setBackendPush(true);
            })
            .catch((err) => {
              console.log(err);
            });

          setBackendPush(true);
          {
            props?.type == "Onboarding"
              ? navigation.navigate("PersonalDetailsForm")
              : null;
          }
        })
        .catch((error) => {
          alert(`Error: ${error.code} | ${error.description}`);
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
        uppercase={false}
        onPress={() => {
          setType(type);
          setVerifyStatus("PENDING");
          setVerifyMsg("To be confirmed by user");
          setTimestamp(Date.now());
          setBackendPush(true);
          let func =0;
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
            })
            .catch((error) => {
              console.log(error);
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
        uppercase={false}
        onPress={() => {
          setType("UPI");
          setVerifyStatus("PENDING");
          setVerifyMsg("To be confirmed by user");
          setTimestamp(Date.now());
          setBackendPush(true);
          createUpiOrder({ customerId: customerId })
            .then((res) => {
              console.log("UPI", res.data);
              setOrderId(res.data.id);
            })
            .catch(function (error) {
              console.log(error);
            });
        }}
      />
    );
  };

  return (
    <KeyboardAvoidingWrapper>
      <ScrollView>
        <Text style={bankform.formtitle}>Account Holder Name</Text>
        <TextInput
          style={bankform.formInput}
          autoCapitalize="words"
          value={name}
          onChangeText={setName}
          editable={false}
          required
        />
        <Text style={bankform.formtitle}>Bank Account Number</Text>
        <TextInput
          style={bankform.formInput}
          autoCapitalize="words"
          value={number}
          onChangeText={setNumber}
          editable={false}
          required
        />
        <Text style={bankform.formtitle}>IFSC</Text>
        <TextInput
          style={bankform.formInput}
          autoCapitalize="characters"
          value={ifsc}
          onChangeText={setIfsc}
          editable={false}
          required
        />
        <CollapsibleCard
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
        />
        <CollapsibleCard
          title="Debit Card "
          TitleIcon={debitIcon}
          isClosed={true}
          Component={Debitbutton}
        />
        <View style={bankform.padding}></View>
      </ScrollView>
    </KeyboardAvoidingWrapper>
  );
};

export default Form;
