import { View, Text, Alert } from "react-native";
import React from "react";
import DetailItem from "./DetailItem";
import PrimaryButton from "../../components/PrimaryButton";

const Profile = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <DetailItem label="Full Name" title="Kamal Goyal" divider />
      <DetailItem label="Email Id" title="kamal@unipe.co" divider />
      <DetailItem label="Mobile Number" title="+91 98765 43210" />
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
