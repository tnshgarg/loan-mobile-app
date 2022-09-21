import { AppBar, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, TextInput, View, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector, useDispatch } from "react-redux";
import CollapsibleCard from "../../../../components/CollapsibleCard";
import PrimaryButton from "../../../../components/PrimaryButton";
import { KeyboardAvoidingWrapper } from "../../../../KeyboardAvoidingWrapper";
import { bankform, form, styles } from "../../../../styles";
import {
  addAccountHolderName,
  addAccountNumber,
  addIfsc,
  addType,
  addData,
  addStatus,
} from "../../../../store/slices/ewa/ewaMandateSlice";
import { ewaMandatePush } from "../../../../helpers/BackendPush";
import { DeviceId, DeviceIp } from "../../../../helpers/DeviceDetails";

const Mandate = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const employeeId = useSelector((state) => state.auth.id);
  const [name, setName] = useState(
    useSelector((state) => state.bank.data.accountHolderName)
  );
  const [number, setNumber] = useState(
    useSelector((state) => state.bank.data.accountNumber)
  );
  const [ifsc, setIfsc] = useState(
    useSelector((state) => state.bank.data.ifsc)
  );
  const [upi, setUpi] = useState(useSelector((state) => state.bank.data.upi));
  const MandateSlice = useSelector((state) => state.ewaMandate);
  const [ifscNext, setIfscNext] = useState(false);
  const [accNumNext, setAccNumNext] = useState(false);
  const [status, setStatus] = useState(
    useSelector((state) => state.ewaMandate.status)
  );
  useEffect(() => {
    status === "PENDING"
      ? ewaMandatePush({
          offerId: employeeId, //change to offerID
          unipeEmployeeId: employeeId,
          status: "INPROGRESS",
          timestamp: Date.now(),
          ipAddress: DeviceIp(),
          deviceId: DeviceId(),
        })
      : null;
  }, []);

  function handleMandate() {
    dispatch(addStatus("CONFIRMED"));
    ewaMandatePush({
      offerId: employeeId, //change to offerID
      unipeEmployeeId: employeeId,
      status: "CONFIRMED",
      timestamp: Date.now(),
      ipAddress: DeviceIp(),
      deviceId: DeviceId(),
      type:  MandateSlice?.type,//change based on user action
      bankDetails:{
        accountHolderName: name,
        accountNumber: number,
        ifsc: ifsc,
      }
    });
  }

  useEffect(() => {
    dispatch(addAccountHolderName(name));
    dispatch(addAccountNumber(number));
    dispatch(addIfsc(ifsc));
    dispatch(addType(upi));
  }, []);

  useEffect(() => {
    var accountNumberReg = /^[0-9]{9,18}$/gm;
    if (accountNumberReg.test(number)) {
      setAccNumNext(true);
    } else {
      setAccNumNext(false);
    }
  }, [number]);

  useEffect(() => {
    var ifscReg = /^[A-Z]{4}0[A-Z0-9]{6}$/gm;
    if (ifscReg.test(ifsc)) {
      setIfscNext(true);
    } else {
      setIfscNext(false);
    }
  }, [ifsc]);

  const netIcon = () => {
    return <Icon name="passport" size={24} color="#FF6700" />;
  };

  const upiIcon = () => {
    return <Icon name="wallet" size={24} color="#FF6700" />;
  };

  const debitIcon = () => {
    return <Icon name="smart-card" size={24} color="#FF6700" />;
  };

  const button = () => {
    return <PrimaryButton title="Proceed" uppercase={false} />;
  };

  const inputs = () => {
    return (
      <TextInput
        style={form.input}
        placeholder="UPI"
        value={upi}
        onChangeText={setUpi}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppBar
        title="Mandate"
        color="#4E46F1"
        leading={
          <IconButton
            icon={<Icon name="arrow-left" size={20} color="white" />}
            onPress={() => {
              navigation.goBack();
            }}
          />
        }
      />
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
          {number && !accNumNext ? (
            <Text style={bankform.formatmsg}>Incorrect Format</Text>
          ) : null}

          <Text style={bankform.formtitle}>IFSC</Text>
          <TextInput
            style={bankform.formInput}
            autoCapitalize="characters"
            value={ifsc}
            onChangeText={setIfsc}
            editable={false}
            required
          />
          {ifsc && !ifscNext ? (
            <Text style={bankform.formatmsg}>Incorrect Format</Text>
          ) : null}
          <CollapsibleCard
            title="Net Banking "
            TitleIcon={netIcon}
            isClosed={true}
            Component={button}
          />
          <CollapsibleCard
            title="UPI "
            TitleIcon={upiIcon}
            isClosed={true}
            Component={inputs}
          />
          <CollapsibleCard
            title="Debit Card "
            TitleIcon={debitIcon}
            isClosed={true}
            Component={button}
          />
          <PrimaryButton
            title="My Details are Correct"
            uppercase={false}
            onPress={() => {
              handleMandate();
              navigation.navigate("EWAAgreement");
            }}
          />
          <View style={bankform.padding}></View>
        </ScrollView>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
};

export default Mandate;
