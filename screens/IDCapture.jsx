import React,{useState,useEffect} from 'react';
import {Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useNavigation} from '@react-navigation/core';
const RNFS = require('react-native-fs');
import {Camera} from './styles';
import {Icon} from "@react-native-material/core";
import { useStateValue } from "../StateProvider";

const PendingView = () => (
  <View style={Camera.wait}>
    <Text>Waiting</Text>
  </View>
);

export default IDCapture = () => {
  const navigation = useNavigation();
  const [{user},dispatch] = useStateValue();
  const [id,setId] = useState(null);

  useEffect(() => {
    dispatch({
      type: "SET_ID",
      payload: id,
    })
  }, [id])

    takePicture = async function(camera) {
        const options = { quality: 0.5, base64: true };
        const data = await camera.takePictureAsync(options);
        const base64image = await RNFS.readFile(data.uri, 'base64');
        console.log(base64image);
        setId(base64image);
      };

      
    return (
      <View style={Camera.container}>
        <RNCamera
          style={Camera.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        >
          {({ camera, status, recordAudioPermissionStatus }) => {
            if (status !== 'READY') return <PendingView />;
            return (
              <View style={Camera.buttons}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={Camera.back}>
                  <Text style={Camera.buttonText}> <Icon name="arrow-back" size={25} color="white"/></Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.takePicture(camera)} style={Camera.capture}>
                  <Text style={Camera.buttonText}> Capture </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>
      </View>
    );
  }
