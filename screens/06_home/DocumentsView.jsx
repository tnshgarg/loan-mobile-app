import React from "react";
import { Image, View, SafeAreaView, Text } from "react-native";
import { styles } from "../../styles";

const DocumentsView = () => {
  return (
    <>
      <SafeAreaView style={[styles.container, { padding: 0 }]}>
        <View style={{ alignSelf: "center", marginTop: "20%" }}>
          <Text style={{ fontSize: 20, alignSelf: "center" }}>
            ✨Somethings Cooking✨
          </Text>
          <Image
            style={{ width: 300, height: "70%" }}
            source={require("../../assets/cooking.gif")}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default DocumentsView;
