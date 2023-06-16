import EStyleSheet from "react-native-extended-stylesheet";
import { useEffect, useState } from "react";
import { Image } from "react-native";

const CmsImage = function ({ url }) {
  // const [{ width, height }, setDimensions] = useState({
  //   width: 0,
  //   height: 0,
  // });
  // let aspectRatio = 1;
  // if (width && height) {
  //   aspectRatio = width / height || 1;
  // }
  // useEffect(() => {
  //   Image.getSize(url, (width, height) => {
  //     setDimensions({ width, height });
  //   });
  // }, [url]);

  console.log({ url });

  const style = EStyleSheet.create({
    fullWidthImage: {
      width: "100%",
      // width: 50,
      // height: 50,
      // aspectRatio: aspectRatio,
      aspectRatio: 1,
      resizeMode: "contain",
      borderRadius: "10rem",
    },
  });

  return (
    <Image
      style={style.fullWidthImage}
      source={{
        uri: url,
      }}
    />
  );
};

export default CmsImage;
