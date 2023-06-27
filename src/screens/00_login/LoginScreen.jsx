import { STAGE } from "@env";
import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import {
  Alert,
  Animated,
  BackHandler,
  Easing,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import SmsRetriever from "react-native-sms-retriever";
import SplashScreen from "react-native-splash-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import ShieldTitle from "../../components/atoms/ShieldTitle";
import LoginInput from "../../components/molecules/LoginInput";
import AgreementText from "../../components/organisms/AgreementText";
import { COLORS, FONTS } from "../../constants/Theme";
import Analytics, {
  InteractionTypes,
} from "../../helpers/analytics/commonAnalytics";
import { useGenerateOtpMutation } from "../../store/apiSlices/loginApi";
import { addPhoneNumber } from "../../store/slices/authSlice";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { resetTimer } from "../../store/slices/timerSlice";
import { styles } from "../../styles";
// import Animated, { EasingNode } from "react-native-reanimated";
import { Keyboard } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import Face from "../../assets/Face.svg";
import LogoImage from "../../assets/HeaderLogo.svg";
import Tick from "../../assets/Tick.svg";
import LogoHeader from "../../components/atoms/LogoHeader";
import SvgContainer from "../../components/atoms/SvgContainer";
import SvgListItem from "../../components/molecules/SvgListItem";
import { strings } from "../../helpers/Localization";
import { addLanguage } from "../../store/slices/localizationSlice";

const LoginScreen = () => {
  SplashScreen.hide();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState(false);
  const language = useSelector((state) => state.localization.language);

  console.log("Language: ", language);

  const authSlice = useSelector((state) => state.auth);
  const [phoneNumber, setPhoneNumber] = useState(authSlice?.phoneNumber);
  const [postGenerateOtp] = useGenerateOtpMutation();
  const [isPrivacyModalVisible, setIsPrivacyModalVisible] = useState(false);
  const [isTermsOfUseModalVisible, setIsTermsOfUseModalVisible] =
    useState(false);

  useEffect(() => {
    dispatch(addCurrentScreen("Login"));
  }, []);

  useEffect(() => {
    let phoneno = /^\d{10}$/gm;
    if (phoneno.test(phoneNumber) && phoneNumber.length === 10) {
      dispatch(addPhoneNumber(phoneNumber));
      setNext(true);
    } else {
      setNext(false);
    }
  }, [phoneNumber]);

  const onPhoneNumberPressed = async () => {
    try {
      let phoneNumber = await SmsRetriever.requestPhoneNumber();
      setPhoneNumber(phoneNumber.replace("+91", ""));
    } catch (error) {
      console.log("Error while fetching phoneNumber: ", error.message);
    }
  };

  useEffect(() => {
    if (STAGE === "dev") {
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
    postGenerateOtp(phoneNumber)
      .unwrap()
      .then((otpResponse) => {
        console.log("otpResponse", otpResponse);
        Analytics.trackEvent({
          interaction: InteractionTypes.BUTTON_PRESS,
          component: "LoginScreen",
          action: "SendSms",
          status: "Success"
        });
        // TODO: Success message handling
        navigation.navigate("Otp");
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
        Alert.alert("Error", error.message);
        Analytics.trackEvent({
          interaction: InteractionTypes.BUTTON_PRESS,
          component: "LoginScreen",
          action: "SendSms",
          status: "Error",
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
        easing: Easing.out(Easing.exp),
      }).start();
    } else {
      Animated.timing(bottomFlex, {
        toValue: 0,
        duration: 50,
        useNativeDriver: false,
        easing: Easing.in(Easing.exp),
      }).start();
    }
  }, [startClicked]);
  const [bottomFlex, setbottomFlex] = useState(new Animated.Value(0));

  const data = [
    {
      title: strings.zeroInterestCharge,
      imageUri: (
        <SvgContainer height={24} width={24}>
          <Tick />
        </SvgContainer>
      ),
    },
    {
      title: strings.noJoiningFees,
      imageUri: (
        <SvgContainer height={24} width={24}>
          <Tick />
        </SvgContainer>
      ),
    },
    {
      title: strings.interestInBank,
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

  const goToLocalization = async () => {
    dispatch(addLanguage(""));
    navigation.navigate("OnboardingStack", { screen: "Localization" });
  };

  const goToLanding = () => {
    setStartClicked(false);
  };
  return (
    <SafeAreaView accessibilityLabel="LoginScreen" style={styles.safeContainer}>
      {startClicked ? (
        <LogoHeader
          headline={strings.enterMobileNumber}
          leftIcon={
            <Ionicons
              name="arrow-back-outline"
              size={28}
              color={COLORS.secondary}
            />
          }
          leftOnPress={() => goToLanding()}
          // rightIcon={
          //   <Icon name="logo-whatsapp" size={28} color={COLORS.primary} />
          // }
          // rightOnPress={() => {
          //   Linking.openURL(`whatsapp://send?text=&phone=7483447528`);
          // }}
        />
      ) : (
        <LinearGradient
          colors={[COLORS.lightGreen, COLORS.lightYellow, COLORS.white]}
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
              <Ionicons
                style={{ margin: 10 }}
                onPress={goToLocalization}
                name="arrow-back-outline"
                size={28}
                color={COLORS.secondary}
              />
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
              {strings.getAdvancedSalaryToday}
            </Text>
          </View>
        </LinearGradient>
      )}
      {!startClicked ? (
        <View style={[styles.container, { flex: 0 }]}>
          {data.map((item, index) => (
            <SvgListItem item={item} key={index} />
          ))}
        </View>
      ) : (
        <></>
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
          title={strings.continue}
          accessibilityLabel="LoginNextBtn"
          disabled={!next}
          loading={loading}
          onPress={() => signIn()}
        />
        <ShieldTitle title={strings.secured} />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
