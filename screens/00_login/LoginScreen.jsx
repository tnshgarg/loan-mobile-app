import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import SmsRetriever from "react-native-sms-retriever";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../../components/PrimaryButton";
import SplashScreen from "react-native-splash-screen";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import { putBackendData } from "../../services/employees/employeeServices";
import { sendSmsVerification } from "../../services/otp/Gupshup/services";
import {
  addId,
  addOnboarded,
  addPhoneNumber,
} from "../../store/slices/authSlice";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { resetTimer } from "../../store/slices/timerSlice";
import { styles } from "../../styles";
import { COLORS, FONTS } from "../../constants/Theme";
import SVGImg from "../../assets/UnipeLogo.svg";
import FormInput from "../../components/atoms/FormInput";

export default LoginScreen = () => {
  SplashScreen.hide();

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState(false);

  const authSlice = useSelector((state) => state.auth);
  const [id, setId] = useState(authSlice?.id);
  const [onboarded, setOnboarded] = useState(authSlice?.onboarded);
  const [phoneNumber, setPhoneNumber] = useState(authSlice?.phoneNumber);

  var phone_number = "";

  useEffect(() => {
    dispatch(addCurrentScreen("Login"));
  }, []);

  useEffect(() => {
    dispatch(addId(id));
  }, [id]);

  useEffect(() => {
    dispatch(addOnboarded(onboarded));
  }, [onboarded]);

  useEffect(() => {
    dispatch(addPhoneNumber(phoneNumber));
  }, [phoneNumber]);

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
      phone_number = await SmsRetriever.requestPhoneNumber();
      setPhoneNumber(phone_number.replace("+91", ""));
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  useEffect(() => {
    onPhoneNumberPressed();
  }, []);

  const signIn = () => {
    setLoading(true);
    dispatch(resetTimer());
    var fullPhoneNumber = `+91${phoneNumber}`;
    putBackendData({ document: { number: fullPhoneNumber }, xpath: "mobile" })
      .then((res) => {
        console.log("LoginScreen res.data: ", res.data);
        if (res.data.status === 200) {
          setId(res.data.body.id);
          setOnboarded(res.data.body.onboarded);
          sendSmsVerification(phoneNumber)
            .then((result) => {
              console.log("sendSmsVerification result: ", result);
              if (result["response"]["status"] === "success") {
                navigation.navigate("Otp");
              } else {
                setLoading(false);
                Alert.alert(
                  result["response"]["status"],
                  result["response"]["details"]
                );
              }
            })
            .catch((error) => {
              setLoading(false);
              console.log(error);
              Alert("Error", "Something is Wrong");
            });
        } else {
          setLoading(false);
          Alert.alert("Error", res.data["message"]);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={[styles.container, { padding: 0 }]}>
      <KeyboardAvoidingWrapper>
        <View>
          {/* <SVGImg
            style={styles.logo}
          /> */}

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
            prependComponent={
              <Text
                style={{ ...FONTS.h4, color: COLORS.black, paddingRight: 10 }}
              >
                +91
              </Text>
            }
          />

          <Text style={styles.dataUseText}>
            This number will be used for all communication. You shall receive an
            SMS with code for verification. By continuing, you agree to our{" "}
            <Text
              onPress={() =>
                Linking.openURL("https://policies.google.com/terms?hl=en-US")
              }
              style={styles.termsText}
            >
              Terms of Service
            </Text>{" "}
            &{" "}
            <Text
              onPress={() =>
                Linking.openURL("https://policies.google.com/privacy?hl=en-US")
              }
              style={styles.termsText}
            >
              Privacy Policy
            </Text>
          </Text>
          {!loading ? (
            <>
              <PrimaryButton
                uppercase={false}
                title="Continue"
                type="solid"
                color={COLORS.primary}
                disabled={!next}
                onPress={() => signIn()}
              />
            </>
          ) : (
            <TouchableOpacity>
              <View style={styles.LoadingButton}>
                <ActivityIndicator size="large" color="white" />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
};
