import React, { useState, useCallback, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { styles, checkBox, form, Camera, selfie } from "./styles";
import { AppBar, IconButton, Icon, Button } from "@react-native-material/core";
import * as ImagePicker from "react-native-image-picker";
import { useStateValue } from "../StateProvider";
import ProgressBarTop from "../components/ProgressBarTop";
import { putProfileData } from "../services/employees/employeeServices";
import { GenerateDocument } from "../helpers/GenerateDocument";
export default PersonalImage = () => {
  const navigation = useNavigation();
  const [pickerResponse, setPickerResponse] = useState(null);
  const [{ Selfie, Profile, id }, dispatch] = useStateValue();

  const ProfilePush = () => {
    var profilePayload = GenerateDocument({
      src: "Profile",
      id: "62be55b1bb8d55cb4644801b",
      maritalStatus: Profile["maritalStatus"],
      qualification: Profile["qualification"],
      altMobile: Profile["altMobile"],
      email: Profile["email"],
      photo: imageData,
    });
    putProfileData(profilePayload)
      .then((res) => {
        console.log(profilePayload);
        console.log(res.data);
        Alert.alert("Message", res.data["message"]);
        navigation.navigate("Home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const placeHolder =
    "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";
  useEffect(() => {
    dispatch({
      type: "SET_FACE_DATA",
      payload: imageData,
    });
  }, [imageData]);

  const onImageLibraryPress = useCallback(() => {
    const options = {
      selectionLimit: 1,
      mediaType: "photo",
      includeBase64: true,
    };
    ImagePicker.launchImageLibrary(options, setPickerResponse);
  }, []);

  const onCameraPress = React.useCallback(() => {
    const options = {
      cameraType: "front",
      quality: 1,
      mediaType: "photo",
      includeBase64: true,
    };
    ImagePicker.launchCamera(options, setPickerResponse);
  }, []);

  const imageData = pickerResponse?.assets && pickerResponse.assets[0].base64;

  return (
    <>
      <SafeAreaView style={styles.container}>
        <AppBar
          title="Setup Profile"
          color="#4E46F1"
          leading={
            <IconButton
              icon={<Icon name="arrow-back" size={20} color="white" />}
              onPress={() => navigation.goBack()}
            />
          }
        />
        <ProgressBarTop step={5} />
        <ScrollView keyboardShouldPersistTaps="handled">
          <Text style={form.formHeader}>
            Upload your Passport size photo or capture your selfie.
          </Text>
          {imageData ? (
            <Image
              source={{ uri: `data:image/jpeg;base64,${imageData}` }}
              style={selfie.selfie}
            />
          ) : (
            <Image
              source={{ uri: `data:image/jpeg;base64,${placeHolder}` }}
              style={selfie.selfie}
            />
          )}
          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <IconButton
              icon={<Icon name="image-search" size={30} color="black" />}
              style={selfie.uploadButton}
              onPress={() => {
                onImageLibraryPress();
              }}
            />
            <IconButton
              icon={<Icon name="camera-alt" size={25} color="black" />}
              style={selfie.cameraButton}
              onPress={() => {
                onCameraPress();
              }}
            />
          </View>
          <Button
            title="Finish"
            type="solid"
            uppercase={false}
            style={form.nextButton}
            color="#4E46F1"
            onPress={() => {
              ProfilePush();
            }}
          />
          <View style={checkBox.padding}></View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
