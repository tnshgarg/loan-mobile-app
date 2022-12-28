import React, { useState, useCallback, useRef } from "react";
import {
  Button,
  View,
  Alert,
  Text,
  TouchableOpacity,
  ImageBackground,
  Modal,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { COLORS, FONTS } from "../../constants/Theme";
import { Ionicons } from "react-native-vector-icons";
import EStyleSheet from "react-native-extended-stylesheet";

export default function VideoPlayer({ thumbnail, title, videoId }) {
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  return (
    <>
      <ImageBackground
        style={styles.thumbnailContainer}
        borderRadius={5}
        source={thumbnail}
      >
        <TouchableOpacity
          //activeOpacity={0.7}
          onPress={() => setVisible(true)}
          style={[styles.thumbnailContainer, { opacity: 0.4 }]}
        ></TouchableOpacity>
        <View style={{ position: "absolute", alignItems: "center" }}>
          <Ionicons
            name="play-circle"
            size={62}
            color={COLORS.white}
            onPress={() => setVisible(true)}
          />
          <Text style={{ ...FONTS.h3, color: COLORS.white }}>{title}</Text>
        </View>
      </ImageBackground>

      <Modal
        animationType="none"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <TouchableOpacity
            style={{ position: "absolute", right: 15, top: 15 }}
          >
            <Ionicons
              name="close"
              size={32}
              color={COLORS.white}
              onPress={() => setVisible(false)}
            />
          </TouchableOpacity>

          <View style={styles.modalView}>
            <YoutubePlayer
              height={300}
              play={playing}
              videoId={videoId}
              onChangeState={onStateChange}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = EStyleSheet.create({
  thumbnailContainer: {
    width: "100%",
    height: "180rem",
    backgroundColor: COLORS.black,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "10rem",
  },
  childText: {
    ...FONTS.body5,
    color: COLORS.primary,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    opacity: 0.9,
  },
  modalView: {
    width: "100%",
  },
});
