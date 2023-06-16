import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  BackHandler,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import ListItem from "../../../components/atoms/ListItem";
import LogoHeader from "../../../components/atoms/LogoHeader";
import TermsAndPrivacyModal from "../../../components/molecules/TermsAndPrivacyModal";
import LogoutModal from "../../../components/organisms/LogoutModal";
import { COLORS } from "../../../constants/Theme";
import { strings } from "../../../helpers/Localization";
import whatsappLinking from "../../../helpers/WhatsappLinking";
import { accountStyles, styles } from "../../../styles";
import privacyPolicy from "../../../templates/docs/PrivacyPolicy";
import termsOfUse from "../../../templates/docs/TermsOfUse";

const AccountMenu = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [isPrivacyModalVisible, setIsPrivacyModalVisible] = useState(false);
  const [isTermsOfUseModalVisible, setIsTermsOfUseModalVisible] =
    useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const image = useSelector((state) => state.aadhaar?.data?.photo_base64);
  const name = useSelector(
    (state) =>
      state.aadhaar.data?.name ||
      state.pan.data?.name ||
      state.auth.employeeName
  );

  const backAction = () => {
    navigation.navigate("HomeStack", {
      screen: "Money",
    });
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const onLogout = () => {
    dispatch({ type: "LOGOUT" });
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
      // navigation.replace("OnboardingStack", { screen: "Login" });
    }, 5000);
  };

  const options = [
    {
      title: "Profile",
      subtitle: strings.editProfileDetails,
      iconName: "account-circle-outline",
      route: { stack: "AccountStack", screen: "Profile" },
    },
    {
      title: "KYC",
      subtitle: strings.kycDetailsInOnePlace,
      iconName: "order-bool-ascending-variant",
      route: { stack: "AccountStack", screen: "KYC" },
    },
    // {
    //   title: "Mandate",
    //   subtitle: "Mandate is required for availing advance salary",
    //   iconName: "order-bool-ascending-variant",
    //   route: { stack: "AccountStack", screen: "Mandate" },
    // },
    // {
    //   title: "Documents",
    //   subtitle: "All your documents at one place",
    //   iconName: "file-document-outline",
    //   route: { stack: "AccountStack", screen: "Documents" },
    // },
    {
      title: strings.customerSupport,
      subtitle: strings.talkToSupportTeam,
      iconName: "whatsapp",
      action: () => {
        whatsappLinking();
      },
    },
    {
      title: strings.termsAndConditions,
      subtitle: strings.readTermsOfUse,
      iconName: "file-document-outline",
      action: () => setIsTermsOfUseModalVisible(true),
    },
    {
      title: strings.privacyPolicy,
      subtitle: strings.readPrivacyPolicy,
      iconName: "shield-outline",
      action: () => setIsPrivacyModalVisible(true),
    },
    {
      title: strings.logout,
      subtitle: strings.logoutFromUnipe,
      iconName: "exit-to-app",
      action: () => onLogout(),
    },
  ];

  const onPressCard = ({ route, action }) => {
    console.log({ route });
    if (route) props.navigation.replace(route.stack, { screen: route.screen });
    else action();
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LogoHeader
        title={"Account"}
        rightIcon={
          <Ionicons
            name="help-circle-outline"
            size={28}
            color={COLORS.primary}
          />
        }
      />
      <ScrollView>
        <View style={accountStyles.imageContainer}>
          {!image ? (
            <View style={accountStyles.guestIcon}>
              <MaterialCommunityIcons
                name={"account"}
                size={48}
                color={COLORS.white}
              />
            </View>
          ) : (
            <Image
              source={{
                uri: `data:image/jpeg;base64,${image}`,
                cache: "only-if-cached",
              }}
              style={accountStyles.userImage}
            />
          )}

          <Text style={accountStyles.userTitle}>{name}</Text>
        </View>
        {options.map((item, index) => (
          <ListItem
            key={index}
            item={{ ...item, onPress: () => onPressCard(item) }}
            showIcon={false}
          />
        ))}
      </ScrollView>
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
      {modalVisible && <LogoutModal modalVisible={modalVisible} />}
    </SafeAreaView>
  );
};

export default AccountMenu;
