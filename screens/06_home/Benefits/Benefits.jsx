import React from "react";
import TopTabNav from "../../../components/TopTabNav";
import DocumentsView from "../DocumentsView";
import ESICForm from "./ESIC/ESICForm";
import { Image } from "react-native";
import { nav } from "../../../styles";
import { AppBar, Icon, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";

export default Benefits = () => {
  const navigation = useNavigation();
  const tabs = [
    { name: "EPFO", component: DocumentsView },
    { name: "ESIC", component: ESICForm },
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
