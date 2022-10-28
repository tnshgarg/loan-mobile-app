import Analytics from "appcenter-analytics";
import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import SmsRetriever from "react-native-sms-retriever";
import SplashScreen from "react-native-splash-screen";
import { useDispatch, useSelector } from "react-redux";
import SVGImg from "../../assets/UnipeLogo.svg";
import FormInput from "../../components/atoms/FormInput";
import TermsAndPrivacyModal from "../../components/molecules/TermsAndPrivacyModal";
import PrimaryButton from "../../components/PrimaryButton";
import { COLORS, FONTS } from "../../constants/Theme";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import { putBackendData } from "../../services/employees/employeeServices";
import { sendSmsVerification } from "../../services/otp/Gupshup/services";
import {
  addOnboarded,
  addPhoneNumber,
  addToken,
  addUnipeEmployeeId,
} from "../../store/slices/authSlice";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { resetTimer } from "../../store/slices/timerSlice";
import { styles } from "../../styles";
import privacyPolicy from "../../templates/docs/PrivacyPolicy.js";
import termsOfUse from "../../templates/docs/TermsOfUse.js";


const LoginScreen = () => {

  SplashScreen.hide();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState(false);

  const authSlice = useSelector((state) => state.auth);
  const [onboarded, setOnboarded] = useState(authSlice?.onboarded);
  const [phoneNumber, setPhoneNumber] = useState(authSlice?.phoneNumber);
  const [token, setToken] = useState(authSlice?.token);
  const [unipeEmployeeId, setUnipeEmployeeId] = useState(authSlice?.unipeEmployeeId);

  const [isPrivacyModalVisible, setIsPrivacyModalVisible] = useState(false);
  const [isTermsOfUseModalVisible, setIsTermsOfUseModalVisible] =
    useState(false);

  useEffect(() => {
    dispatch(addCurrentScreen("Login"));
  }, []);

  useEffect(() => {
    dispatch(addToken(token));
  }, [token]);

  useEffect(() => {
    dispatch(addOnboarded(onboarded));
  }, [onboarded]);

  useEffect(() => {
    dispatch(addPhoneNumber(phoneNumber));
  }, [phoneNumber]);

  useEffect(() => {
    dispatch(addUnipeEmployeeId(unipeEmployeeId));
  }, [unipeEmployeeId]);

  useEffect(() => {
    var phoneno = /^[0-9]{10}$/gm;
    if (phoneno.test(phoneNumber) && phoneNumber.length === 10) {
      setNext(true);
      console.log("true");
    } else {
      setNext(false);
      console.log("false");
    }
  }, [phoneNumber]);

  const onPhoneNumberPressed = async () => {
    try {
      var phoneNumber = await SmsRetriever.requestPhoneNumber();
      setPhoneNumber(phoneNumber.replace("+91", ""));
    } catch (error) {
      console.log("Error while fetching phoneNumber: ", error.toString());
    }
  };

  useEffect(() => {
    onPhoneNumberPressed();
  }, []);

  const signIn = () => {
    setLoading(true);
    dispatch(resetTimer());
    var fullPhoneNumber = `+91${phoneNumber}`;
    putBackendData({ data: { number: fullPhoneNumber }, xpath: "mobile", token: token })
      .then((res) => {
        console.log("LoginScreen res.data: ", res.data);
        if (res.data.status === 200) {
          setOnboarded(res.data.body.onboarded);
          setToken(res.data.body.token)
          setUnipeEmployeeId(res.data.body.unipeEmployeeId);
          Analytics.trackEvent(`LoginScreen|SignIn|Success`, {
            unipeEmployeeId: res.data.body.id,
          });
          sendSmsVerification(phoneNumber)
            .then((result) => {
              console.log("sendSmsVerification result: ", result);
              if (result["response"]["status"] === "success") {
                setLoading(false);
                Analytics.trackEvent("LoginScreen|SendSms|Success", {
                  unipeEmployeeId: unipeEmployeeId,
                });
                navigation.navigate("Otp");
              } else {
                setLoading(false);
                Analytics.trackEvent("LoginScreen|SendSms|Error", {
                  unipeEmployeeId: unipeEmployeeId,
                  error: result["response"]["details"],
                });
                Alert.alert(
                  result["response"]["status"],
                  result["response"]["details"]
                );
              }
            })
            .catch((error) => {
              console.log("sendSmsVerification result: ", error.toString());
              setLoading(false);
              Analytics.trackEvent("LoginScreen|SendSms|Error", {
                unipeEmployeeId: unipeEmployeeId,
                error: error.toString(),
              });
              Alert("Error", error.toString());
            });
        } else {
          setLoading(false);
          Analytics.trackEvent("LoginScreen|SignIn|Error", {
            phoneNumber: phoneNumber,
            error: res.data["message"],
          });
          Alert.alert("Error", res.data["message"]);
        }
      })
      .catch((error) => {
        console.log("LoginScreen res.data: ", error.toString());
        setLoading(false);
        Analytics.trackEvent("LoginScreen|SignIn|Error", {
          phoneNumber: phoneNumber,
          error: error.toString(),
        });
      });
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingWrapper>
        <View>
          <SVGImg style={styles.logo} />
          <Text style={styles.headline}>
            Please enter your mobile number to login:
          </Text>

          <FormInput
            placeholder="Enter mobile number"
            containerStyle={{ marginVertical: 30 }}
            autoCompleteType="tel"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChange={setPhoneNumber}
            autoFocus={true}
            maxLength={10}
            prependComponent={
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  borderRightWidth: 1,
                  borderColor: COLORS.gray,
                  marginRight: 10,
                  height: "80%",
                }}
              >
                <Text
                  style={{
                    ...FONTS.h3,
                    color: COLORS.black,
                    paddingRight: 10,
                    // fontWeight: "bold",
                  }}
                >
                  + 91
                </Text>
              </View>
            }
          />

          <Text style={styles.dataUseText}>
            This number will be used for all communication. You shall receive an
            SMS with code for verification. By continuing, you agree to our{" "}
            <Text
              onPress={() => setIsTermsOfUseModalVisible(true)}
              style={styles.termsText}
            >
              Terms of Service
            </Text>{" "}
            &{" "}
            <Text
              onPress={() => setIsPrivacyModalVisible(true)}
              style={styles.termsText}
            >
              Privacy Policy
            </Text>
          </Text>
          <PrimaryButton
            title="Continue"
            disabled={!next}
            loading={loading}
            onPress={() => signIn()}
          />
        </View>
      </KeyboardAvoidingWrapper>

      {isTermsOfUseModalVisible && (
        <TermsAndPrivacyModal
          isVisible={isTermsOfUseModalVisible}
          setIsVisible={setIsTermsOfUseModalVisible}
          data={termsOfUse}
        />
      )}

      {isPrivacyModalVisible && (
        <TermsAndPrivacyModal
          isVisible={isPrivacyModalVisible}
          setIsVisible={setIsPrivacyModalVisible}
          data={privacyPolicy}
        />
      )}
    </SafeAreaView>
  );
};

export default LoginScreen;
