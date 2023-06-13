import { useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import { SafeAreaView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BankVerifyApi from "../../apis/bank/Verify";
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
import { bankform, styles } from "../../styles";
import ShieldTitle from "../../components/atoms/ShieldTitle";
import { useGetAadhaarQuery } from "../../store/apiSlices/aadhaarApi";
import { useGetBankQuery } from "../../store/apiSlices/bankApi";
import { useGetKycQuery } from "../../store/apiSlices/kycApi";

const BankFormTemplate = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [accNumNext, setAccNumNext] = useState(false);
  const [ifscNext, setIfscNext] = useState(false);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const { data: kycData } = useGetKycQuery(unipeEmployeeId, {
    pollingInterval: 1000 * 60 * 60 * 24,
  });

  const { aadhaar, bank } = kycData ?? {};

  const aadhaarVerifyStatus = aadhaar?.verifyStatus;

  const [ifsc, setIfsc] = useState(bank?.data?.ifsc);
  const [accountNumber, setAccountNumber] = useState(bank?.data?.accountNumber);
  const [accountHolderName, setAccountHolderName] = useState(
    aadhaar?.data.name || bank?.data?.accountHolderName
  );
  const [upi, setUpi] = useState(bank?.data?.upi);

  useEffect(() => {
    dispatch(addAccountHolderName(accountHolderName));
  }, [accountHolderName]);

  useEffect(() => {
    dispatch(addUpi(upi));
  }, [upi]);

  useEffect(() => {
    let accountNumberReg = /^[A-Z0-9]{6,25}$/gm;
    if (accountNumberReg.test(accountNumber)) {
      dispatch(addAccountNumber(accountNumber));
      setAccNumNext(true);
    } else {
      setAccNumNext(false);
    }
  }, [accountNumber]);

  useEffect(() => {
    let ifscReg = /^[A-Z]{4}0[A-Z0-9]{6}$/gm;
    if (ifscReg.test(ifsc)) {
      dispatch(addIfsc(ifsc));
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

            <BankVerifyApi
              disabled={!ifscNext || !accNumNext || !accountHolderName}
              type={props?.route?.params?.type || ""}
              accountNumber={accountNumber}
              accountHolderName={accountHolderName}
              ifsc={ifsc}
              upi={upi}
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
