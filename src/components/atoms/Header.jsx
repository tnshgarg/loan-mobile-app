import { Text, TouchableOpacity, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS } from "../../constants/Theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Header = ({
  title,
  onLeftIconPress,
  onRightIconPress,
  progress,
  containerStyle,
  leftIcon,
  rightIcon,
}) => {
  const EmptyView = () => {
    return <View style={styles.empty} />;
  };
  return (
    <>
      <View style={[styles.container, { ...containerStyle }]}>
        <TouchableOpacity
          style={{
            marginRight: 15,
          }}
          onPress={onLeftIconPress}
        >
          <MaterialCommunityIcons
            name={leftIcon ? leftIcon : "arrow-left"}
            size={24}
            color={COLORS.black}
          />
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <Text style={{ ...FONTS.body3, color: COLORS.black }}>{title}</Text>
        </View>
        {rightIcon ? (
          <TouchableOpacity activeOpacity={0.7} onPress={onRightIconPress}>
            {rightIcon}
          </TouchableOpacity>
        ) : (
          <EmptyView />
        )}
      </View>
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
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10rem",
    paddingHorizontal: "15rem",
    backgroundColor: COLORS.white,
    borderBottomWidth: 1.5,
    borderColor: COLORS.lightgray_01,
  },
  empty: { backgroundColor: "transparent", height: "32rem", width: "32rem" },
  logo: {
    height: "20rem",
    width: "30rem",
  },
  linearLine: {
    backgroundColor: COLORS.primary,
    height: "3rem",
    borderRadius: "10rem",
  },
});

export default Header;
