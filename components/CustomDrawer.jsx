import { View, Text, Image } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { AntDesign } from "react-native-vector-icons";

const CustomDrawer = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#4E46F1" }}
      >
        <View style={{ padding: 20 }}>
          <Image
            source={{
              uri: "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg",
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
            Kamal Goyal
          </Text>
          <Text style={{ color: "white", fontSize: 15, paddingTop: 8 }}>
            Email: <Text style={{ fontWeight: "bold" }}>kamal@unipe.co</Text>
          </Text>
          <Text style={{ color: "white", fontSize: 15, paddingTop: 8 }}>
            Mobile: <Text style={{ fontWeight: "bold" }}>+919876543210</Text>
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingTop: 8,
            }}
          >
            <Text style={{ color: "white", fontSize: 15 }}>
              KYC Status: <Text style={{ fontWeight: "bold" }}>Pending</Text>
            </Text>
            <View
              style={{
                backgroundColor: "red",
                width: 8,
                height: 8,
                borderRadius: 15,
                marginLeft: 5,
              }}
            />
          </View>
        </View>
        <View style={{ flex: 1, backgroundColor: "white", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}
      >
        <AntDesign name="logout" color="black" size={16} />
        <Text style={{ fontSize: 16, paddingLeft: 10 }}>Logout</Text>
      </View>
    </View>
  );
};

export default CustomDrawer;
