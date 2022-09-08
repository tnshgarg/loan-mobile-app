import { Button } from "@react-native-material/core";
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
import SplashScreen from "react-native-splash-screen";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import { putBackendData } from "../../services/employees/employeeServices";
import { sendSmsVerification } from "../../services/otp/Gupshup/services";
import { addId, addOnboarded, addPhoneNumber } from "../../store/slices/authSlice";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { styles } from "../../styles";

export default LoginScreen = () => {
  SplashScreen.hide();

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState(false);
  
  const authSlice = useSelector((state) => state.auth.phoneNumber);
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
    var fullPhoneNumber = `+91${phoneNumber}`;
    putBackendData({ document: {number: fullPhoneNumber}, xpath: "mobile" })
      .then((res) => {
        if (res.data["status"] == 200) {
          setId(res.data["id"]);
          setOnboarded(res.data["onboarded"]);
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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingWrapper>
        <View>
          <Image
            style={styles.logo}
            source={require("../../assets/unipe-Thumbnail.png")}
          />
          <Text style={styles.headline}>
            Please enter your mobile number to login:
          </Text>
          <Text style={styles.fieldLabel}>Mobile Number</Text>
          <TextInput
            style={styles.textInput}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            autoCompleteType="tel"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            maxLength={13}
            placeholder="9999999999"
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
              {next ? (
                <Button
                  uppercase={false}
                  title="Continue"
                  type="solid"
                  style={styles.ContinueButton}
                  color="#4E46F1"
                  onPress={() => signIn()}
                />
              ) : (
                <Button
                  uppercase={false}
                  title="Continue"
                  type="solid"
                  style={styles.ContinueButton}
                  disabled
                />
              )}
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
