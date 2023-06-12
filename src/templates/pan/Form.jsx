import { useIsFocused, useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Linking, SafeAreaView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import PanVerifyApi from "../../apis/pan/Verify";
import FormInput from "../../components/atoms/FormInput";
import InfoCard from "../../components/atoms/InfoCard";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import { COLORS, FONTS } from "../../constants/Theme";
import { strings } from "../../helpers/Localization";
import { addNumber } from "../../store/slices/panSlice";
import { bankform, form, styles } from "../../styles";

const PanFormTemplate = (props) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [validNumber, setValidNumber] = useState(true);

  const aadhaarVerifyStatus = useSelector(
    (state) => state.aadhaar.verifyStatus
  );

  const panSlice = useSelector((state) => state.pan);
  const [number, setNumber] = useState(panSlice?.number);

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
      {true ? (
        <KeyboardAvoidingWrapper>
          <View>
            <Text style={styles.headline}>Enter your PAN number</Text>
            <Text style={styles.subHeadline}>
              कृपया अपना पैन नम्बर यहाँ भरें।
            </Text>

            <FormInput
              accessibilityLabel={"PanInput"}
              placeholder={strings.enterPanNumber}
              keyboardType="default"
              autoCapitalize="characters"
              autoFocus={isFocused}
              value={number}
              onChange={setNumber}
              maxLength={10}
              numeric
              appendComponent={
                <Text style={{ ...FONTS.body5, color: COLORS.gray }}>
                  {number.length}/10
                </Text>
              }
            />

            {number && !validNumber ? (
              <Text style={bankform.formatmsg}>{strings.invalidPanNumber}</Text>
            ) : null}

            <View style={form.forgotText}>
              <Text
                style={styles.termsText}
                onPress={() =>
                  Linking.openURL(
                    "https://docs.google.com/document/d/19nf3qwzXcun0yTN6WH6iA5hpGKlgsg4erbHuDql0EZQ/edit"
                  )
                }
              >
                {strings.forgotPan}
              </Text>
            </View>

            <InfoCard info={strings.agreeKycTNCPan} />

            <PanVerifyApi
              disabled={!validNumber}
              type={props?.route?.params?.type || ""}
            />
          </View>
        </KeyboardAvoidingWrapper>
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
