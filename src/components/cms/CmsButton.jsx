import { Linking, Text, TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, FONTS, SIZES } from "../../constants/Theme";
import { navigationHelper } from "../../helpers/CmsNavigationHelper";
import { View } from "react-native";

const CmsButton = ({
  children,
  clickType,
  navigate,
  url,
  title,
  variant,
  buttonColor,
  leftIcon,
  rightIcon,
  loading,
  containerStyle,
  titleStyle,
  iconColor,
}) => {
  console.log("CHILDREN: ", clickType);

  return (
    <View style={{ width: "100%", ...styles.container }}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.button,
          {
            ...containerStyle,
          },
          variant == "filled"
            ? { backgroundColor: loading ? COLORS.lightGray : COLORS.primary }
            : {
                borderWidth: 2,
                borderColor: loading ? COLORS.lightGray : COLORS.primary,
                backgroundColor: COLORS.white,
                color: COLORS.primary,
              },
        ]}
        loadingIndicatorPosition="trailing"
        onPress={() =>
          clickType == "navigation"
            ? navigationHelper({
                type: navigate.type,
                stack: navigate.stack,
                screen: navigate.screen,
              })
            : Linking.openURL(url)
        }
      >
        {leftIcon ? (
          <MaterialCommunityIcons
            name={leftIcon}
            color={iconColor || COLORS.white}
            size={20}
            style={{ marginLeft: 5 }}
          />
        ) : null}
        <Text style={[styles.btnText, { ...titleStyle }]}>{title}</Text>
        {rightIcon ? (
          <MaterialCommunityIcons
            name={rightIcon}
            color={iconColor || COLORS.white}
            size={20}
            style={{ marginLeft: 5 }}
          />
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    padding: "15rem",
  },
  button: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: SIZES.btnHeight,
    borderRadius: "50rem",
    flexDirection: "row",
  },
  loadingButton: {
    backgroundColor: COLORS.primary,
    padding: "10rem",
    borderRadius: "5rem",
  },
  btnText: {
    color: COLORS.white,
    ...FONTS.h3,
  },
});

export default CmsButton;
