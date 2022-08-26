import { AppBar, Icon, IconButton, Button } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, TextInput, View, Alert } from "react-native";
import { Popable } from "react-native-popable";
import { useDispatch, useSelector } from "react-redux";
import Verify from "../../apis/bank/Verify";
import ProgressBarTop from "../../components/ProgressBarTop";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import CheckBox from "@react-native-community/checkbox";
import {
  addBankAccountHolderName,
  addBankAccountNumber,
  addBankIfsc,
  addBankUpi,
} from "../../store/slices/bankSlice";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { bankform, form, styles, checkBox } from "../../styles";


export default BankInformationForm = () => {
  const navigation = useNavigation();
  const bankSlice = useSelector((state) => state.bank);
  const [ifsc, setIfsc] = useState(bankSlice?.ifsc);
  const [accountNumber, setAccountNumber] = useState(bankSlice?.accountNumber);
  const [accountHolderName, setAccountHolderName] = useState(
    bankSlice?.accountHolderName
  );
  const [upi, setUpi] = useState(bankSlice?.upi);
  const [ifscNext, setIfscNext] = useState(false);
  const [accNumNext, setAccNumNext] = useState(false);
  const [consent, setConsent] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addCurrentScreen("BankInfoForm"));
  }, []);
  useEffect(() => {
    dispatch(addBankAccountHolderName(accountHolderName));
  }, [accountHolderName]);
  useEffect(() => {
    dispatch(addBankAccountNumber(accountNumber));
  }, [accountNumber]);
  useEffect(() => {
    dispatch(addBankIfsc(ifsc));
  }, [ifsc]);
  useEffect(() => {
    dispatch(addBankUpi(upi));
  }, [upi]);

  const SkipBank = () => {
    Alert.alert(
      "Bank KYC pending",
      `If you want to receive your salary on time, Bank details are required.`,
      [
        { text: "No", onPress: () => null, style: "cancel" },
        {
          text: "Yes",
          onPress: () => navigation.navigate("PersonalDetailsForm"),
        },
      ]
    );
  };

  useEffect(() => {
    var accountNumberReg = /^[0-9]{9,18}$/gm;
    if (accountNumberReg.test(accountNumber)) {
      setAccNumNext(true);
    } else {
      setAccNumNext(false);
    }
  }, [accountNumber]);

  useEffect(() => {
    var ifscReg = /^[A-Z]{4}0[A-Z0-9]{6}$/gm;
    if (ifscReg.test(ifsc)) {
      setIfscNext(true);
    } else {
      setIfscNext(false);
    }
  }, [ifsc]);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <AppBar
          title="Bank Details"
          color="#4E46F1"
          leading={
            <IconButton
              icon={<Icon name="arrow-back" size={20} color="white" />}
              onPress={() => navigation.navigate("PanForm")}
            />
          }
          trailing={
            <IconButton
              icon={<Icon name="arrow-forward" size={20} color="white" />}
              onPress={() => {
                SkipBank();
              }}
            />
          }
        />
        <ProgressBarTop step={3} />
        <Text style={bankform.Maintitle}>Bank Details Verification</Text>

        <KeyboardAvoidingWrapper>
          <View>
            <View style={bankform.infoCard}>
              <Icon name="info-outline" size={20} color="#4E46F1" />
              <Text style={bankform.infoText}>
                We will use this bank account / UPI ID to deposit your salary
                every month, Please ensure the bank account belongs to you.
                {"\n"}
                We will also deposit INR 1 to your account for verification make
                sure you enter the correct account details.
              </Text>
            </View>
            <Text style={bankform.subTitle}>Enter your Bank Details</Text>

            <Text style={bankform.formtitle}>
              Account Holder Name <Text style={bankform.asterisk}>*</Text>
              <Popable
                content={
                  "Refer to your Bank Passbook or Cheque book for the exact Name mentioned in your bank records"
                }
                position="right"
                caret={false}
              >
                <Icon name="info-outline" size={20} color="grey" />
              </Popable>
            </Text>
            <TextInput
              style={bankform.formInput}
              value={accountHolderName}
              onChangeText={setAccountHolderName}
              autoCapitalize="words"
              required
            />

            <Text style={bankform.formtitle}>
              Bank Account Number <Text style={bankform.asterisk}>*</Text>
              <Popable
                content={
                  "Refer to your Bank Passbook or Cheque book to get the Bank Account Number."
                }
                position="right"
                caret={false}
              >
                <Icon name="info-outline" size={20} color="grey" />
              </Popable>
            </Text>
            <TextInput
              style={bankform.formInput}
              value={accountNumber}
              onChangeText={setAccountNumber}
              autoCapitalize="characters"
              required
            />
            {accountNumber && !accNumNext ? (
              <Text style={bankform.formatmsg}>Incorrect Format</Text>
            ) : null}

            <Text style={bankform.formtitle}>
              IFSC Code <Text style={bankform.asterisk}>*</Text>
              <Popable
                content={
                  "You can find the IFSC code on the cheque book or bank passbook that is provided by the bank"
                }
                position="right"
                caret={false}
              >
                <Icon name="info-outline" size={20} color="grey" />
              </Popable>
            </Text>
            <TextInput
              style={bankform.formInput}
              value={ifsc}
              onChangeText={setIfsc}
              autoCapitalize="characters"
              required
            />
            {ifsc && !ifscNext ? (
              <Text style={bankform.formatmsg}>Incorrect Format</Text>
            ) : null}
            <Text style={{alignSelf:"center",fontWeight:"bold",marginTop:20,fontSize:18}}>-OR-</Text>
            <Text style={bankform.formtitle}>
              UPI ID
              <Popable
                content={
                  "There are lots of UPI apps available like Phonepe, Amazon Pay, Paytm, Bhim, Mobikwik etc. from where you can fetch your UPI ID."
                }
                position="right"
                caret={false}
              >
                <Icon name="info-outline" size={20} color="grey" />
              </Popable>
            </Text>
            <TextInput
              style={bankform.formInput}
              value={upi}
              onChangeText={setUpi}
              required
            />
            <View style={{ flexDirection: "row" }}>
              <CheckBox
                value={consent}
                onValueChange={setConsent}
                style={checkBox.checkBox}
                tintColors={{ true: "#4E46F1" }}
              />
              <Text style={checkBox.checkBoxText}>
                I agree with the KYC registration Terms and Conditions to
                verifiy my identity.
              </Text>
            </View>
            <Verify
              url={"https://api.gridlines.io/bank-api/verify"}
              data={{ account_number: accountNumber, ifsc: ifsc, consent: "Y" }}
              style={form.nextButton}
              disabled={!ifscNext || !accNumNext || !consent}
            />
            <View style={bankform.padding}></View>
          </View>
        </KeyboardAvoidingWrapper>
      </SafeAreaView>
    </>
  );
};
