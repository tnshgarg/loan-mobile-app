import { View, Alert, BackHandler } from "react-native";
import PrimaryButton from "../../../components/atoms/PrimaryButton";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../../styles";
import Header from "../../../components/atoms/Header";
import DetailsCard from "../../../components/molecules/DetailsCard";
import { useEffect } from "react";

const Profile = ({ navigation }) => {
  const aadhaarData = useSelector((state) => state.aadhaar.data);
  const fullName =
    aadhaarData?.["name"] || useSelector((state) => state.pan?.name);
  const profile = useSelector((state) => state.profile);
  const email = profile?.email;
  const mobile = useSelector((state) => state.auth.phoneNumber);
  const alternateMobile = profile?.altMobile;
  const maritalStatus = profile?.maritalStatus;
  const qualification = profile?.qualification;

  const cardData = () => {
    var res = [
      { subTitle: "Name", value: fullName, fullWidth: true },
      { subTitle: "Email Id", value: email, fullWidth: true },
      { subTitle: "Mobile Number", value: mobile, fullWidth: true },
      {
        subTitle: "Alternate Mobile Number",
        value: alternateMobile,
        fullWidth: true,
      },
      {
        subTitle: "Educational Qualification",
        value: qualification,
        fullWidth: true,
      },
      { subTitle: "Marital Status", value: maritalStatus, fullWidth: true },
    ];
    return res;
  };

  const backAction = () => {
    navigation.navigate("HomeStack", {
      screen: "Account",
    });
    return true;
  };
  
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header title="Profile Details" onLeftIconPress={() => backAction()} />
      <View style={styles.container}>
        <DetailsCard
          data={cardData()}
          imageUri={{
            uri: `data:image/jpeg;base64,${aadhaarData["photo_base64"]}`,
            cache: "only-if-cached",
          }}
        />
        {/* 
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <PrimaryButton
            containerStyle={{ marginTop: 20 }}
            title="Update"
            onPress={() =>
              Alert.alert(
                "The Profile Details are not editable, please ask your employer to update"
              )
            }
          />
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default Profile;