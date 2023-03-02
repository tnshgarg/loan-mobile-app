import { AppBar, Icon, IconButton } from "@react-native-material/core";
import { Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS } from "../../constants/Theme";

const Header = ({ title, onLeftIconPress, onRightIconPress, progress }) => {
  return (
    <>
      <AppBar
        title={title}
        contentContainerStyle={{ height: 50 }}
        color={COLORS.white}
        titleStyle={{ color: COLORS.black, ...FONTS.body4 }}
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
      {progress && (
        <View
          style={[
            styles.linearLine,
            {
              width: `${progress}%`,
            },
          ]}
        />
      )}
    </>
  );
};

const styles = EStyleSheet.create({
  linearLine: {
    backgroundColor: COLORS.primary,
    height: "3rem",
    borderRadius: "10rem",
  },
});

export default Header;
