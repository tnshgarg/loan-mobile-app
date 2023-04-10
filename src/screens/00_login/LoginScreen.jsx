import Analytics from "appcenter-analytics";
import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  Linking,
  SafeAreaView,
  Text,
  View,
  Keyboard,
} from "react-native";
import SmsRetriever from "react-native-sms-retriever";
import { useDispatch, useSelector } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import PushNotification, {Importance} from 'react-native-push-notification';
import SplashScreen from "react-native-splash-screen";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import { COLORS, FONTS } from "../../constants/Theme";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import { putBackendData } from "../../services/employees/employeeServices";
import { sendSmsVerification } from "../../services/otp/Gupshup/services";
import {
  addACTC,
  addEmployeeName,
  addOnboarded,
  addPhoneNumber,
  addToken,
  addUnipeEmployeeId,
} from "../../store/slices/authSlice";
import {
  addCurrentScreen,
  addCurrentStack,
} from "../../store/slices/navigationSlice";
import { resetTimer } from "../../store/slices/timerSlice";
import { styles } from "../../styles";
import LogoHeader from "../../components/atoms/LogoHeader";
import Icon from "react-native-vector-icons/Ionicons";
import ShieldTitle from "../../components/atoms/ShieldTitle";
import LoginInput from "../../components/molecules/LoginInput";
import AgreementText from "../../components/organisms/AgreementText";
import { STAGE } from "@env";
import Animated, { EasingNode } from "react-native-reanimated";
import SvgListItem from "../../components/molecules/SvgListItem";

