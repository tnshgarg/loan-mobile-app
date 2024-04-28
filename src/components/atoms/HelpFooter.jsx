import { Image, Text, TouchableOpacity, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS } from "../../constants/Theme";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HelpFooterImage from "../../assets/HelpFooter.png";
import { strings } from "../../helpers/Localization";
import whatsappLinking from "../../helpers/WhatsappLinking";

const HelpFooter = () => {
  return (
    <View style={styles.container}>
      <Text style={{ ...FONTS.h3, color: COLORS.secondary }}>
        {strings.stillNeedHelp}
      </Text>
      <Text style={{ ...FONTS.body3, color: COLORS.secondary, marginTop: 10 }}>
        {strings.getInTouch}
      </Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => whatsappLinking()}
        style={{
          backgroundColor: COLORS.white,
          borderRadius: 50,
          padding: 10,
          paddingHorizontal: 15,
          marginTop: 15,
          elevation: 2,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20%",
          zIndex: 99,
        }}
      >
        <View
          style={{
            padding: 5,
            backgroundColor: "#00DB10",
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialCommunityIcons
            name="whatsapp"
            size={36}
            color={COLORS.white}
          />
        </View>

        <View style={{ flexDirection: "column", paddingLeft: 10 }}>
          <Text style={{ ...FONTS.body5, color: COLORS.gray }}>
            {strings.needHelp}
          </Text>
          <Text style={{ ...FONTS.body4, color: "#00DB10" }}>
            {strings.contactSupport}
          </Text>
        </View>
      </TouchableOpacity>
      <Image
        source={HelpFooterImage}
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
        }}
      />
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    backgroundColor: COLORS.headerBg,
    width: "100%",
    padding: 20,
    flexDirection: "column",
    alignItems: "flex-start",
  },
});

export default HelpFooter;
