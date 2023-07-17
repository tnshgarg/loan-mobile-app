import React, { useEffect } from "react";
import { View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import LinearGradient from "react-native-linear-gradient";
import { useSelector } from "react-redux";
import { COLORS, FONTS } from "../../constants/Theme";

const CmsSurvey = ({ children, styling, gradientColors, survey_id }) => {
  const safeChildren = children || [];

  // const x = useSelector((state) => state?.[survey_id]?.[question_id]);
  const currentStep = useSelector(
    (state) => state?.cmsForms?.[survey_id]?.["form_progress"] ?? 0
  );

  console.log({ currentStep });

  useEffect(() => {}, []);

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={gradientColors ?? ["#b4ecc1", "#f5fcc4"]}
      style={[styles.container, { ...styling }]}
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "5%",
        }}
      >
        {safeChildren?.map((child, index) => (
          <View
            key={index}
            style={{
              flex: 1,
              borderTopWidth: 5,
              borderColor: currentStep >= index ? COLORS.primary : COLORS.white,
              marginHorizontal: 5,
              borderRadius: 10,
            }}
          ></View>
        ))}
      </View>
      <View style={styles.innerContainer}>
        <View>
          {safeChildren[currentStep].element({
            ...safeChildren[currentStep],
            stepNo: currentStep,
            survey_id: survey_id,
            totalQues: safeChildren?.length,
          })}
        </View>
      </View>
    </LinearGradient>
  );
};

export default CmsSurvey;

const styles = EStyleSheet.create({
  container: {
    padding: "5%",
    width: "100%",
    height: "100%",
    // backgroundColor: "#fff",
  },
  innerContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    padding: "6%",
    borderRadius: "10rem",
  },

  childContainer: {
    paddingLeft: "15rem",
  },
  title: {
    color: "white",
    ...FONTS.h3,
  },
  cta: {
    color: "#CBD987",
    ...FONTS.body5,
    paddingTop: "2rem",
  },
});
