import React from "react";
import { StyleSheet, View } from "react-native";
import ListItem from "../atoms/ListItem";

const CmsNotification = ({ title, subtitle, notificationImageUri }) => {
  //   const { title, subtitle, notificationImageUri } = children;
  //   console.log("Children: ", children);
  return (
    <View>
      <ListItem
        curved
        item={{
          title: title,
          subtitle: subtitle,
          imageUri: "something",
          notificationImageUri: notificationImageUri,
        }}
      />
    </View>
  );
};

export default CmsNotification;

const styles = StyleSheet.create({});
