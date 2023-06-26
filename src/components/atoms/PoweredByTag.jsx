import { View, Text, Image } from "react-native";
import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS } from "../../constants/Theme";

const PoweredByTag = ({ image, title }) => {
  let lenght = Object.keys(image).length;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Powered by </Text>
      {image.map((item, index) => (
        <>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={item}
          />
          {lenght > 1 && index < lenght-1 ? <Text style={styles.ampersand}>&</Text> : null}
        </>
      ))}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginVertical: "5rem",
  },
  title: {
    ...FONTS.body5,
    color: COLORS.gray,
  },
  ampersand: {
    ...FONTS.body5,
    color: COLORS.gray,
    marginRight: "10rem",
  },
  image: {
    height: "40rem",
    width: "40rem",
    marginRight: "5rem",
  },
});

export default PoweredByTag;
