import { OG_API_KEY } from "@env";
import { AppBar, Button, Icon, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView, Text,
  TextInput,
  View
} from "react-native";
import { Popable } from "react-native-popable";
import { useDispatch, useSelector } from "react-redux";
import ProgressBarTop from "../../components/ProgressBarTop";
import { showToast } from "../../components/Toast";
import { bankBackendPush } from "../../helpers/BackendPush";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import {
  addBankAccountHolderName,
  addBankAccountNumber,
  addBankIfsc,
  addBankUpi, addBankVerifyMsg, addBankVerifyStatus
} from "../../store/slices/bankSlice";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { bankform, styles } from "../../styles";

export default BankInformationForm = () => {
  const navigation = useNavigation();
  const id = useSelector((state) => state.auth.id);
  const bankSlice = useSelector((state) => state.bank);
  const [ifsc, setIfsc] = useState(bankSlice?.ifsc);
  const [accountNumber, setAccountNumber] = useState(bankSlice?.accountNumber);
  const [accountHolderName, setAccountHolderName] = useState(
    bankSlice?.accountHolderName
  );
  const [upi, setUpi] = useState(bankSlice?.upi);
  const [verifyStatus, setVerifyStatus] = useState(bankSlice?.verifyStatus);
  const [verifyMsg, setverifyMsg] = useState(bankSlice?.verifyMsg);
  const [backendPush, setBackendPush] = useState(false);
  const [ifscNext, setIfscNext] = useState(false);
  const [accNumNext, setAccNumNext] = useState(false);
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

  useEffect(() => {
    setverifyMsg(bankSlice.verifyMsg);
  }, [bankSlice.verifyMsg]);

  useEffect(() => {
    setVerifyStatus(bankSlice.verifyStatus);
  }, [bankSlice.verifyStatus]);

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

  useEffect(() => {
    console.log("bankSlice : ", bankSlice);
    console.log("upi : ", upi);
    if (backendPush) {
      bankBackendPush({
        id: id,
        ifsc: ifsc,
        accountNumber: accountNumber,
        upi: upi,
        verifyStatus: verifyStatus,
        verifyMsg: verifyMsg,
      });
    }
  }, [backendPush]);

  const VerifyBankAccount = () => {
    const data = {
      account_number: accountNumber,
      ifsc: ifsc,
      consent: "Y",
    };
    const options = {
      method: "POST",
      headers: {
        "X-Auth-Type": "API-Key",
        "X-API-Key": OG_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`https://api.gridlines.io/bank-api/verify`, options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        {
          if (response["status"] == "200") {
            switch (response["data"]["code"]) {
              case "1000":
                Alert.alert(
                  "Your Bank Account Information",
                  `Name: ${response["data"]["bank_account_data"]["name"]}\nBank Name: ${response["data"]["bank_account_data"]["bank_name"]}\nUTR no.: ${response["data"]["bank_account_data"]["utr"]}\nBranch: ${response["data"]["bank_account_data"]["branch"]}\nCity: ${response["data"]["bank_account_data"]["city"]}`,
                  [
                    {
                      text: "Yes",
                      onPress: () => {
                        dispatch(addBankVerifyStatus("SUCCESS"));
                        dispatch(addBankVerifyMsg(""));
                        navigation.navigate("PersonalDetailsForm");
                        showToast("Bank Account Details Recorded");
                      },
                    },
                    {
                      text: "No",
                      onPress: () => {
                        Alert.alert(
                          "Information Validation",
                          "Please provide the correct bank account number and IFSC Code."
                        );
                      },
                      style: "cancel",
                    },
                  ]
                );
                break;
              default:
                dispatch(addBankVerifyStatus("ERROR"));
                dispatch(addBankVerifyMsg(response["data"]["message"]));
                Alert.alert("Error", response["data"]["message"]);
                break;
            }
          } else {
            dispatch(addBankVerifyStatus("ERROR"));
            if (response["error"]) {
              dispatch(addBankVerifyMsg(response["error"]));
              Alert.alert(
                "Error",
                response["error"]["metadata"]["fields"]
                  .map((item, value) => item["message"])
                  .join("\n")
              );
            } else {
              dispatch(addBankVerifyMsg(response["messsage"]));
              Alert.alert("Error", response["message"]);
            }
          }
        }
        setBackendPush(true);
      })
      .catch((err) => {
        dispatch(addBankVerifyStatus("ERROR"));
        dispatch(addBankVerifyMsg(err));
        Alert.alert("Error", err);
        setBackendPush(true);
      });
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <AppBar
          title="Setup Profile"
          color="#4E46F1"
          leading={
            <IconButton
              icon={<Icon name="arrow-back" size={20} color="white" />}
              onPress={() => navigation.navigate("PanForm")}
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
              Account Holder Name*
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
              Bank Account Number*
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
              IFSC Code*
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
            {accNumNext && ifscNext ? (
              <Button
                title="Continue"
                type="solid"
                uppercase={false}
                style={bankform.nextButton}
                color="#4E46F1"
                onPress={() => {
                  VerifyBankAccount();
                }}
              />
            ) : (
              <Button
                title="Continue"
                uppercase={false}
                type="solid"
                style={bankform.nextButton}
                disabled
              />
            )}
            <View style={bankform.padding}></View>
          </View>
        </KeyboardAvoidingWrapper>
      </SafeAreaView>
    </>
  );
};
