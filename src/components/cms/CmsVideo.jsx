import { View, Text, Image } from "react-native";
import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS } from "../../constants/Theme";
import VideoPlayer from "../organisms/VideoPlayer";

const CmsVideo = ({ title, subtitle, thumbnail, videoUri, styling, size }) => {
  console.log({ thumbnail });
  return (
    <View style={[styles.container, { ...styling }]}>
      <VideoPlayer
        size={size}
        thumbnail={{
          uri: thumbnail,
        }}
        videoId={videoUri}
      />
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    padding: "15rem",
  },
});

export default CmsVideo;
