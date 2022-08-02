import { View, Text } from "react-native";
import React from "react";
import DetailItem from "./DetailItem";

const Profile = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <DetailItem label="Full Name" title="Kamal Goyal" divider />
      <DetailItem label="Email Id" title="kamal@unipe.co" divider />
      <DetailItem label="Mobile Number" title="+91 98765 43210" />
    </View>
  );
};

export default Profile;
