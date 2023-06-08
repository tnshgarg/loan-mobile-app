import { View, Text, Image } from "react-native";
import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS } from "../../constants/Theme";
import VideoPlayer from "../organisms/VideoPlayer";

const CmsVideo = ({ title, subtitle, thumbnail }) => {
  return (
    <View style={styles.container}>
      <VideoPlayer
        size={"small"}
        thumbnail={{
          uri: thumbnail,
        }}
      />
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // flex: 1,
    borderRadius: "10rem",
    // padding: "15rem",
    flexDirection: "row",
    zIndex: 99,
    backgroundColor: COLORS.black,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "-10%",
  },
  col: {
    backgroundColor: COLORS.white,
    width: "48%",
    height: 130,
    borderRadius: "5rem",
  },
});

export default CmsVideo;
