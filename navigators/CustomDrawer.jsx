import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";

import { Image, Linking, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { COLORS, FONTS } from "../constants/Theme";
import { Ionicons, Octicons } from "react-native-vector-icons";
import Logout from "../components/molecules/Logout";
import SVGImg from "../assets/UnipeLogo.svg";
import TermsAndPrivacyModal from "../components/molecules/TermsAndPrivacyModal";
import termsOfUse from "../templates/docs/TermsOfUse";
import privacyPolicy from "../templates/docs/PrivacyPolicy";
import { useState } from "react";

export default CustomDrawer = (props) => {
  const [isPrivacyModalVisible, setIsPrivacyModalVisible] = useState(false);
  const [isTermsOfUseModalVisible, setIsTermsOfUseModalVisible] =
    useState(false);

  const image = useSelector((state) => state.aadhaar.data.photo_base64);
  const name = useSelector(
    (state) => state.aadhaar.data?.name || state.pan.data?.name || "User"
  );

  return (
    <>
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={{ backgroundColor: COLORS.primary }}
        >
          <View style={{ padding: 20 }}>
            <Image
              source={{
                uri: `data:image/jpeg;base64,${image}`,
                cache: "only-if-cached",
              }}
              style={{
                width: 80,
                height: 80,
                resizeMode: "contain",
                borderRadius: 50,
              }}
            />
            <Text
              style={{
                color: COLORS.white,
                paddingTop: 10,
                ...FONTS.h3,
              }}
            >
              {name ? name : "User"}
            </Text>
          </View>
          <View
            style={{ flex: 1, backgroundColor: COLORS.white, paddingTop: 10 }}
          >
            <DrawerItemList {...props} />
            <DrawerItem
              labelStyle={{ ...FONTS.body4 }}
              icon={({ color, size }) => (
                <Ionicons name="logo-whatsapp" color={color} size={20} />
              )}
              label="Customer Support"
              onPress={() => {
                Linking.openURL(`whatsapp://send?text=&phone=7483447528`);
              }}
            />
            <DrawerItem
              labelStyle={{ ...FONTS.body4 }}
              icon={({ color, size }) => (
                <View accessibilityLabel="PrivacyIcon">
                  <Ionicons
                    name="lock-closed-outline"
                    color={color}
                    size={20}
                  />
                </View>
              )}
              label="Privacy Policy"
              onPress={() => {
                setIsPrivacyModalVisible(true);
              }}
            />
            <DrawerItem
              labelStyle={{ ...FONTS.body4 }}
              icon={({ color, size }) => (
                <View accessibilityLabel="TermsIcon">
                  <Ionicons
                    name="ios-shield-checkmark-outline"
                    color={color}
                    size={20}
                  />
                </View>
              )}
              label="Terms & Conditions"
              onPress={() => {
                setIsTermsOfUseModalVisible(true);
              }}
            />
          </View>
        </DrawerContentScrollView>
        <Logout />
      </View>
      {isTermsOfUseModalVisible && (
        <TermsAndPrivacyModal
          accessibilityLabel="TermsViewModal"
          isVisible={isTermsOfUseModalVisible}
          setIsVisible={setIsTermsOfUseModalVisible}
          data={termsOfUse}
        />
      )}
      {isPrivacyModalVisible && (
        <TermsAndPrivacyModal
          accessibilityLabel="PrivacyViewModal"
          isVisible={isPrivacyModalVisible}
          setIsVisible={setIsPrivacyModalVisible}
          data={privacyPolicy}
        />
      )}
    </>
  );
};
