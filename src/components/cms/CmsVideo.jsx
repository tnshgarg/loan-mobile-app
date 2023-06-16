import { View, Text, Image } from "react-native";
import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS } from "../../constants/Theme";
import VideoPlayer from "../organisms/VideoPlayer";

const CmsVideo = ({ title, subtitle, thumbnail }) => {
  console.log({ thumbnail });
  return (
    <VideoPlayer
      size={"small"}
      thumbnail={{
        uri: thumbnail,
      }}
    />
  );
};

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CmsVideo;
