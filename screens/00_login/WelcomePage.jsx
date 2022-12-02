import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { useEffect } from "react";
import { Alert, BackHandler, SafeAreaView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Analytics from "appcenter-analytics";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import { COLORS, FONTS } from "../../constants/Theme";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { styles } from "../../styles";
import { requestUserPermission } from "../../services/notifications/notificationService";
import LogoHeader from "../../components/atoms/LogoHeader";
import ShieldTitle from "../../components/atoms/ShieldTitle";
import OnDemand from "../../assets/OnDemand.svg";
import Clock from "../../assets/Clock.svg";
import InterestFree from "../../assets/InterestFree.svg";

const WelcomePage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);

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

  const data = [
    {
      title: "On-demand Salary\n(पाएँ वेतन अपने मनचाहे समय पर)",
      imageUri: <OnDemand />,
    },
    {
      title: "Interest Free\nशून्य ब्याज दर",
      imageUri: <Clock />,
    },
    {
      title:
        "Money in your bank in 5 mins\nसिर्फ़ पाँच मिनट में पैसा आपके बैंक अकाउंट में",
      imageUri: <InterestFree />,
    },
  ];

  return (
    <SafeAreaView style={[styles.safeContainer]}>
      <LogoHeader />
      <View style={styles.container}>
        <Text
          style={{
            ...FONTS.title,
            color: COLORS.primary,
          }}
        >
          नमस्ते
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            marginVertical: 20,
          }}
        >
          <View
            style={{
              height: 28,
              width: 28,
              backgroundColor: COLORS.primary,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              marginRight: 10,
              marginLeft: -20,
            }}
          />
          <Text style={{ ...FONTS.h2, color: COLORS.secondary }}>
            Unipe के साथ पाएँ
          </Text>
        </View>
        {data.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              marginVertical: 15,
            }}
          >
            {item.imageUri}
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.secondary,
                marginLeft: 30,
              }}
            >
              {item.title}
            </Text>
          </View>
        ))}

        <View style={{ flex: 1 }} />
        <ShieldTitle title="100% Secure" />
        <PrimaryButton
          title="Get Started Now"
          onPress={() => {
            requestUserPermission();
            Analytics.trackEvent("WelcomePage", {
              unipeEmployeeId: unipeEmployeeId,
            });
            navigation.navigate("Login");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default WelcomePage;
