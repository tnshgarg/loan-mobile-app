import { Button, Icon, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React, { useCallback, useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import * as ImagePicker from "react-native-image-picker";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../../components/PrimaryButton";
import ProgressBarTop from "../../navigators/ProgressBarTop";
import RNIPPhotoCapture from "../../components/RNIPPhotoCapture";
import { COLORS } from "../../constants/Theme";
import { profileBackendPush } from "../../helpers/BackendPush";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { addPhoto } from "../../store/slices/profileSlice";
import { checkBox, form, selfie, styles } from "../../styles";
import Header from "../../components/atoms/Header";

export default PersonalImage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [next, setNext] = useState(false);

  const id = useSelector((state) => state.auth.id);
  const profileSlice = useSelector((state) => state.profile);
  const [image, setImage] = useState(
    useSelector((state) => state.profile.photo)
  );
  useEffect(() => {
    dispatch(addCurrentScreen("PersonalImage"));
  }, []);

  useEffect(() => {
    setImage(profileSlice.photo);
  }, [profileSlice.photo]);

  useEffect(() => {
    if (image) {
      setNext(true);
    } else {
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
        dispatch(addPhoto(response?.assets[0]?.base64));
      }
    });
  }, []);

  return (
    <SafeAreaView style={[styles.container, { padding: 0 }]}>
      <Header
        title="Photo"
        onLeftIconPress={() => navigation.navigate("PersonalDetailsForm")}
      />
      <ProgressBarTop step={5} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
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
            <RNIPPhotoCapture />
          </View>
          <PrimaryButton
            title="Finish"
            type="solid"
            uppercase={false}
            color={COLORS.primary}
            disabled={!next}
            onPress={() => {
              profileBackendPush({
                id: id,
                maritalStatus: profileSlice?.maritalStatus,
                qualification: profileSlice?.qualification,
                altMobile: profileSlice?.altMobile,
                email: profileSlice?.email,
                motherName: profileSlice?.motherName,
                photo: profileSlice?.photo,
              });
              navigation.navigate("Home");
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
