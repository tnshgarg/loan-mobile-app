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

import SvgContainer from "../atoms/SvgContainer";
import Tick from "../../assets/Tick.svg";
import CollapsibleItem from "../atoms/CollapsibleItem";
import VideoPlayer from "./VideoPlayer";
import HelpFooter from "../atoms/HelpFooter";
import LinearGradient from "react-native-linear-gradient";

const BannerFaqSection = ({ visible, setVisible, data }) => {
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
          headline={"What are the benefits of completing KYC?"}
          // subHeadline={
          //   "भारतीय रिजर्व बैंक के मानदंडों के अनुसार, आपको अपना आधार वेरीफाई करना अनिवार्य है।"
          // }
          onLeftIconPress={() => setVisible(false)}
          // onRightIconPress={() => setVisible(true)}
        />
        <ScrollView>
          <View style={styles.modalContainer}>
            {steps?.map((item, index) => (
              <View
                style={[
                  styles.row,
                  { flexDirection: index % 2 == 1 ? "row-reverse" : "row" },
                ]}
              >
                {headingImage && (
                  <Image style={styles.headingImage} source={headingImage} />
                )}

                <View style={styles.col}>
                  <Text style={styles.title}>What is KYC?</Text>
                  <Text style={styles.subtitle}>
                    KYC (Know Your Customer) is a mandatory process of
                    identifying and verifying the employee’s identity while
                    offering features like advance salrary.
                  </Text>
                </View>
              </View>
            ))}
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={[COLORS.lightGreen, COLORS.lightYellow]}
              style={{
                padding: 15,
                width: "120%",
              }}
            >
              <Text
                style={[
                  styles.title,
                  { ...FONTS.body4, color: COLORS.gray, marginBottom: 0 },
                ]}
              >
                FAQs
              </Text>
            </LinearGradient>

            {questions.map((item, index) => (
              <CollapsibleItem
                item={item}
                key={index}
                titleStyle={{ ...FONTS.body3 }}
              />
            ))}
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

    flexDirection: "column",
  },
  headingImage: {
    height: "120rem",
    width: "120rem",
    marginRight: "15rem",
    resizeMode: "contain",
  },
  title: {
    ...FONTS.body3,
    color: COLORS.secondary,
    marginBottom: 5,
  },
  subtitle: {
    ...FONTS.body4,
    color: COLORS.secondary,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    padding: "20rem",
  },
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
  stepImage: { height: "180rem", width: "100%", marginVertical: "10rem" },
});

export default BannerFaqSection;
