import { useEffect, useState } from "react";
import { Alert, Image, PermissionsAndroid, Text, View } from "react-native";
import { launchCamera } from "react-native-image-picker";
import { useSelector } from "react-redux";
import User from "../../assets/user.svg";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import { COLORS } from "../../constants/Theme";
import Analytics, {
  InteractionTypes,
} from "../../helpers/analytics/commonAnalytics";
import { useUploadProfilePicMutation } from "../../store/apiSlices/serviceApi";
import { styles } from "../../styles";
import { showToast } from "../atoms/Toast";

const ProfilePictureUpload = ({ setVisible }) => {
  const [imageUri, setImageUri] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [loading, setLoading] = useState(false);
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
          Analytics.trackEvent({
            interaction: InteractionTypes.BUTTON_PRESS,
            screen: "profilePicCapture",
            action: "REJECT",
          });
        } else if (response.error) {
          Analytics.trackEvent({
            interaction: InteractionTypes.BUTTON_PRESS,
            screen: "profilePicCapture",
            action: "ERROR",
          });
        } else {
          Analytics.trackEvent({
            interaction: InteractionTypes.BUTTON_PRESS,
            screen: "profilePicCapture",
            action: "SUCCESS",
          });
          setImageUri(response.assets[0].uri);
          setFileName(response.assets[0].fileName);
          setFileType(response.assets[0].type);
        }
      }
    );
  };

  const uploadImage = async () => {
    if (imageUri) {
      setLoading(true);
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

      await uploadProfilePic(formData)
        .unwrap()
        .then((response) => {
          if (response.status == 200) {
            setVisible(false);
            showToast("Profile Picture Uploaded Successfully", "success");
          }
          Analytics.trackEvent({
            interaction: InteractionTypes.BUTTON_PRESS,
            screen: "profilePicUpload",
            action: "SUCCESS",
          });
        })
        .catch((error) => {
          Analytics.trackEvent({
            interaction: InteractionTypes.BUTTON_PRESS,
            screen: "profilePicUpload",
            action: "ERROR",
          });
          console.error("API Error:", error);
          Alert.alert(
            "Error",
            "An error occurred while uploading the profile picture."
          );
          showToast("Profile Picture Error", "error");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      Alert.alert("Error", "Please capture an image before uploading.");
      showToast("Profile Picture Error", "error");
    }
  };

  return (
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
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={{
              width: 300,
              height: 300,
              borderRadius: 300,
            }}
          />
        ) : (
          <View
            style={{
              width: 300,
              height: 300,
              borderRadius: 300,
              backgroundColor: COLORS.lightGray,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <User width={200} height={200} />
          </View>
        )}
      </View>
      {imageUri ? (
        <View style={{ width: "100%" }}>
          <PrimaryButton
            title="Continue"
            onPress={uploadImage}
            loading={loading}
            disabled={loading}
          />
          <Text
            onPress={loading ? () => {} : captureImage}
            style={[
              styles.subHeadline,
              {
                color: loading ? COLORS.lightGray : COLORS.primary,
                paddingTop: 10,
              },
            ]}
          >
            Retry
          </Text>
        </View>
      ) : (
        <PrimaryButton title="Capture Image" onPress={captureImage} />
      )}
    </View>
  );
};

export default ProfilePictureUpload;
