import { View, Text } from "react-native";
import React from "react";
import { AppBar, Icon, IconButton } from "@react-native-material/core";
import { COLORS } from "../../constants/Theme";

const Header = ({ title, onLeftIconPress, onRightIconPress }) => {
  return (
    <AppBar
      title={title}
      color={COLORS.primary}
      titleStyle={{ color: COLORS.white }}
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
