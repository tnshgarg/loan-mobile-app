import { Icon, IconButton } from "@react-native-material/core";
import { launchCamera } from "react-native-image-picker";
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
    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        dispatch(addPhoto(response?.assets[0]?.base64));
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
