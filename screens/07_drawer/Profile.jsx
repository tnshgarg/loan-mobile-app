import { View, Text, Alert } from "react-native";
import React from "react";
import DetailItem from "./DetailItem";
import PrimaryButton from "../../components/PrimaryButton";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../styles";

const Profile = () => {
  const aadhaarData = useSelector((state) => state.aadhaar.data);
  const fullName =
    aadhaarData?.["name"] || useSelector((state) => state.pan?.name);
  const profile = useSelector((state) => state.profile);
  const email = profile?.email;
  const mobile = useSelector((state) => state.auth.phoneNumber);
  const alternateMobile = profile?.altMobile;
  const maritalStatus = profile?.maritalStatus;
  const qualification = profile?.qualification;

  const dataDetails = [
    { label: "Full Name", value: fullName || "Not Provided" },
    { label: "Email Id", value: email || "Not Provided" },
    { label: "Mobile Number", value: mobile || "Not Provided" },
    {
      label: "Alternate Mobile Number",
      value: alternateMobile || "Not Provided",
    },
    {
      label: "Educational Qualification",
      value: qualification || "Not Provided",
    },
    {
      label: "Marital Status",
      value: maritalStatus || "Not Provided",
    },
  ];

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.card}>
          {dataDetails.map((item, index) => (
            <DetailItem
              key={index}
              label={item.label}
              value={item.value || "Not Provided"}
              divider={item.divider}
            />
          ))}
        </View>

        <View
          style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 20 }}
        >
          <PrimaryButton
            containerStyle={{ marginTop: 20 }}
            title="Update"
            onPress={() =>
              Alert.alert(
                "The Profile Details are not editable, please ask your employer to update"
              )
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
