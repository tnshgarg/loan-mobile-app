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
import SvgContainer from "../atoms/SvgContainer";
import Tick from "../../assets/Tick.svg";
import CollapsibleItem from "../atoms/CollapsibleItem";
import VideoPlayer from "./VideoPlayer";
import HelpFooter from "../atoms/HelpFooter";

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

  console.log({ btnText });

  return (
    <Modal animationType="slide" visible={visible}>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <LogoHeaderBack
          title={heading}
          titleStyle={{ ...FONTS.body3 }}
          containerStyle={{
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
          onLeftIconPress={() => setVisible(false)}
        />
        <ScrollView>
          <View style={styles.modalContainer}>
            <View style={styles.row}>
              {headingImage && (
                <Image style={styles.headingImage} source={headingImage} />
              )}

              <View style={styles.col}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
              </View>
            </View>

            {keyPoints && (
              <View style={styles.pointsContainer}>
                {keyPoints.map((item, index) => (
                  <View key={index} style={styles.flexCenter}>
                    <SvgContainer height={20} width={20}>
                      <Tick />
                    </SvgContainer>
                    <Text style={styles.pointsTitle}>{item.title}</Text>
                  </View>
                ))}
              </View>
            )}

            <VideoPlayer
              thumbnail={{
                uri: "https://static-cse.canva.com/blob/1068019/1600w-wlXEWqHuexQ.jpg",
              }}
            />

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

            {steps?.map((item, index) => (
              <View key={index} style={[styles.col, { marginVertical: 20 }]}>
                <View style={styles.row}>
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
                <Text style={[styles.subtitle, { marginTop: 10 }]}>
                  {item.subtitle}
                </Text>
                {item.imageUri && (
                  <Image
                    source={item.imageUri}
                    style={styles.stepImage}
                    resizeMode="cover"
                  />
                )}
              </View>
            ))}
            <Text style={[styles.title, { marginVertical: 10 }]}>
              Frequently Asked Questions
            </Text>
            {questions.map((item, index) => (
              <CollapsibleItem item={item} key={index} />
            ))}
          </View>
          <HelpFooter />
        </ScrollView>
        {btnText && (
          <View style={styles.btnContainer}>
            <PrimaryButton
              title={btnText}
              onPress={() => {
                setVisible(false);
              }}
              titleStyle={{ ...FONTS.h3 }}
              containerStyle={{ marginTop: 0 }}
            />
          </View>
        )}
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
  headingImage: {
    height: "100rem",
    width: "100rem",
    marginRight: "15rem",
    resizeMode: "contain",
  },
  title: {
    ...FONTS.h2,
    color: COLORS.secondary,
  },
  subtitle: {
    ...FONTS.body3,
    color: COLORS.secondary,
  },
  row: { flexDirection: "row", width: "100%", alignItems: "center" },
  col: { flexDirection: "column", flex: 1 },
  pointsContainer: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: "20rem",
    marginBottom: "10rem",
  },
  pointsTitle: {
    ...FONTS.body3,
    color: COLORS.secondary,
    textAlign: "center",
    width: "80%",
    alignSelf: "center",
    marginTop: "10rem",
  },
  flexCenter: { flex: 1, alignItems: "center", justifyContent: "flex-start" },
  btnContainer: {
    paddingHorizontal: "15rem",
    paddingVertical: "10rem",
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderColor: COLORS.lightGray,
  },
  stepImage: {
    // marginVertical: "10rem",
    resizeMode: "contain",
    flex: 1,
    aspectRatio: 1,
  },
});

export default HelpSection;
