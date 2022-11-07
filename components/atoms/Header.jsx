import { AppBar, Icon, IconButton } from "@react-native-material/core";
import { COLORS, FONTS } from "../../constants/Theme";

const Header = ({ title, onLeftIconPress, onRightIconPress }) => {
  return (
    <AppBar
      title={title}
      contentContainerStyle={{ height: 50 }}
      color={COLORS.primary}
      titleStyle={{ color: COLORS.white, ...FONTS.h3 }}
      leading={
        <IconButton
          icon={<Icon name="arrow-back" size={20} color="white" />}
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
