import React, { useState } from "react";
import { View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import LinearGradient from "react-native-linear-gradient";
import { COLORS, FONTS } from "../../constants/Theme";
import PrimaryButton from "../atoms/PrimaryButton";

const CmsOptions = ({ children, styling, gradientColors, navigate }) => {
  const safeChildren = children || [];
  const [currentIndex, setCurrentIndex] = useState(0);
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
              borderColor:
                currentIndex >= index ? COLORS.primary : COLORS.white,
              marginHorizontal: 5,
              borderRadius: 10,
            }}
          ></View>
        ))}
      </View>
      <View style={styles.innerContainer}>
        <View>
          {safeChildren[currentIndex].element(safeChildren[currentIndex])}
        </View>
      </View>
      <PrimaryButton
        title={"Next"}
        containerStyle={{ width: "100%", marginTop: "10%" }}
        onPress={() => setCurrentIndex(currentIndex + 1)}
      />
    </LinearGradient>
  );
};

export default CmsOptions;
CmsOptions;
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
    paddingBottom: "35%",
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
