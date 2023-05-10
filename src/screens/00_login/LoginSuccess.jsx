import {
  View,
  Text,
  SafeAreaView,
  Alert,
  BackHandler,
  Linking,
} from "react-native";
import { onboardingStyles, styles } from "../../styles";
import LogoHeader from "../../components/atoms/LogoHeader";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS, FONTS, SIZES } from "../../constants/Theme";
import Analytics from "appcenter-analytics";
import { requestUserPermission } from "../../services/notifications/notificationService";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import Welcome from "../../assets/Welcome.svg";
import Info from "../../assets/Info.svg";
import Help from "../../assets/Help.svg";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import SvgContainer from "../../components/atoms/SvgContainer";
import LinearGradient from "react-native-linear-gradient";
import HelpHeader from "../../components/atoms/HelpHeader";

const LoginSuccess = () => {
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(addCurrentScreen("LoginSuccess"));
  }, []);

  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to Logout?", [
      { text: "No", onPress: () => null, style: "cancel" },
      { text: "Yes", onPress: () => navigation.navigate("Login") },
    ]);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const profileComplete = useSelector((state) => state.profile.profileComplete);
  const aadhaarVerifyStatus = useSelector(
    (state) => state.aadhaar.verifyStatus
  );
  const panVerifyStatus = useSelector((state) => state.pan.verifyStatus);
  const bankVerifyStatus = useSelector((state) => state.bank.verifyStatus);

  const handleConditionalNav = () => {
    if (!profileComplete) {
      navigation.navigate("AccountStack", {
        screen: "Profile",
      });
    } else if (aadhaarVerifyStatus != "SUCCESS") {
      navigation.navigate("AccountStack", {
        screen: "KYC",
        params: {
          screen: "AADHAAR",
        },
      });
    } else if (panVerifyStatus != "SUCCESS") {
      navigation.navigate("AccountStack", {
        screen: "KYC",
        params: {
          screen: "PAN",
        },
      });
    } else if (bankVerifyStatus != "SUCCESS") {
      navigation.navigate("AccountStack", {
        screen: "KYC",
        params: {
          screen: "BANK",
        },
      });
    }
  };

  return (
    <SafeAreaView accessibilityLabel="WelcomePage" style={styles.safeContainer}>
      <View style={[styles.container, { backgroundColor: "#223240" }]}>
        <HelpHeader />
        <Text style={[styles.headline, { ...FONTS.h1, color: COLORS.white }]}>
          Congratulations on {"\n"}joining Unipe!
        </Text>
        <Text
          style={[
            styles.subHeadline,
            {
              color: COLORS.white,
              ...FONTS.body3,
              width: "100%",
            },
          ]}
        >
          Your employer,{" "}
          <Text
            style={{
              ...FONTS.h3,
              color: "#D9F68A",
            }}
          >
            XXXXXXX
          </Text>
          , has initiated your onboarding process.
        </Text>
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <SvgContainer width={SIZES.width * 0.9} height={SIZES.width}>
            <Welcome />
          </SvgContainer>
        </View>

        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[
            // "rgba(70, 167, 170,0.34)",
            "rgba(110, 220, 133,0.34)",
            "rgba(237, 251, 139,0.34)",
          ]}
          style={onboardingStyles.alertBox}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[
              "rgba(70, 167, 170,0.3)",
              "rgba(110, 220, 133,0.2)",
              "rgba(237, 251, 139,0.1)",
            ]}
            style={{
              padding: 10,
              backgroundColor: COLORS.gray,
              borderRadius: 50,
            }}
          >
            <SvgContainer width={20} height={20}>
              <Info />
            </SvgContainer>
          </LinearGradient>

          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.white,
              flex: 1,
              paddingLeft: 10,
            }}
          >
            As per RBI guidelines, you have to complete e-KYC to get Advance
            Salary
          </Text>
        </LinearGradient>

        <PrimaryButton
          title="Start KYC"
          accessibilityLabel="WelcomeBtn"
          onPress={() => {
            requestUserPermission();
            Analytics.trackEvent("WelcomePage", {
              unipeEmployeeId: unipeEmployeeId,
            });
            handleConditionalNav();
          }}
        />
        <PrimaryButton
          title="I will do it later"
          containerStyle={{
            backgroundColor: null,
            borderWidth: 1.5,
            borderColor: COLORS.white,
          }}
          titleStyle={{ color: COLORS.white }}
          onPress={() => {
            navigation.navigate("HomeStack");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default LoginSuccess;
