import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/core";
import { SafeAreaView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BankVerifyApi from "../../apis/bank/Verify";
import Checkbox from "../../components/atoms/Checkbox";
import InfoCard from "../../components/atoms/InfoCard";
import PopableInput from "../../components/molecules/PopableInput";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import {
  addAccountHolderName,
  addAccountNumber,
  addIfsc,
  addUpi,
} from "../../store/slices/bankSlice";
import { useNavigation } from "@react-navigation/core";
import { bankform, styles } from "../../styles";
import ShieldTitle from "../../components/atoms/ShieldTitle";

const BankFormTemplate = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [accNumNext, setAccNumNext] = useState(false);
  const [consent, setConsent] = useState(true);
  const [ifscNext, setIfscNext] = useState(false);

  const aadhaarSlice = useSelector((state) => state.aadhaar);
  const aadhaarVerifyStatus = aadhaarSlice?.verifyStatus;

  const bankSlice = useSelector((state) => state.bank);
  const [ifsc, setIfsc] = useState(bankSlice?.data?.ifsc);
  const [accountNumber, setAccountNumber] = useState(
    bankSlice?.data?.accountNumber
  );
  const [accountHolderName, setAccountHolderName] = useState(
    aadhaarSlice?.data.name || bankSlice?.data?.accountHolderName
  );
  const [upi, setUpi] = useState(bankSlice?.data?.upi);

  useEffect(() => {
    dispatch(addAccountHolderName(accountHolderName));
  }, [accountHolderName]);

  useEffect(() => {
    dispatch(addAccountNumber(accountNumber));
  }, [accountNumber]);

  useEffect(() => {
    dispatch(addIfsc(ifsc));
  }, [ifsc]);

  useEffect(() => {
    dispatch(addUpi(upi));
  }, [upi]);

  useEffect(() => {
    var accountNumberReg = /^[A-Z0-9]{6,25}$/gm;
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
    <SafeAreaView style={styles.safeContainer}>
      {aadhaarVerifyStatus === "SUCCESS" ? (
        <KeyboardAvoidingWrapper>
          <View>
            <Text style={styles.headline}>Bank Account Details</Text>
            <Text style={styles.subHeadline}>
              कृपया अपना बैंक अकाउंट नम्बर की जानकारी दें । इसी अकाउंट में वेतन
              जमा करा जाएगा ।
            </Text>

            <PopableInput
              accessibilityLabel="AccHolderName"
              placeholder={"Account Holder Name*"}
              value={accountHolderName}
              onChange={setAccountHolderName}
              autoCapitalize="characters"
              content={
                "Refer to your Bank Passbook or Cheque book for the exact Name mentioned in your bank records"
              }
            />

            <PopableInput
              accessibilityLabel={"AccNumber"}
              placeholder={"Bank Account Number*"}
              value={accountNumber}
              onChange={setAccountNumber}
              autoFocus={isFocused}
              autoCapitalize="characters"
              content={
                "Refer to your Bank Passbook or Cheque book to get the Bank Account Number."
              }
            />
            {accountNumber && !accNumNext ? (
              <Text style={bankform.formatmsg}>Incorrect Format</Text>
            ) : null}

            <PopableInput
              accessibilityLabel={"IfscCode"}
              placeholder={"IFSC Code*"}
              value={ifsc}
              onChange={setIfsc}
              autoCapitalize="characters"
              content={
                "You can find the IFSC code on the cheque book or bank passbook that is provided by the bank"
              }
            />

            {ifsc && !ifscNext ? (
              <Text style={bankform.formatmsg}>Incorrect Format</Text>
            ) : null}

            <PopableInput
              accessibilityLabel={"UpiId"}
              placeholder={"UPI ID"}
              value={upi}
              onChange={setUpi}
              content={
                "There are lots of UPI apps available like Phonepe, Amazon Pay, Paytm, Bhim, Mobikwik etc. from where you can fetch your UPI ID."
              }
            />

            <InfoCard
              info={
                "Please note: We will use this bank account/UPI ID to deposite your salary every month, Please provide your own bank account details."
              }
            />

            <Checkbox
              text={
                "I agree KYC registration for the Term & conditions to verify my identity"
              }
              value={consent}
              setValue={setConsent}
            />

            <BankVerifyApi
              data={{ account_number: accountNumber, ifsc: ifsc, consent: "Y" }}
              disabled={
                !ifscNext || !accNumNext || !consent || !accountHolderName
              }
              type={props?.route?.params?.type || ""}
            />
            <ShieldTitle title={"All your details are safe with us"} />
          </View>
        </KeyboardAvoidingWrapper>
      ) : (
        <View style={styles.container}>
          <Text style={bankform.subTitle}>
            Please verify your aadhaar first
          </Text>
          <PrimaryButton
            title="Verify Aadhaar Now"
            onPress={() => {
              props?.route?.params?.type === "KYC"
                ? navigation.navigate("HomeStack", {
                    screen: "KYC",
                    params: {
                      screen: "AADHAAR",
                    },
                  })
                : navigation.navigate("AadhaarForm");
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default BankFormTemplate;
