import { useIsFocused, useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import BankVerifyApi from "../../apis/bank/Verify";
import InfoCard from "../../components/atoms/InfoCard";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import ShieldTitle from "../../components/atoms/ShieldTitle";
import PopableInput from "../../components/molecules/PopableInput";
import { strings } from "../../helpers/Localization";
import {
  addAccountHolderName,
  addAccountNumber,
  addIfsc,
  addUpi,
} from "../../store/slices/bankSlice";
import { bankform, styles } from "../../styles";

const BankFormTemplate = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [accNumNext, setAccNumNext] = useState(false);
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
      {true ? (
        <KeyboardAvoidingWrapper>
          <View>
            <Text style={styles.headline}>Bank Account Details</Text>
            <Text style={styles.subHeadline}>
              कृपया अपना बैंक अकाउंट नम्बर की जानकारी दें । इसी अकाउंट में वेतन
              जमा करा जाएगा ।
            </Text>

            <PopableInput
              accessibilityLabel="AccHolderName"
              placeholder={strings.accountHolderName}
              value={accountHolderName}
              onChange={setAccountHolderName}
              autoCapitalize="characters"
              content={
                "Refer to your Bank Passbook or Cheque book for the exact Name mentioned in your bank records"
              }
            />

            <PopableInput
              accessibilityLabel={"AccNumber"}
              placeholder={strings.bankAccountNumber}
              value={accountNumber}
              onChange={setAccountNumber}
              autoFocus={isFocused}
              autoCapitalize="characters"
              content={
                "Refer to your Bank Passbook or Cheque book to get the Bank Account Number."
              }
            />
            {accountNumber && !accNumNext ? (
              <Text style={bankform.formatmsg}>{strings.incorrectFormat}</Text>
            ) : null}

            <PopableInput
              accessibilityLabel={"IfscCode"}
              placeholder={strings.ifscCode}
              value={ifsc}
              onChange={setIfsc}
              autoCapitalize="characters"
              content={
                "You can find the IFSC code on the cheque book or bank passbook that is provided by the bank"
              }
            />

            {ifsc && !ifscNext ? (
              <Text style={bankform.formatmsg}>{strings.incorrectFormat}</Text>
            ) : null}

            <PopableInput
              accessibilityLabel={"UpiId"}
              placeholder={strings.upiId}
              value={upi}
              onChange={setUpi}
              content={strings.lotsOfUpiApps}
            />

            <InfoCard info={strings.agreeWithKycRegistration} />

            <BankVerifyApi
              disabled={!ifscNext || !accNumNext || !accountHolderName}
              type={props?.route?.params?.type || ""}
            />
            <ShieldTitle title={strings.detailsSafe} />
          </View>
        </KeyboardAvoidingWrapper>
      ) : (
        <View style={styles.container}>
          <Text style={bankform.subTitle}>{strings.verifyAadhaarFirst}</Text>
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
