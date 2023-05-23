import { View, Text, SafeAreaView, Alert, BackHandler, Linking} from "react-native";
import { styles } from "../../styles";
import LogoHeader from "../../components/atoms/LogoHeader";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS, FONTS } from "../../constants/Theme";
import Analytics from "../../helpers/analytics/commonAnalytics";
import { requestUserPermission } from "../../services/notifications/notificationService";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import Success from "../../assets/congratulations.svg";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { addCurrentScreen } from "../../store/slices/navigationSlice";

const WelcomePage = () => {
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    dispatch(addCurrentScreen("Welcome"));
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

  return (
    <SafeAreaView accessibilityLabel="WelcomePage" style={styles.safeContainer}>
      <LogoHeader
        rightIcon={
          <Icon name="logo-whatsapp" size={28} color={COLORS.primary} />
        }
        rightOnPress={() => {
          Linking.openURL(`whatsapp://send?text=&phone=7483447528`);
        }}
      />

      <View style={styles.container}>
        <Success style={{ alignSelf: "center", width: "70%" }} />
        <View style={{ flex: 1 }} />

        <Text
          style={[styles.subHeadline, { width: "90%", alignSelf: "center" }]}
        >
          <Text style={{ color: COLORS.warning }}>Congratulations!</Text> {"\n"}
          Your phone number verified successfully.
        </Text>
        <Text
          style={[
            styles.headline,
            {
              ...FONTS.h3,
              width: "90%",
              alignSelf: "center",
              marginBottom: 20,
            },
          ]}
        >
          As a next step please complete your eKYC to get money in your bank
          account
        </Text>
        <PrimaryButton
          title="Start eKYC"
          accessibilityLabel="WelcomeBtn"
          onPress={() => {
            requestUserPermission();
            Analytics.trackEvent({
            interaction: InteractionTypes.BUTTON_PRESS,
            component: "WelcomePage",
            action: "",
            status: ""
            });
            navigation.navigate("ProfileForm");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default WelcomePage;
