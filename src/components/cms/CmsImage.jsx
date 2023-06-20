import EStyleSheet from "react-native-extended-stylesheet";
import { useEffect, useState } from "react";
import { Image } from "react-native";

const CmsImage = ({ url, styling, aspectRatio }) => {
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

  console.log({ url, aspectRatio });

  const style = EStyleSheet.create({
    fullWidthImage: {
      width: "100%",
      aspectRatio: aspectRatio || 1,
      resizeMode: "contain",
      borderRadius: "10rem",
    },
  });

  return (
    <Image
      style={[style.fullWidthImage, { ...styling }]}
      source={{
        uri: url,
      }}
    />
  );
};

export default CmsImage;
