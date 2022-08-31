import { AppBar, Button, Icon, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import * as ImagePicker from "react-native-image-picker";

import ProgressBarTop from "../../components/ProgressBarTop";
import { profileBackendPush } from "../../services/employees/employeeServices";
import { addPhoto } from "../../store/slices/profileSlice";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { checkBox, form, selfie, styles } from "../../styles";
import RNIPPhotoCapture from "../../components/RNIPPhotoCapture";

export default PersonalImage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [next, setNext] = useState(false);

  const id = useSelector((state) => state.auth.id);
  const profileSlice = useSelector((state) => state.profile);
  const [image, setImage] = useState(profileSlice?.photo);

  useEffect(() => {
    dispatch(addCurrentScreen("PersonalImage"));
  }, []);

  useEffect(() => {
    setImage(image);
    if (image) {
      setNext(true);
    }
    else{
      setNext(false);
    }
  }, [image]);

  const onImageLibraryPress = useCallback(() => {
    const options = {
      selectionLimit: 1,
      mediaType: "photo",
      includeBase64: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        dispatch(addPhoto(response?.assets && response.assets[0].base64));
      }
    });
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <AppBar
          title="Photo"
          color="#4E46F1"
          leading={
            <IconButton
              icon={<Icon name="arrow-back" size={20} color="white" />}
              onPress={() => navigation.navigate("PersonalDetailsForm")}
            />
          }
        />
        <ProgressBarTop step={5} />
        <ScrollView keyboardShouldPersistTaps="handled">
          <Text style={form.formHeader}>
            Upload your Passport size photo or capture your selfie.
          </Text>
          {image ? (
            <Image
              source={{ uri: `data:image/jpeg;base64,${image}` }}
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
           <RNIPPhotoCapture/>
          </View>
          {next ? (
            <Button
              title="Finish"
              type="solid"
              uppercase={false}
              style={form.nextButton}
              color="#4E46F1"
              onPress={() => {
                profileBackendPush({
                  id: id,
                  maritalStatus: profileSlice?.maritalStatus,
                  qualification: profileSlice?.educationalQualification,
                  altMobile: profileSlice?.alternatePhone,
                  email: profileSlice?.email,
                  photo: profileSlice?.photo,
                });
                navigation.navigate("Home");
              }}
            />
          ) : (
            <Button
              title="Finish"
              uppercase={false}
              type="solid"
              style={form.nextButton}
              disabled
            />
          )}
          <View style={checkBox.padding}></View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
