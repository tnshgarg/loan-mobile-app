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
  styling,
  titleStyle,
  iconColor,
}) => {
  console.log("CHILDREN: ", clickType);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.button,
        {
          ...styling,
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
  );
};

const styles = EStyleSheet.create({
  button: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: SIZES.btnHeight,
    borderRadius: "50rem",
    flexDirection: "row",
    marginVertical: "10rem",
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
