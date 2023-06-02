import React, { useState, useCallback, useRef } from "react";
import {
  Button,
  View,
  Alert,
  Text,
  TouchableOpacity,
  ImageBackground,
  Modal,
  SafeAreaView,
  Platform,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { COLORS, FONTS } from "../../constants/Theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import EStyleSheet from "react-native-extended-stylesheet";

export default function VideoPlayer({ thumbnail, title, videoId, size }) {
  const [playing, setPlaying] = useState(true);
  const [visible, setVisible] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setVisible(false);
      setPlaying(false);
    }
  }, []);

  return (
    <SafeAreaView>
      <ImageBackground
        style={[
          styles.thumbnailContainer,
          {
            height: size == "small" ? 80 : 180,
            width: size == "small" ? "48%" : "100%",
          },
        ]}
        borderRadius={5}
        source={thumbnail}
      >
        <TouchableOpacity
          //activeOpacity={0.7}
          onPress={() => videoId?.length > 0 && setVisible(true)}
          style={[styles.thumbnailContainer, { opacity: 0.4 }]}
        />
        <View style={{ position: "absolute", alignItems: "center" }}>
          <Ionicons
            name="play-circle"
            size={62}
            color={COLORS.white}
            onPress={() => videoId?.length > 0 && setVisible(true)}
          />
          {title && (
            <Text style={{ ...FONTS.h3, color: COLORS.white }}>{title}</Text>
          )}
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
            style={{
              position: "absolute",
              right: 15,
              top: Platform.OS == "ios" ? 35 : 15,
            }}
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
    </SafeAreaView>
  );
}

const styles = EStyleSheet.create({
  thumbnailContainer: {
    width: "100%",
    height: "180rem",
    backgroundColor: COLORS.black,
    borderRadius: "5rem",
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
    opacity: Platform.OS == "ios" ? 1 : 0.9,
  },
  modalView: {
    width: "100%",
  },
});
