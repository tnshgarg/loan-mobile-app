import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BankVerifyApi from "../../apis/bank/Verify";
import Checkbox from "../../components/atoms/Checkbox";
import InfoCard from "../../components/atoms/InfoCard";
import PopableInput from "../../components/molecules/PopableInput";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import {
  addAccountHolderName,
  addAccountNumber,
  addIfsc,
  addUpi,
} from "../../store/slices/bankSlice";
import { bankform, checkBox, form } from "../../styles";

const BankFormTemplate = (props) => {
  const dispatch = useDispatch();

  const [accNumNext, setAccNumNext] = useState(false);
  const [ifscNext, setIfscNext] = useState(false);
  const [consent, setConsent] = useState(false);

  const aadhaarSlice = useSelector((state) => state.aadhaar);
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
    <>
      <KeyboardAvoidingWrapper>
        <View>
          {/* <Text style={bankform.Maintitle}>Bank Details Verification</Text> */}
          <InfoCard
            info={
              "We will use this bank account / UPI ID to deposit your salary every month, Please ensure the bank account belongs to you.\nWe will also deposit INR 1 to your account for verification make sure you enter the correct account details."
            }
          />
          <Text style={bankform.subTitle}>Enter your Bank Details</Text>

          <PopableInput
            placeholder={"Account Holder Name*"}
            value={accountHolderName}
            onChange={setAccountHolderName}
            autoCapitalize="characters"
            content={
              "Refer to your Bank Passbook or Cheque book for the exact Name mentioned in your bank records"
            }
          />

          <PopableInput
            placeholder={"Bank Account Number*"}
            value={accountNumber}
            onChange={setAccountNumber}
            autoFocus={true}
            autoCapitalize="characters"
            content={
              "Refer to your Bank Passbook or Cheque book to get the Bank Account Number."
            }
          />
          {accountNumber && !accNumNext ? (
            <Text style={bankform.formatmsg}>Incorrect Format</Text>
          ) : null}

          <PopableInput
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
            placeholder={"UPI ID"}
            value={upi}
            onChange={setUpi}
            content={
              "There are lots of UPI apps available like Phonepe, Amazon Pay, Paytm, Bhim, Mobikwik etc. from where you can fetch your UPI ID."
            }
          />

          <Checkbox
            text={
              "I agree with the KYC registration Terms and Conditions to verifiy my identity."
            }
            value={consent}
            setValue={setConsent}
          />

          <BankVerifyApi
            data={{ account_number: accountNumber, ifsc: ifsc, consent: "Y" }}
            style={form.nextButton}
            disabled={
              !ifscNext || !accNumNext || !consent || !accountHolderName
            }
            type={props?.route?.params?.type || ""}
          />

          <View style={bankform.padding}></View>
        </View>
      </KeyboardAvoidingWrapper>
    </>
  );
};

export default BankFormTemplate;
