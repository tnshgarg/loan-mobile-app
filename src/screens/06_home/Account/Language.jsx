import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import LogoHeaderBack from "../../../components/molecules/LogoHeaderBack";
import { COLORS, FONTS } from "../../../constants/Theme";
import { styles } from "../../../styles";

const Language = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.safeContainer}>
      <LogoHeaderBack
        title="App Language"
        onLeftIconPress={() => {
          navigation.goBack();
        }}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          width: "100%",
          padding: "6%",
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 0.75,
          borderColor: COLORS.lightGray,
        }}
      >
        <Image
          source={{
            uri: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/LanguageSelection/en.png",
          }}
          style={{ height: 40, width: 40 }}
        />
        <View style={{ flex: 1, paddingLeft: 15 }}>
          <Text style={{ ...FONTS.body3, color: COLORS.black }}>English</Text>
        </View>
        <MaterialCommunityIcons
          name="radiobox-marked"
          color={COLORS.primary}
          size={28}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          width: "100%",
          padding: "6%",
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 0.75,
          borderColor: COLORS.lightGray,
        }}
      >
        <Image
          source={{
            uri: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/LanguageSelection/hi.png",
          }}
          style={{ height: 40, width: 40 }}
        />
        <View style={{ flex: 1, paddingLeft: 15 }}>
          <Text style={{ ...FONTS.body3, color: COLORS.black }}>Hindi</Text>
        </View>
        <MaterialCommunityIcons
          name="radiobox-blank"
          color={COLORS.primary}
          size={28}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Language;
