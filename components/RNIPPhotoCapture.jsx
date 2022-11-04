import { Icon, IconButton } from "@react-native-material/core";
import { launchCamera } from "react-native-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { addPhoto } from "../store/slices/profileSlice";
import { selfie } from "../styles";
import Analytics from "appcenter-analytics";

export default RNIPPhotoCapture = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.id);
  const openCamera = () => {
    const options = {
      saveToPhotos: true,
      mediaType: "photo",
      quality : 0.5,
      includeBase64: true,
      cameraType: "front",
    };
    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled camera");
        Analytics.trackEvent("PersonalImage|Camera|Error", {
          unipeEmployeeId id,
          error: "User cancelled camera",
        });
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
        Analytics.trackEvent("PersonalImage|Camera|Error", {
          unipeEmployeeId id,
          error: response.error,
        });
      } else {
        dispatch(addPhoto(response?.assets[0]?.base64));
        Analytics.trackEvent("PersonalImage|Camera|Success", {
          unipeEmployeeId id,
        });
      }
    });
  };

  return (
    <IconButton
      icon={<Icon name="camera-alt" size={25} color="black" />}
      style={selfie.cameraButton}
      onPress={() => {
        openCamera();
      }}
    />
  );
};
