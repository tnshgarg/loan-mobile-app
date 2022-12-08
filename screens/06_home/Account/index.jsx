import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import React, { useState } from "react";
import { styles } from "../../../styles";
import LogoHeader from "../../../components/atoms/LogoHeader";
import { MaterialCommunityIcons, Ionicons } from "react-native-vector-icons";
import { COLORS, FONTS } from "../../../constants/Theme";
import { useDispatch, useSelector } from "react-redux";
import termsOfUse from "../../../templates/docs/TermsOfUse";
import privacyPolicy from "../../../templates/docs/PrivacyPolicy";
import TermsAndPrivacyModal from "../../../components/molecules/TermsAndPrivacyModal";
import { showToast } from "../../../components/atoms/Toast";

const Account = (props) => {
  const dispatch = useDispatch();
  const [isPrivacyModalVisible, setIsPrivacyModalVisible] = useState(false);
  const [isTermsOfUseModalVisible, setIsTermsOfUseModalVisible] =
    useState(false);
  const image = useSelector((state) => state.aadhaar.data.photo_base64);
  const name = useSelector(
    (state) => state.aadhaar.data?.name || state.pan.data?.name || "User"
  );

  const onLogout = () => {
    showToast("Logging out");
    dispatch({ type: "LOGOUT" });
    //setModalVisible(true);
    setTimeout(() => {
      // setModalVisible(false);
      props.navigation.navigate("OnboardingStack", { screen: "Login" });
    }, 5000);
  };
  const options = [
    {
      title: "Profile",
      subtitle: "See & edit your profile details",
      iconName: "account-circle-outline",
      route: { stack: "AccountStack", screen: "Profile" },
    },
    {
      title: "KYC",
      subtitle: "All your KYC details in one place",
      iconName: "order-bool-ascending-variant",
      route: { stack: "AccountStack", screen: "KYC" },
    },
    {
      title: "Customer Support",
      subtitle: "Talk to out support team",
      iconName: "whatsapp",
      action: () => {
        Linking.openURL(`whatsapp://send?text=&phone=7483447528`);
      },
    },
    {
      title: "Terms & Conditions",
      subtitle: "Read our terms of use",
      iconName: "file-document-outline",
      action: () => setIsTermsOfUseModalVisible(true),
    },
    {
      title: "Privacy Policy",
      subtitle: "Read our privacy policy",
      iconName: "shield-outline",
      action: () => setIsPrivacyModalVisible(true),
    },
    {
      title: "Logout",
      subtitle: "Logout from Unipe App",
      iconName: "exit-to-app",
      action: () => {},
    },
  ];

  const onPressCard = ({ route, action }) => {
    console.log({ route });
    if (route) props.navigation.navigate(route.stack, { screen: route.screen });
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 15,
          borderTopWidth: 0.8,
          borderColor: COLORS.lightGray,
        }}
      >
        {!image ? (
          <MaterialCommunityIcons
            name={"account-box"}
            size={80}
            color={COLORS.primary}
          />
        ) : (
          <Image
            source={{
              uri: `data:image/jpeg;base64,${image}`,
              cache: "only-if-cached",
            }}
            style={{
              width: 60,
              height: 60,
              resizeMode: "contain",
              borderRadius: 5,
              borderWidth: 1,
              borderColor: COLORS.lightGray,
            }}
          />
        )}

        <Text style={{ ...FONTS.h4, color: COLORS.black, marginLeft: 15 }}>
          {name ? name : "Guest User"}
        </Text>
      </View>
      {options.map((item, index) => (
        <TouchableOpacity
          key={item.title}
          activeOpacity={0.7}
          onPress={() => onPressCard(item)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 15,
            borderTopWidth: 0.8,

            borderColor: COLORS.lightGray,
          }}
        >
          <MaterialCommunityIcons
            name={item.iconName}
            size={24}
            color={COLORS.gray}
          />
          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              flex: 1,
              paddingLeft: 15,
            }}
          >
            <Text style={{ ...FONTS.h4, color: COLORS.black }}>
              {item.title}
            </Text>
            <Text style={{ ...FONTS.body5, color: COLORS.gray }}>
              {item.subtitle}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
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
    </SafeAreaView>
  );
};

export default Account;
