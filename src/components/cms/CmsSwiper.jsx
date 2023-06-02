import { View, Text, Image } from "react-native";
import Swiper from "react-native-swiper";
import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS } from "../../constants/Theme";

const CmsSwiper = ({ urls }) => {
  return (
    <Swiper
      style={styles.wrapper}
      dotColor={COLORS.lightGray}
      activeDotColor={COLORS.black}
    >
      {urls.map((item, index) => (
        <Image source={{ uri: item }} style={styles.image} />
      ))}
    </Swiper>
  );
};

const styles = EStyleSheet.create({
  wrapper: { height: 200, marginVertical: "15rem" },
  image: {
    resizeMode: "contain",
    width: "98%",
    alignSelf: "center",
    borderRadius: "10rem",
    height: 150,
    // marginRight: "2rem",
  },
});

export default CmsSwiper;
