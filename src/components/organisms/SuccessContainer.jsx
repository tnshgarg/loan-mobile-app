import { Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Info from "../../assets/Info.svg";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import SvgContainer from "../../components/atoms/SvgContainer";
import { COLORS, FONTS, SIZES } from "../../constants/Theme";
import { strings } from "../../helpers/Localization";
import { onboardingStyles, styles } from "../../styles";
import VideoPlayer from "./VideoPlayer";

const SuccessContainer = ({ data }) => {
  const {
    title,
    subtitle,
    renderSubtitle,
    imageUri,
    primaryBtnText,
    onPressPrimaryBtn,
    secondaryBtnText,
    onPressSecondaryBtn,
    infoText,
    contentContainerStyle,
    primaryBtnIcon,
    primaryBtnLabel,
    videoThumbnail,
  } = data;
  return (
    <View style={[styles.container, { backgroundColor: "#223240" }]}>
      <View style={{ ...contentContainerStyle, flex: 1 }}>
        <View style={{ flex: 0.5 }}>
          <Text style={[styles.headline, { ...FONTS.h1, color: COLORS.white }]}>
            {title}
          </Text>
          {subtitle ? (
            <Text
              style={[
                styles.subHeadline,
                {
                  color: COLORS.white,
                  ...FONTS.body3,
                  width: "100%",
                },
              ]}
            >
              {subtitle}
            </Text>
          ) : (
            renderSubtitle()
          )}
        </View>

        {videoThumbnail ? (
          <VideoPlayer thumbnail={{ uri: videoThumbnail }} />
        ) : (
          <View
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          >
            <SvgContainer width={SIZES.width * 0.85} height={SIZES.width}>
              {imageUri}
            </SvgContainer>
          </View>
        )}
      </View>

      {infoText ? (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[COLORS.lightGreen, COLORS.lightYellow]}
          style={onboardingStyles.alertBox}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["rgba(110, 220, 133,0.1)", "rgba(237, 251, 139,0.1)"]}
            style={{
              padding: 10,
              borderRadius: 50,
            }}
          >
            <SvgContainer width={20} height={20}>
              <Info />
            </SvgContainer>
          </LinearGradient>

          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.white,
              flex: 1,
              paddingLeft: 10,
            }}
          >
            {strings.rbiGuidelines}
          </Text>
        </LinearGradient>
      ) : (
        <></>
      )}

      <PrimaryButton
        title={primaryBtnText}
        accessibilityLabel={primaryBtnLabel}
        iconName={primaryBtnIcon}
        onPress={() => {
          onPressPrimaryBtn();
        }}
      />
      <PrimaryButton
        title={secondaryBtnText}
        containerStyle={{
          backgroundColor: null,
          borderWidth: 1.5,
          borderColor: COLORS.white,
        }}
        titleStyle={{ color: COLORS.white }}
        onPress={() => {
          onPressSecondaryBtn();
        }}
      />
    </View>
  );
};

export default SuccessContainer;
