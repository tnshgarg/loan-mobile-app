import { useIsFocused, useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Linking, SafeAreaView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import PanVerifyApi from "../../apis/pan/Verify";
import FormInput from "../../components/atoms/FormInput";
import InfoCard from "../../components/atoms/InfoCard";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import HelpCard from "../../components/atoms/HelpCard";
import { useGetKycQuery } from "../../store/apiSlices/kycApi";
import { strings } from "../../helpers/Localization";
import { navigationHelper } from "../../helpers/CmsNavigationHelper";
import { bankform, form, styles } from "../../styles";
import { COLORS, FONTS } from "../../constants/Theme";
import { addNumber } from "../../store/slices/panSlice";

const PanFormTemplate = (props) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [validNumber, setValidNumber] = useState(true);
  const { unipeEmployeeId, token, onboarded } = useSelector(
    (state) => state.auth
  );
  const { data: kycData } = useGetKycQuery(unipeEmployeeId, {
    pollingInterval: 1000 * 60 * 60 * 24,
  });
  const {
    isAadhaarSuccess,
    isPanSuccess,
    isBankSuccess,
    isProfileSuccess,
    profile,
    aadhaar,
    pan,
    bank,
  } = kycData ?? {};

  const [number, setNumber] = useState(pan?.number);

  useEffect(() => {
    let panReg = /^[A-Z]{5}\d{4}[A-Z]$/gm;
    if (panReg.test(number)) {
      dispatch(addNumber(number));
      setValidNumber(true);
    } else {
      setValidNumber(false);
    }
    return () => {};
  }, [number]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      {aadhaar?.verifyStatus === "SUCCESS" ? (
        <View style={styles.container}>
          <FormInput
            accessibilityLabel={"PanInput"}
            placeholder={"Enter PAN Number"}
            keyboardType="default"
            autoCapitalize="characters"
            autoFocus={isFocused}
            value={number}
            onChange={setNumber}
            maxLength={10}
            numeric
            appendComponent={
              <Text style={{ ...FONTS.body5, color: COLORS.gray }}>
                {number?.length}/10
              </Text>
            }
          />

          {number && !validNumber ? (
            <Text style={bankform.formatmsg}>{strings.invalidPanNumber}</Text>
          ) : null}

          <View style={form.forgotText}>
            <Text
              style={styles.termsText}
              // onPress={() =>
              //   Linking.openURL(
              //     "https://docs.google.com/document/d/19nf3qwzXcun0yTN6WH6iA5hpGKlgsg4erbHuDql0EZQ/edit"
              //   )
              // }
              onRightIconPress={() =>
                navigationHelper({
                  type: "cms",
                  params: { blogKey: "AadhaarHelp" },
                })
              }
            >
              {strings.forgotPan}
            </Text>
          </View>
          <View style={{ flex: 1 }} />
          <HelpCard
            text="PAN card"
            onRightIconPress={() =>
              navigationHelper({
                type: "cms",
                params: { blogKey: "AadhaarHelp" },
              })
            }
          />

          {/* <InfoCard
            info={
              "I agree with the KYC registration Terms & Conditions to verifiy my identity. PAN is required to verify name and date of birth."
            }
          /> */}

          <PanVerifyApi
            disabled={!validNumber}
            type={props?.route?.params?.type || ""}
            number={number}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={bankform.subTitle}>{strings.verifyAadhaarFirst}</Text>
          <PrimaryButton
            title={strings.verifyAadhaar}
            onPress={() => {
              props?.route?.params?.type === "KYC"
                ? navigation.navigate("KYC", {
                    screen: "AADHAAR",
                  })
                : navigation.navigate("AadhaarForm");
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default PanFormTemplate;
