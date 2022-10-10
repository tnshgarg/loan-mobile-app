import { AppBar, Icon, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image } from "react-native";
import TopTabNav from "../../../components/TopTabNav";
import { nav } from "../../../styles";
import DocumentsView from "../DocumentsView";
import License from "./License/License";

export default Documents = () => {
  const navigation = useNavigation();
  const tabs = [
    { name: "Offer Letter", component: DocumentsView },
    { name: "Pay Slips", component: DocumentsView },
    { name: "ID Card", component: DocumentsView },
    { name: "Driving License", component: License },
  ];
  return (
    <>
      <AppBar
        title={
          <Image
            style={nav.titleLogo}
            source={require("../../../assets/unipe-Thumbnail.png")}
          />
        }
        centerTitle={true}
        contentContainerStyle={nav.navbar}
        color="#ffffff"
        leading={
          <IconButton
            icon={<Icon name="menu" size={30} />}
            onPress={() => {
              console.log("Menu");
              navigation.toggleDrawer();
            }}
          />
        }
        trailing={<IconButton icon={<Icon name="more-vert" size={30} />} />}
      />
      <TopTabNav tabs={tabs} hide={false} />
    </>
  );
};
