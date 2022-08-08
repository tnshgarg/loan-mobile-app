import { View, Text, Alert } from "react-native";
import React from "react";
import DetailItem from "./DetailItem";
import PrimaryButton from "../../components/PrimaryButton";
import { useSelector } from "react-redux";

const Profile = () => {
  const fullName = useSelector((state) => state.profile.fullName);
  const email = useSelector((state) => state.profile.email);
  const mobile = useSelector((state) => state.profile.mobile);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <DetailItem
        label="Full Name"
        title={fullName || "Not Provided"}
        divider
      />
      <DetailItem label="Email Id" title={email || "Not Provided"} divider />
      <DetailItem label="Mobile Number" title={mobile || "Not Provided"} />
      <View style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 20 }}>
        <PrimaryButton
          style={{ marginTop: 20 }}
          title="Update"
          onPress={() =>
            Alert.alert(
              "The Profile Details are not editable, please ask your employer to update"
            )
          }
        />
      </View>
    </View>
  );
};

export default Profile;
