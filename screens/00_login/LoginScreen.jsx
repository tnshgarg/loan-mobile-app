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

import { GenerateDocument } from "../../helpers/GenerateDocument";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import { putBackendData } from "../../services/employees/employeeServices";
import { sendSmsVerification } from "../../services/otp/Twilio/verify";
import { addId, addPhoneNumber } from "../../store/slices/authSlice";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { styles } from "../../styles";

export default LoginScreen = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [phoneNumber, setPhoneNumber] = useState(
    useSelector((state) => state.auth.phoneNumber)
  );
  const [next, setNext] = useState(false);
  

  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null);
  var phn = "";

  useEffect(() => {
    dispatch(addCurrentScreen("Login"));
  }, []);

  const onPhoneNumberPressed = async () => {
    try {
      phn = await SmsRetriever.requestPhoneNumber();
      setPhoneNumber(phn.replace("+91", ""));
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  // const signIn = () => {
  //   Auth.signIn(phoneNumber)
  //     .then((result) => {
  //       setSession(result);
  //       console.log(result);
  //       navigation.navigate("Otp");
  //     })
  //     .catch((e) => {
  //       if (e.code === 'UserNotFoundException') {
  //         signUp();
  //         console.log('User not found');
  //       } else if (e.code === 'UsernameExistsException') {
  //         signIn();
  //         console.log('User already exists');
  //       } else {
  //         console.log(e.code);
  //         console.error(e);
  //       }
  //     });
  // };
  // const signUp = async () => {
  //   const result = await Auth.signUp({
  //     username: phoneNumber,
  //     password,
  //     attributes: {
  //       phone_number: phoneNumber,
  //     },
  //   }).then(() => signIn());
  //   return result;
  // };
  // useEffect(() => {
  //   dispatch({
  //     type: "SET_SESSION",
  //     payload: session,
  //   })}, [session]);

  const signIn = () => {
    setLoading(true);
    var fullPhoneNumber = `+91${phoneNumber}`;
    var phonePayload = GenerateDocument({
      src: "otp",
      number: fullPhoneNumber,
    });
    putBackendData({ document: phonePayload, src: "Mobile" })
      .then((res) => {
        console.log(phonePayload);
        console.log(res.data);
        if (res.data["status"] == 201) {
          setId(res.data["id"]);
          sendSmsVerification(fullPhoneNumber)
            .then((sent) => {
              setLoading(false);
              if (sent) {
                console.log("Sent!");
                navigation.navigate("Otp");
              } else {
                console.log("Code not sent");
                console.log("IsSent: ", sent);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          Alert.alert("Error", res.data["message"]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    dispatch(addId(id));
  }, [id]);

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

  useEffect(() => {
    onPhoneNumberPressed();
  }, []);

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
          {!isLoading ? (
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
