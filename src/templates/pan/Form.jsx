import { useIsFocused, useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PanVerifyApi from "../../apis/pan/Verify";
import FormInput from "../../components/atoms/FormInput";
import HelpCard from "../../components/atoms/HelpCard";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import { COLORS, FONTS } from "../../constants/Theme";
import { navigationHelper } from "../../helpers/CmsNavigationHelper";
import { strings } from "../../helpers/Localization";
import { KYC_POLLING_DURATION } from "../../services/constants";
import { useGetKycQuery } from "../../store/apiSlices/kycApi";
import { addNumber } from "../../store/slices/panSlice";
import { bankform, form, styles } from "../../styles";

const PanFormTemplate = (props) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [validNumber, setValidNumber] = useState(true);
  const { unipeEmployeeId, token, onboarded } = useSelector(
    (state) => state.auth
  );
  const { data: kycData, isLoading: kycLoading,isFetching: kycFetching } = useGetKycQuery(unipeEmployeeId, {
    pollingInterval: KYC_POLLING_DURATION,
  });
  const {
    isAadhaarSuccess,
    pan,
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
      {(kycLoading || kycFetching) ? (<>
        <ActivityIndicator />
      </>) : isAadhaarSuccess ? (
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
              onRightIconPress={() =>
                navigationHelper({
                  type: "cms",
                  params: { blogKey: "pan_help" },
                })
              }
            >
              {strings.forgotPan}
            </Text>
          </View>
          <View style={{ flex: 1 }} />
          <HelpCard
            text="PAN card"
            onPress={() =>
              navigationHelper({
                type: "cms",
                params: { blogKey: "pan_help" },
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
