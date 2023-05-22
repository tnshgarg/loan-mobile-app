import { useEffect, useState } from "react";
import { Linking, SafeAreaView, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import { bankform, form, styles } from "../../styles";
import { COLORS, FONTS } from "../../constants/Theme";
import PanVerifyApi from "../../apis/pan/Verify";
import { addNumber } from "../../store/slices/panSlice";
import InfoCard from "../../components/atoms/InfoCard";
import FormInput from "../../components/atoms/FormInput";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import { useNavigation, useIsFocused } from "@react-navigation/core";
import HelpCard from "../../components/atoms/HelpCard";

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
      {aadhaarVerifyStatus === "SUCCESS" ? (
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
                {number.length}/10
              </Text>
            }
          />

          {number && !validNumber ? (
            <Text style={bankform.formatmsg}>Invalid PAN Number.</Text>
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
              Forgot PAN?
            </Text>
          </View>
          <View style={{ flex: 1 }} />
          <HelpCard text="PAN card" />

          {/* <InfoCard
            info={
              "I agree with the KYC registration Terms & Conditions to verifiy my identity. PAN is required to verify name and date of birth."
            }
          /> */}

          <PanVerifyApi
            disabled={!validNumber}
            type={props?.route?.params?.type || ""}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={bankform.subTitle}>
            Please verify your aadhaar first
          </Text>
          <PrimaryButton
            title="Verify Aadhaar Now"
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
