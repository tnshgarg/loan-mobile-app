import { AppBar, Button, Icon, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import * as ImagePicker from "react-native-image-picker";
import { useDispatch, useSelector } from "react-redux";
import ProgressBarTop from "../components/ProgressBarTop";
import { GenerateDocument } from "../helpers/GenerateDocument";
import { putProfileData } from "../services/employees/employeeServices";
import { addImage } from "../store/slices/imageSlice";
import { checkBox, form, selfie, styles } from "./styles";

export default PersonalImage = () => {
  const navigation = useNavigation();
  const [pickerResponse, setPickerResponse] = useState(null);
  const id = useSelector((state) => state.auth.userId);
  const placeholder = useSelector((state) => state.image.selfie);
  const Profile = useSelector((state) => state.profile.profile);
  const dispatch = useDispatch();
  const ProfilePush = () => {
    var profilePayload = GenerateDocument({
      src: "Profile",
      id: id,
      maritalStatus: Profile["maritalStatus"],
      qualification: Profile["education"],
      altMobile: Profile["altnum"],
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

  useEffect(() => {
    dispatch(addImage(imageData));
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

  console.log("asdasd", placeholder);
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
            <Icon
              name="perm-identity"
              size={300}
              color="grey"
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
