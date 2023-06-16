import { Image, Text, TouchableNativeFeedback, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Notification from "../../assets/Notification";
import { COLORS, FONTS } from "../../constants/Theme";
import SvgContainer from "./SvgContainer";

const ListItem = ({
  item,
  disabled,
  showIcon,
  selected,
  titleStyle,
  subtitleStyle,
  containerStyle,
  curved,
}) => {
  const { title, subtitle, onPress, notificationImageUri } = item;

  console.log("ITEM: ", item);

  return (
    <TouchableNativeFeedback
      accessibilityLabel="InfoCard"
      onPress={onPress}
      disabled={disabled}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: selected
              ? COLORS.primary
              : disabled
              ? COLORS.lightgray_01
              : COLORS.white,
            ...containerStyle,
          },
          curved
            ? {
                // paddingHorizontal: 20,
                borderRadius: 15,
                width: "90%",
                alignSelf: "center",
                marginTop: 20,
              }
            : {},
        ]}
      >
        {notificationImageUri ? (
          <Image
            source={{ uri: notificationImageUri }}
            style={{
              width: "100%",
              height: 160,
              resizeMode: "cover",
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            }}
          />
        ) : (
          <></>
        )}
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 20 }}
        >
          <View
            style={{ padding: 5, backgroundColor: "#EBF1F1", borderRadius: 30 }}
          >
            <SvgContainer height={26} width={26}>
              {/* {item.imageUri} */}
              <Notification />
            </SvgContainer>
          </View>
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.title,
                { ...titleStyle },
                {
                  color: selected
                    ? COLORS.white
                    : disabled
                    ? COLORS.gray
                    : COLORS.black,
                },
              ]}
            >
              {title}
            </Text>
            {subtitle && (
              <Text
                style={[
                  styles.subtitle,
                  { ...subtitleStyle },
                  curved ? { paddingTop: 5 } : {},
                ]}
              >
                {subtitle}
              </Text>
            )}
          </View>
          {showIcon && (
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color={
                selected ? COLORS.white : disabled ? COLORS.gray : COLORS.black
              }
            />
          )}
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    // padding: "20rem",
    // flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: COLORS.lightgray_01,
  },
  textContainer: {
    paddingLeft: "10rem",
    flexDirection: "column",
    alignItems: "flex-start",
    flex: 1,
  },
  title: {
    ...FONTS.h4,
    color: COLORS.black,
  },
  subtitle: { ...FONTS.body5, color: COLORS.gray },
});

export default ListItem;
