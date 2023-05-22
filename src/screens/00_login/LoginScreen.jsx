import Analytics from "appcenter-analytics";
import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  SafeAreaView,
  Text,
  View,
  Linking,
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
import LogoImage from "../../assets/HeaderLogo.svg";
import Tick from "../../assets/Tick.svg";
import Face from "../../assets/Face.svg";
import SvgContainer from "../../components/atoms/SvgContainer";
import LinearGradient from "react-native-linear-gradient";

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
  const token = authSlice?.token;
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
              Alert.alert("Error", JSON.stringify(error));
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
        toValue: 8,
        duration: 100,
        useNativeDriver: false,
        easing: EasingNode.in,
      }).start();
    } else {
      Animated.timing(bottomFlex, {
        toValue: 0,
        duration: 50,
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
        <SvgContainer height={24} width={24}>
          <Tick />
        </SvgContainer>
      ),
    },
    {
      title: "No Joining Fees",
      imageUri: (
        <SvgContainer height={24} width={24}>
          <Tick />
        </SvgContainer>
      ),
    },
    {
      title: "Instant cash in bank account",
      imageUri: (
        <SvgContainer height={24} width={24}>
          <Tick />
        </SvgContainer>
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
      {startClicked ? (
        <LogoHeader
          headline={"Enter Mobile Number"}
          // rightIcon={
          //   <Icon name="logo-whatsapp" size={28} color={COLORS.primary} />
          // }
          // rightOnPress={() => {
          //   Linking.openURL(`whatsapp://send?text=&phone=7483447528`);
          // }}
        />
      ) : (
        <LinearGradient
          colors={[
            "rgba(110, 220, 133,0.2)",
            "rgba(237, 251, 139,0.2)",
            "#FFFFFF",
          ]}
          style={{
            flex: 1,
          }}
        >
          <View
            style={[
              styles.container,
              { justifyContent: "space-between", backgroundColor: null },
            ]}
          >
            <View style={{ flexDirection: "row", width: "100%" }}>
              <SvgContainer width={150} height={50}>
                <LogoImage />
              </SvgContainer>
              <View style={{ margin: "-5%", marginLeft: "-10%" }}>
                <SvgContainer width={250} height={250}>
                  <Face />
                </SvgContainer>
              </View>
            </View>

            <Text
              style={{
                ...FONTS.h1,
                color: COLORS.secondary,
              }}
            >
              Get Your Advance{"\n"}Salary. Today.
            </Text>
          </View>
        </LinearGradient>
      )}
      {!startClicked && (
        <View style={[styles.container, { flex: 0 }]}>
          {data.map((item, index) => (
            <SvgListItem item={item} key={index} />
          ))}
        </View>
      )}

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
