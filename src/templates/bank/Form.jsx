import { useIsFocused, useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import BankVerifyApi from "../../apis/bank/Verify";
import InfoCard from "../../components/atoms/InfoCard";
import Loading from "../../components/atoms/Loading";
import ShieldTitle from "../../components/atoms/ShieldTitle";
import PopableInput from "../../components/molecules/PopableInput";
import { strings } from "../../helpers/Localization";
import {
  InteractionTypes,
  trackEvent
} from "../../helpers/analytics/commonAnalytics";
import { KYC_POLLING_DURATION } from "../../services/constants";
import { useGetKycQuery } from "../../store/apiSlices/kycApi";
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
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const { data: kycData, isLoading: kycLoading } = useGetKycQuery(
    unipeEmployeeId,
    {
      pollingInterval: KYC_POLLING_DURATION,
    }
  );

  const { aadhaar, bank } = kycData ?? {};

  const aadhaarVerifyStatus = aadhaar?.verifyStatus;

  const [ifsc, setIfsc] = useState(bank?.data?.ifsc);
  const [accountNumber, setAccountNumber] = useState(bank?.data?.accountNumber);
  const [accountHolderName, setAccountHolderName] = useState(
    aadhaar?.data?.name || bank?.data?.accountHolderName
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
      trackEvent({
        interaction: InteractionTypes.SCREEN_OPEN,
        screen: "bank",
        action: "COMPLETE",
      });
      dispatch(addIfsc(ifsc));
      setIfscNext(true);
    } else {
      setIfscNext(false);
    }
  }, [ifsc]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      {kycLoading ? (
        <Loading isLoading={kycLoading} />
      ) : (
        <KeyboardAvoidingWrapper>
          <View>
            <PopableInput
              accessibilityLabel="AccHolderName"
              placeholder={strings.accountHolderName}
              value={accountHolderName}
              onChange={setAccountHolderName}
              autoCapitalize="characters"
              content={strings.referToPassbook}
            />

            <PopableInput
              accessibilityLabel={"AccNumber"}
              placeholder={strings.bankAccountNumber}
              value={accountNumber}
              onChange={setAccountNumber}
              autoFocus={isFocused}
              autoCapitalize="characters"
              content={strings.refertoGetAccountNumber}
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
              content={strings.find}
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

            <InfoCard info={strings.pleaseNote} />

            <BankVerifyApi
              disabled={!ifscNext || !accNumNext || !accountHolderName}
              type={props?.route?.params?.type || ""}
              accountNumber={accountNumber}
              accountHolderName={accountHolderName}
              ifsc={ifsc}
              upi={upi}
            />
            <ShieldTitle title={strings.detailsSafe} />
          </View>
        </KeyboardAvoidingWrapper>
      )}
    </SafeAreaView>
  );
};

export default BankFormTemplate;