const LoginScreen = () => {
  SplashScreen.hide();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState(false);

  const authSlice = useSelector((state) => state.auth);
  const [aCTC, setACTC] = useState(authSlice?.aCTC);
  const [employeeName, setEmployeeName] = useState(authSlice?.employeeName);
  const [onboarded, setOnboarded] = useState(authSlice?.onboarded);
  const [phoneNumber, setPhoneNumber] = useState(authSlice?.phoneNumber);
  const [token, setToken] = useState(authSlice?.token);
  const [unipeEmployeeId, setUnipeEmployeeId] = useState(
    authSlice?.unipeEmployeeId
  );

  const [isPrivacyModalVisible, setIsPrivacyModalVisible] = useState(false);
  const [isTermsOfUseModalVisible, setIsTermsOfUseModalVisible] =
    useState(false);

  useEffect(() => {
    dispatch(addCurrentStack("OnboardingStack"));
    dispatch(addCurrentScreen("Login"));
  }, []);

  useEffect(() => {
    dispatch(addToken(token));
  }, [token]);

  useEffect(() => {
    dispatch(addACTC(aCTC));
  }, [aCTC]);

  useEffect(() => {
    dispatch(addEmployeeName(employeeName));
  }, [employeeName]);

  useEffect(() => {
    dispatch(addOnboarded(onboarded));
  }, [onboarded]);

  useEffect(() => {
    dispatch(addUnipeEmployeeId(unipeEmployeeId));
  }, [unipeEmployeeId]);

  useEffect(() => {
    var phoneno = /^[0-9]{10}$/gm;
    if (phoneno.test(phoneNumber) && phoneNumber.length === 10) {
      dispatch(addPhoneNumber(phoneNumber));
      setNext(true);
    } else {
      setNext(false);
    }
  }, [phoneNumber]);

  const onPhoneNumberPressed = async () => {
    try {
      var phoneNumber = await SmsRetriever.requestPhoneNumber();
      setPhoneNumber(phoneNumber.replace("+91", ""));
    } catch (error) {
      console.log("Error while fetching phoneNumber: ", JSON.stringify(error));
    }
  };

  useEffect(() => {
    if (STAGE !== "dev") {
      onPhoneNumberPressed();
    }
  }, []);

  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      { text: "No", onPress: () => null, style: "cancel" },
      { text: "Yes", onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const signIn = () => {
    setLoading(true);
    dispatch(resetTimer());
    var fullPhoneNumber = `+91${phoneNumber}`;
    putBackendData({
      data: { number: fullPhoneNumber },
      xpath: "mobile",
      token: token,
    })
      .then((res) => {
        const responseJson = res?.data;
        console.log(`responseJson: responseJson`);
        if (responseJson.status === 200) {
          setACTC(responseJson.body.aCTC);
          setEmployeeName(responseJson.body.employeeName);
          setOnboarded(responseJson.body.onboarded);
          setToken(responseJson.body.token);
          setUnipeEmployeeId(responseJson.body.unipeEmployeeId);
          sendSmsVerification(phoneNumber)
            .then((result) => {
              if (result["response"]["status"] === "success") {
                setLoading(false);
                Analytics.trackEvent("LoginScreen|SendSms|Success", {
                  unipeEmployeeId: unipeEmployeeId,
                });
                navigation.navigate("Otp");
              } else {
                setLoading(false);
                Alert.alert(
                  result["response"]["status"],
                  result["response"]["details"]
                );
                Analytics.trackEvent("LoginScreen|SendSms|Error", {
                  unipeEmployeeId: unipeEmployeeId,
                  error: result["response"]["details"],
                });
              }
            })
            .catch((error) => {
              setLoading(false);
              Alert("Error", JSON.stringify(error));
              Analytics.trackEvent("LoginScreen|SendSms|Error", {
                unipeEmployeeId: unipeEmployeeId,
                error: JSON.stringify(error),
              });
            });
        } else {
          setLoading(false);
          Alert.alert("Error", responseJson["message"]);
          Analytics.trackEvent("LoginScreen|SignIn|Error", {
            phoneNumber: phoneNumber,
            error: responseJson["message"],
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert("Error", JSON.stringify(error));
        Analytics.trackEvent("LoginScreen|SignIn|Error", {
          phoneNumber: phoneNumber,
          error: JSON.stringify(error),
        });
      });
  };

  const [startClicked, setStartClicked] = useState(false);
  useEffect(() => {
    if (startClicked) {
      Animated.timing(bottomFlex, {
        toValue: 4,
        duration: 250,
        useNativeDriver: false,
        easing: EasingNode.in,
      }).start();
    } else {
      Animated.timing(bottomFlex, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
        easing: EasingNode.in,
      }).start();
    }
  }, [startClicked]);
  const [bottomFlex, setbottomFlex] = useState(new Animated.Value(0));

  const data = [
    {
      title: "0% Interest Charges",
      imageUri: (
        <MaterialCommunityIcons
          name="check-circle"
          size={20}
          color={COLORS.primary}
        />
      ),
    },
    {
      title: "No Joining Fees",
      imageUri: (
        <MaterialCommunityIcons
          name="check-circle"
          size={20}
          color={COLORS.primary}
        />
      ),
    },
    {
      title: "Instant cash in bank account",
      imageUri: (
        <MaterialCommunityIcons
          name="check-circle"
          size={20}
          color={COLORS.primary}
        />
      ),
    },
  ];

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setStartClicked(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setStartClicked(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <SafeAreaView accessibilityLabel="LoginScreen" style={styles.safeContainer}>
      <LogoHeader
        rightIcon={
          <Icon name="logo-whatsapp" size={28} color={COLORS.primary} />
        }
        rightOnPress={() => {
          Linking.openURL(`whatsapp://send?text=&phone=7483447528`);
        }}
      />

      <View style={[styles.container]}>
        {startClicked ? (
          <Text
            style={[
              styles.subHeadline,
              {
                textAlign: "left",
                alignSelf: "flex-start",
                ...FONTS.body3,
                marginTop: "4%",
                marginBottom: 0,
                color: COLORS.secondary,
              },
            ]}
          >
            Welcome to Unipe
          </Text>
        ) : (
          <Text
            style={{
              ...FONTS.title,
              color: COLORS.primary,
            }}
          >
            नमस्ते
          </Text>
        )}
        <Text
          style={{
            ...FONTS.h1,
            color: COLORS.secondary,
            marginBottom: "5%",
          }}
        >
          Get your salary today!
        </Text>

        {!startClicked &&
          data.map((item, index) => <SvgListItem item={item} key={index} />)}
      </View>

      {/* {startClicked ? null : <View style={{ flex: 1 }} />} */}
      <Animated.View style={[styles.bottomPart, { flex: bottomFlex }]}>
        <KeyboardAvoidingWrapper>
          <View>
            <LoginInput
              accessibilityLabel="MobileNumber"
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              autoFocus={false}
            />

            <AgreementText
              isTermsOfUseModalVisible={isTermsOfUseModalVisible}
              setIsTermsOfUseModalVisible={setIsTermsOfUseModalVisible}
              isPrivacyModalVisible={isPrivacyModalVisible}
              setIsPrivacyModalVisible={setIsPrivacyModalVisible}
            />
          </View>
        </KeyboardAvoidingWrapper>
      </Animated.View>
      <View style={[styles.container, { flex: 0 }]}>
        <PrimaryButton
          title="Continue"
          accessibilityLabel="LoginNextBtn"
          disabled={!next}
          loading={loading}
          onPress={() => signIn()}
        />
        <ShieldTitle title={"100% Secure"} />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
