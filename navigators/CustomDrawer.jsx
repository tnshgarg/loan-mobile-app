import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { Image, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { COLORS, FONTS } from "../constants/Theme";
import Logout from "../components/Logout";
import SVGImg from '../assets/UnipeLogo.svg';
export default CustomDrawer = (props) => {
  const image = useSelector((state) => state.profile.photo);
  const name = useSelector(
    (state) => state.aadhaar.data?.name || state.pan.data?.name || "User"
  );

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: COLORS.primary }}
      >
        <View style={{ padding: 20 }}>
          <Image
            source={{
              uri: `data:image/jpeg;base64,${image}`,
            }}
            style={{
              width: 80,
              height: 80,
              resizeMode: "contain",
              borderRadius: 50,
            }}
          />
          <Text
            style={{
              color: COLORS.white,
              paddingTop: 10,
              ...FONTS.h3,
            }}
          >
            {name ? name : "User"}
          </Text>
        </View>
        <View
          style={{ flex: 1, backgroundColor: COLORS.white, paddingTop: 10 }}
        >
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <Logout />
    </View>
  );
};
