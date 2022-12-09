import React, { useState, useCallback, useRef } from "react";
import { Button, View, Alert } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

export default function VideoPlayer() {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  return (
    <View style={{ marginVertical: 15 }}>
      <YoutubePlayer
        height={300}
        play={playing}
        videoId={"9zXrU09Lvcs"}
        onChangeState={onStateChange}
      />
    </View>
  );
}
