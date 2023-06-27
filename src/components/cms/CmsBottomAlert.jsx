import React, { useState } from "react";
import { View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS } from "../../constants/Theme";
import { cmsApi } from "../../store/apiSlices/cmsApi";
import { store } from "../../store/store";
import BottomSheetWrapper from "../atoms/BottomSheetWrapper";

const CmsBottomAlert = ({ visible, children }) => {
  const safeChildren = children || [];
  const [alertVisible, setAlertVisible] = useState(visible);
  const handleOpen = (opened) => {
    console.log({opened})
    if (!opened) {
      store.dispatch(cmsApi.endpoints.updateCms.initiate({
        contentType: "bottom_alert",
        content: [{
          "type": "bottomAlert",
          "visible": false,
          "children": safeChildren.map((child) => ({...child,element: ""})),
        }]
      }))
    }
    setAlertVisible(opened)
  }
  return (
    <BottomSheetWrapper open={alertVisible} setOpen={handleOpen}>
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
