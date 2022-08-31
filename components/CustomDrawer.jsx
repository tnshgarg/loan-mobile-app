import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { Image, Text, View } from "react-native";
import { useSelector } from "react-redux";
import Logout from "./Logout";

export default CustomDrawer = (props) => {
  const image = useSelector((state) => state.profile.photo);
  const name = useSelector(
    (state) => state.aadhaar.data?.name || state.pan.data?.name || "User"
  );

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#4E46F1" }}
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
              color: "white",
              fontSize: 18,
              paddingTop: 10,
              fontWeight: "bold",
            }}
          >
            {name ? name : "User"}
          </Text>
        </View>
        <View style={{ flex: 1, backgroundColor: "white", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <Logout />
    </View>
  );
};
