import { Icon, IconButton } from "@react-native-material/core";
import * as ImagePicker from "react-native-image-picker";
import { useDispatch } from "react-redux";
import { addPhoto } from "../store/slices/profileSlice";
import { selfie } from "../styles";

export default RNIPPhotoCapture = () => {
  const dispatch = useDispatch();
  const openCamera = () => {
    const options = {
      saveToPhotos: true,
      mediaType: "photo",
      includeBase64: true,
      cameraType: "front",
    };
    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        dispatch(addPhoto(response?.assets && response.assets[0].base64));
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
