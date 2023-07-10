import { Image, Linking, TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { navigationRef } from "../../navigators/RootNavigation";

const CmsImage = ({
  url,
  styling,
  aspectRatio,
  navigate = {},
  clickType = "linking",
  link = "",
}) => {
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
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={() =>
        clickType == "navigation"
          ? navigationRef.navigate(navigate)
          : Linking.openURL(link)
      }
    >
      <Image
        style={[style.fullWidthImage, { ...styling }]}
        source={{
          uri: url,
        }}
      />
    </TouchableOpacity>
  );
};

export default CmsImage;
