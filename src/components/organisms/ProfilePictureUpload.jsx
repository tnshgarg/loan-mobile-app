import { useEffect, useState } from "react";
import { Alert, Image, PermissionsAndroid, Text, View } from "react-native";
import { launchCamera } from "react-native-image-picker";
import Modal from "react-native-modal";
import { useSelector } from "react-redux";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import { COLORS } from "../../constants/Theme";
import Analytics, {
  InteractionTypes,
} from "../../helpers/analytics/commonAnalytics";
import { useUploadProfilePicMutation } from "../../store/apiSlices/serviceApi";
import { styles } from "../../styles";

const ProfilePictureUpload = ({ backAction, visible, setVisible }) => {
  const [imageUri, setImageUri] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const { unipeEmployeeId, token } = useSelector((state) => state.auth);
  const [uploadProfilePic] = useUploadProfilePicMutation();

  useEffect(() => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
  }, []);

  useEffect(() => {
    if (!PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA)) {
      Alert.alert(
        "Camera Permission Request",
        "We need Camera Permissions to capture your profile picture",
        [
          {
            text: "Cancel",
            onPress: () => {},
            style: "cancel",
          },
          {
            text: "Okay",
            onPress: () =>
              PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA),
          },
        ]
      );
    }
  }, []);

  const captureImage = () => {
    launchCamera(
      {
        mediaType: "photo",
        quality: 1,
        cameraType: "front",
      },
      (response) => {
        if (response.didCancel) {
          console.log("Image capture cancelled");
        } else if (response.error) {
          console.log("Error capturing image:", response.error);
        } else {
          console.log("Image URI: ", response);
          setImageUri(response.assets[0].uri);
          setFileName(response.assets[0].fileName);
          setFileType(response.assets[0].type);
        }
      }
    );
  };

  const uploadImage = async () => {
    if (imageUri) {
      const formData = new FormData();
      formData.append("profile_pic", {
        uri: imageUri,
        name: fileName,
        type: fileType,
        params: {
          unipeEmployeeId: unipeEmployeeId,
          token: token,
        },
      });
      console.log("Formdata: ", formData);

      await uploadProfilePic(formData)
        .unwrap()
        .then((response) => {
          console.log("RES: ", response);
          // Analytics.trackEvent({
          //   interaction: InteractionTypes.BUTTON_PRESS,
          //   screen: "profilePicUpload",
          //   action: "SUCCESS",
          // });
          // showToast("Profile Picture Uploaded Successfully", "success");
        })
        .catch((error) => {
          Analytics.trackEvent({
            interaction: InteractionTypes.BUTTON_PRESS,
            screen: "profilePicUpload",
            action: "ERROR",
          });
          console.error("API Error:", error);

          // Handle API errors here
          Alert.alert(
            "Error",
            "An error occurred while uploading the profile picture."
          );
        });
    } else {
      // Handle the case where no image has been captured
      Alert.alert("Error", "Please capture an image before uploading.");
    }
  };

  return (
    <Modal
      visible={visible}
      backdropColor="black"
      backdropOpacity={0.7}
      onBackButtonPress={backAction}
      animationIn={"slideInUp"}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: 12,
          paddingTop: 10,
          paddingBottom: 20,
          paddingLeft: 20,
          paddingRight: 20,
          width: "105%",
          marginLeft: -10,
          marginTop: 20,
        }}
      >
        <Text style={styles.headline}>Capture Profile Picture</Text>
        <Text style={styles.subHeadline}>
          Make sure to Click a clear picture of your face {"\n"}(without anyone
          else in the frame)
        </Text>
        <View
          style={{
            padding: 5,
            borderWidth: 3,
            borderColor: COLORS.lightGray,
            borderRadius: 500,
            marginVertical: 10,
          }}
        >
          <Image
            source={
              imageUri
                ? { uri: imageUri }
                : require("../../assets/profile-placeholder.webp")
            }
            style={{
              width: 300,
              height: 300,
              borderRadius: 300,
            }}
          />
        </View>
        {imageUri ? (
          <View style={{ width: "100%" }}>
            <PrimaryButton title="Continue" onPress={uploadImage} />
            <Text
              onPress={captureImage}
              style={[
                styles.subHeadline,
                { color: COLORS.primary, paddingTop: 10 },
              ]}
            >
              Retry
            </Text>
          </View>
        ) : (
          <PrimaryButton title="Capture Image" onPress={captureImage} />
        )}
      </View>
    </Modal>
  );
};

export default ProfilePictureUpload;
