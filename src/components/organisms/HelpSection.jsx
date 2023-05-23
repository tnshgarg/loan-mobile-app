import { useEffect, useState } from "react";
import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS, SIZES } from "../../constants/Theme";
import PrimaryButton from "../atoms/PrimaryButton";
import LogoHeaderBack from "../molecules/LogoHeaderBack";
import Badge from "../atoms/Badge";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HelpFooter from "../../assets/HelpFooter.svg";
import SvgContainer from "../atoms/SvgContainer";
import Tick from "../../assets/Tick.svg";
import CollapsibleItem from "../atoms/CollapsibleItem";
import VideoPlayer from "./VideoPlayer";

const HelpSection = ({ visible, setVisible, data }) => {
  const {
    heading,
    headingImage,
    title,
    subtitle,
    btnText,
    keyPoints,
    stepsTitle,
    stepsSubtitle,
    steps,
    questions,
    badgeTitle,
  } = data;

  return (
    <Modal animationType="slide" visible={visible}>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <LogoHeaderBack
          title={heading}
          containerStyle={{
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
          onLeftIconPress={() => setVisible(false)}
        />
        <ScrollView>
          <View style={styles.modalContainer}>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                marginBottom: 20,
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  height: 120,
                  width: 120,
                  marginRight: 15,
                }}
                resizeMode="contain"
                source={headingImage}
              />

              <View style={{ flexDirection: "column", flex: 1 }}>
                <Text style={{ ...FONTS.h2, color: COLORS.secondary }}>
                  {title}
                </Text>
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.secondary,
                    marginTop: 10,
                  }}
                >
                  {subtitle}
                </Text>
              </View>
            </View>

            {btnText && (
              <PrimaryButton
                title={btnText}
                onPress={() => {}}
                titleStyle={{ ...FONTS.h3 }}
              />
            )}

            {keyPoints && (
              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  flexDirection: "row",
                  marginTop: 20,
                  marginBottom: 10,
                }}
              >
                {keyPoints.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <SvgContainer height={20} width={20}>
                      <Tick />
                    </SvgContainer>
                    <Text
                      style={{
                        ...FONTS.body3,
                        color: COLORS.secondary,
                        textAlign: "center",
                        width: "80%",
                        alignSelf: "center",
                        marginTop: 10,
                      }}
                    >
                      {item.title}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            <VideoPlayer />

            {/* <Text
              style={{
                ...FONTS.body2,
                color: COLORS.secondary,
                marginTop: 15,
              }}
            >
              {stepsTitle}
            </Text>
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.secondary,
                marginBottom: 10,
              }}
            >
              {stepsSubtitle}
            </Text> */}

            {steps.map((item, index) => (
              <View
                key={index}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  flexDirection: "column",
                  marginVertical: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Badge
                    text={
                      badgeTitle
                        ? `${badgeTitle} ${index + 1}`
                        : `STEP ${index + 1}`
                    }
                  />
                  <Text
                    style={{
                      ...FONTS.body2,
                      color: COLORS.secondary,
                      marginLeft: 10,
                    }}
                  >
                    {item.title}
                  </Text>
                </View>
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.secondary,
                    marginVertical: 10,
                  }}
                >
                  {item.subtitle}
                </Text>
                {item.imageUri && (
                  <Image
                    source={item.imageUri}
                    style={{
                      height: 200,
                      width: "100%",
                    }}
                    resizeMode="cover"
                  />
                )}
              </View>
            ))}
            <Text
              style={{
                ...FONTS.h2,
                color: COLORS.secondary,
                marginVertical: 10,
              }}
            >
              Frequently Asked Questions
            </Text>
            {questions.map((item, index) => (
              <CollapsibleItem item={item} key={index} />
            ))}
          </View>
          <View
            style={{
              backgroundColor: COLORS.headerBg,
              width: "100%",
              padding: 20,
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Text style={{ ...FONTS.h3, color: COLORS.secondary }}>
              Still need help?
            </Text>
            <Text
              style={{ ...FONTS.body3, color: COLORS.secondary, marginTop: 10 }}
            >
              Have queries? please get in touch and we will be happy to help you
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
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
                  Need help?
                </Text>
                <Text style={{ ...FONTS.body4, color: "#00DB10" }}>
                  Contact Support
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                width: "100%",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                // backgroundColor: COLORS.secondary,
                marginTop: "-20%",
              }}
            >
              <SvgContainer width={250} height={150}>
                <HelpFooter />
              </SvgContainer>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = EStyleSheet.create({
  modalContainer: {
    backgroundColor: "$white",
    flex: 1,
    padding: "20rem",

    flexDirection: "column",
  },
  iconContainer: {
    padding: "15rem",
    borderRadius: SIZES.width * 0.2,
    backgroundColor: COLORS.warningBackground,
    //alignSelf: "center",
  },
  title: {
    ...FONTS.h3,
    color: COLORS.secondary,
    textAlign: "center",
    //width: "70%",
    marginTop: "20rem",
  },
  subtitle: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginBottom: "20rem",
    //textAlign: "center",
    //width: "70%",
  },
});

export default HelpSection;
