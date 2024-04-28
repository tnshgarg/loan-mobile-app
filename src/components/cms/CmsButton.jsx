import { Linking, Text, TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, FONTS, SIZES } from "../../constants/Theme";
import { navigationHelper } from "../../helpers/CmsNavigationHelper";
import Analytics, {
  InteractionTypes
} from "../../helpers/analytics/commonAnalytics";

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
  analytics,
}) => {
  console.log("CHILDREN: ", clickType);

  const onPress = () => {
    if (analytics) {
      Analytics.trackEvent({
        interaction: InteractionTypes.BUTTON_PRESS,
        flow: analytics.flow,
        screen: analytics.screen,
        action: analytics.action,
      });
    }
    if (clickType == "navigation") {
      navigationHelper(navigate || {});
    } else {
      Linking.openURL(url);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.button,
        {
          ...styling,
        },
        variant == "filled"
          ? {
              backgroundColor: loading
                ? COLORS.lightGray
                : buttonColor || COLORS.primary,
            }
          : {
              borderWidth: 2,
              borderColor: loading ? COLORS.gray : buttonColor || COLORS.white,
              backgroundColor: null,
            },
      ]}
      loadingIndicatorPosition="trailing"
      onPress={onPress}
    >
      {leftIcon ? (
        <MaterialCommunityIcons
          name={leftIcon}
          color={iconColor || COLORS.white}
          size={20}
          style={{ marginRight: 5 }}
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
