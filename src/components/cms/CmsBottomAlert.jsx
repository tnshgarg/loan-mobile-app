import { View } from "react-native";
import React, { useEffect, useState } from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS } from "../../constants/Theme";
import BottomSheetWrapper from "../atoms/BottomSheetWrapper";

const CmsBottomAlert = ({ visible, children }) => {
  const safeChildren = children || [];
  const [alertVisible, setAlertVisible] = useState(visible);
  return (
    <BottomSheetWrapper open={alertVisible} setOpen={setAlertVisible}>
      {safeChildren?.map((child, index) => (
        <View key={index}>{child.element(child)}</View>
      ))}
    </BottomSheetWrapper>
  );
};

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
  },
  imageView: {
    // width: "100%",
    // height: 200,
    resizeMode: "contain",
    alignSelf: "center",
    //backgroundColor: COLORS.black,
  },
  svgBackground: {
    backgroundColor: COLORS.lightgray_01,
    margin: "-15rem",
    borderTopLeftRadius: "20rem",
    borderTopRightRadius: "20rem",
    marginBottom: "10rem",
    paddingTop: "15rem",
    alignItems: "center",
  },
});

export default CmsBottomAlert;
