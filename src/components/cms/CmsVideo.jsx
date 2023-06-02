import { View, Text, Image } from "react-native";
import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS } from "../../constants/Theme";
import VideoPlayer from "../organisms/VideoPlayer";

const CmsVideo = ({ title, subtitle }) => {
  return (
    <View style={styles.container}>
      <VideoPlayer
        size={"small"}
        thumbnail={{
          uri: "https://images.pexels.com/photos/1542252/pexels-photo-1542252.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
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
    flex: 1,
    borderRadius: "10rem",
    padding: "15rem",
    flexDirection: "row",
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
