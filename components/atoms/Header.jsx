import { AppBar, Icon, IconButton } from "@react-native-material/core";
import { COLORS, FONTS } from "../../constants/Theme";

const Header = ({ title, onLeftIconPress, onRightIconPress }) => {
  return (
    <AppBar
      title={title}
      contentContainerStyle={{ height: 50 }}
      color={COLORS.white}
      titleStyle={{ color: COLORS.black, ...FONTS.body3 }}
      leading={
        <IconButton
          icon={<Icon name="arrow-back" size={20} color={COLORS.black} />}
          onPress={onLeftIconPress}
        />
      }
      trailing={
        onRightIconPress && (
          <IconButton
            icon={<Icon name="arrow-forward" size={20} color="white" />}
            onPress={onRightIconPress}
          />
        )
      }
    />
  );
};

export default Header;
