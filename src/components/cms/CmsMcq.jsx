import React, { useEffect, useState } from "react";
import { View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { useSelector } from "react-redux";
import { COLORS, FONTS } from "../../constants/Theme";
import PrimaryButton from "../atoms/PrimaryButton";

const CmsMcq = ({
  children,
  styling,
  gradientColors,
  navigate,
  survey_id,
  question_id,
}) => {
  const safeChildren = children || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useSelector((state) => state?.[survey_id]?.[question_id]);

  useEffect(() => {}, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.innerContainer}>
        {safeChildren?.map((child, index) => (
          <View key={index}>{child.element(child)}</View>
        ))}
      </View>
      <PrimaryButton
        title={"Next"}
        containerStyle={{ width: "100%", marginTop: "10%" }}
        onPress={() =>
          safeChildren.length - 1 == currentIndex
            ? navigationHelper({
                type: "cmsScreenThree",
                params: { blogKey: "survey_done" },
              })
            : setCurrentIndex(currentIndex + 1)
        }
      />
    </View>
  );
};

export default CmsMcq;

const styles = EStyleSheet.create({
  container: {
    padding: "5%",
    width: "100%",
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
