import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { useSelector } from "react-redux";
import { FONTS } from "../../constants/Theme";
import { useGetCmsQuery } from "../../store/apiSlices/cmsApi";

const CmsMiniPlacement = (props) => {
  const { unipeEmployeeId } = useSelector((state) => state.auth);
  const { data: cmsData, isLoading: cmsLoading } = useGetCmsQuery(
    unipeEmployeeId,
    {
      pollingInterval: 1000 * 3600,
    }
  );

  return (
    <>
      {!cmsLoading ? (
        <TouchableOpacity activeOpacity={0.95} style={style.container}>
          <Image
            source={{ uri: cmsData?.miniPlacement[0].leftIcon }}
            style={style.icon}
          />
          <View style={style.childContainer}>
            <Text style={style.title}>{cmsData?.miniPlacement[0].title}</Text>
            <Text style={style.cta}>
              {cmsData?.miniPlacement[0].cta} {">"}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </>
  );
};

export default CmsMiniPlacement;

const style = EStyleSheet.create({
  container: {
    backgroundColor: "#377476",
    width: "120%",
    paddingVertical: "10rem",
    paddingHorizontal: "10rem",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 999,
  },
  icon: {
    width: "28rem",
    height: "28rem",
    resizeMode: "contain",
    paddingLeft: "5rem",
  },
  childContainer: {
    paddingLeft: "15rem",
  },
  title: {
    color: "white",
    ...FONTS.h3,
  },
  cta: {
    color: "#CBD987",
    ...FONTS.body5,
    paddingTop: "2rem",
  },
});
