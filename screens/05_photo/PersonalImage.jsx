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
import RNPhotoCapture from "../../components/RNPhotoCapture";

import ProgressBarTop from "../../components/ProgressBarTop";
import { GenerateDocument } from "../../helpers/GenerateDocument";
import { putBackendData } from "../../services/employees/employeeServices";
import { addSelfie } from "../../store/slices/profileSlice";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { checkBox, form, selfie, styles } from "../../styles";

export default PersonalImage = () => {
  const navigation = useNavigation();
  const id = useSelector((state) => state.auth.id);
  const Profile = useSelector((state) => state.profile);
  const [imageData, setImageData] = useState(Profile.selfie);
  const dispatch = useDispatch();
  console.log(Profile.selfie);
  useEffect(() => {
    dispatch(addCurrentScreen("PersonalImage"));
  }, []);

  useEffect(() => {
    setImageData(Profile.selfie);
  }, [Profile.selfie]);

  const ProfilePush = () => {
    var profilePayload = GenerateDocument({
      src: "Profile",
      id: id,
      maritalStatus: Profile["maritalStatus"],
      qualification: Profile["educationalQualification"],
      altMobile: Profile["alternatePhone"],
      email: Profile["email"],
      photo: imageData,
    });
    putBackendData({ document: profilePayload, src: "Profile" })
      .then((res) => {
        console.log(res.data);
        navigation.navigate("Home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        dispatch(addSelfie(response?.assets && response.assets[0].base64));
      }
    });
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <AppBar
          title="Setup Profile"
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
            <RNPhotoCapture type="SELFIE" side="front"/>
          </View>
          <Button
            title="Finish"
            type="solid"
            uppercase={false}
            style={form.nextButton}
            color="#4E46F1"
            onPress={() => {
              ProfilePush();
              navigation.navigate("Home");
            }}
          />
          <View style={checkBox.padding}></View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
