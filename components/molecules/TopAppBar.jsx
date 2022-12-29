import { useNavigation } from "@react-navigation/core";
import { AppBar, Icon, IconButton } from "@react-native-material/core";
import SVGImg from "../../assets/UnipeLogo.svg";
import { nav, styles } from "../../styles";

const TopAppBar = ({ navigation }) => {
  return (
    <AppBar
      title={
        <SVGImg style={styles.logo} />
        // <Image
        //   style={nav.titleLogo}
        //   source={require("../../assets/UnipeThumbnail.png")}
        // />
      }
      centerTitle={true}
      contentContainerStyle={nav.navbar}
      color="#ffffff"
      leading={
        <IconButton
          accessibilityLabel="NavigationDrawer"
          icon={<Icon name="menu" size={30} />}
          onPress={() => {
            console.log("Menu");
            navigation.toggleDrawer();
          }}
        />
      }
    />
  );
};

export default TopAppBar;
