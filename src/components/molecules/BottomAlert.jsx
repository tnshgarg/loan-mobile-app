import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS } from "../../constants/Theme";
import BottomSheetWrapper from "../atoms/BottomSheetWrapper";
import { useState } from "react";
import PrimaryButton from "../atoms/PrimaryButton";
import LinearGradient from "react-native-linear-gradient";

const BottomAlert = ({ visible, setVisible, data }) => {
  const {
    title,
    subtitle,
    imageUri,
    primaryBtnText,
    onPressPrimaryBtn,
    secondaryBtnText,
    onPressSecondaryBtn,
    primaryBtnIcon,
  } = data;
  return (
    <BottomSheetWrapper open={visible} setOpen={setVisible}>
      <LinearGradient
        style={styles.svgBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[COLORS.lightGreen, COLORS.lightYellow]}
      >
        <Image source={{ uri: imageUri }} style={styles.imageView} />
      </LinearGradient>

      <Text
        style={{
          ...FONTS.h2,
          color: COLORS.black,
          alignSelf: "center",
          marginVertical: 10,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          ...FONTS.body3,
          color: COLORS.gray,
          alignSelf: "center",
          textAlign: "center",
          marginBottom: 5,
        }}
      >
        {subtitle}
      </Text>
      <PrimaryButton
        title={primaryBtnText}
        iconName={primaryBtnIcon}
        onPress={() => {
          onPressPrimaryBtn();
        }}
      />

      <PrimaryButton
        title={secondaryBtnText}
        containerStyle={{
          borderWidth: 1.5,
          borderColor: COLORS.black,
          backgroundColor: COLORS.white,
        }}
        titleStyle={{ color: COLORS.black }}
        onPress={() => {
          onPressSecondaryBtn();
        }}
      />
    </BottomSheetWrapper>
  );
};

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
  },
  imageView: {
    width: "60%",
    // height: "250rem",
    resizeMode: "cover",
    alignSelf: "center",
    aspectRatio: 0.85,
    // borderTopLeftRadius: 50,
    // borderTopRightRadius: 50,
    //backgroundColor: COLORS.black,
  },
  svgBackground: {
    backgroundColor: COLORS.lightgray_01,
    margin: "-25rem",
    borderTopLeftRadius: "20rem",
    borderTopRightRadius: "20rem",
    marginBottom: "10rem",
    paddingTop: "15rem",
    alignItems: "center",
  },
});

export default BottomAlert;
