import { Icon } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { RNCamera } from "react-native-camera";
const RNFS = require("react-native-fs");

import { useDispatch } from "react-redux";
import { addAadhaarImage } from "../store/slices/aadhaarSlice";
import { addSelfie } from "../store/slices/profileSlice";
import { Camera } from "../styles";

const PendingView = () => (
  <View style={Camera.wait}>
    <Text>Waiting</Text>
  </View>
);


export default function RNPhotoCapture (props) {
  const navigation = useNavigation()
  const [id, setId] = useState(null)
  const {front} = props.route.params

  const dispatch = useDispatch();

  useEffect(() => {
    if (props.route.params.type.match(/^AADHAAR/)) {
      dispatch(addAadhaarImage({ data: id, type: props.route.params.type }));
    } else if (props.route.params.type.match(/^SELFIE/)) {
      dispatch(addSelfie({ data: id, type: props.route.params.type }));
    }
  }, [id]);

  takePicture = async function (camera) {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    const base64image = await RNFS.readFile(data.uri, "base64");
    setId(base64image);
    navigation.goBack();
  };

  return (
    <View style={Camera.container}>
      <RNCamera
        style={Camera.preview}
        type={
          RNCamera.Constants.Type.back
        }
        flashMode={RNCamera.Constants.FlashMode.off}
        androidCameraPermissionOptions={{
          title: "Permission to use camera",
          message: "We need your permission to use your camera",
          buttonPositive: "Ok",
          buttonNegative: "Cancel",
        }}
        androidRecordAudioPermissionOptions={{
          title: "Permission to use audio recording",
          message: "We need your permission to use your audio",
          buttonPositive: "Ok",
          buttonNegative: "Cancel",
        }}
      >
        {({ camera, status, recordAudioPermissionStatus }) => {
          if (status !== "READY") return <PendingView />;
          return (
            <View style={Camera.buttons}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={Camera.back}
              >
                <Icon name="arrow-back" size={25} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => takePicture(camera)}
                style={Camera.capture}
              >
                <Text style={Camera.buttonText}> Capture </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
};