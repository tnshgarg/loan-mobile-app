import { Image, Linking, TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { navigationHelper } from "../../helpers/CmsNavigationHelper";

const CmsImage = ({ url, styling, aspectRatio, navigate, clickType, link }) => {
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

  const style = EStyleSheet.create({
    fullWidthImage: {
      width: "100%",
      aspectRatio: aspectRatio || 1,
      resizeMode: "contain",
      borderRadius: "10rem",
      padding: 0,
      margin: 0,
    },
  });

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={() =>
        navigate || link
          ? clickType == "navigation"
            ? navigationHelper(navigate)
            : Linking.openURL(link)
          : null
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
