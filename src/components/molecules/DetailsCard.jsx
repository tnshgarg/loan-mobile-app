import { View, Text, Image } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS } from "../../constants/Theme";
import LinearGradient from "react-native-linear-gradient";

const DetailsCard = ({ data, imageUri, containerStyle, type }) => {
  return type == "Aadhaar" ? (
    <View style={{ backgroundColor: "#f7f6f1", borderRadius: 10 }}>
      <LinearGradient
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[COLORS.lightGreen, COLORS.lightYellow]}
      >
        <Text style={{ ...FONTS.body1, width: "50%" }}>{data[0].value}</Text>
        {imageUri && <Image source={imageUri} style={styles.aadhaarImage} />}
      </LinearGradient>
      <View style={styles.container}>
        {data.map((item, index) => (
          <View
            key={index}
            style={[
              styles.listItem,
              { width: item.fullWidth ? "100%" : "50%" },
            ]}
          >
            <Text style={[styles.label, { color: COLORS.gray }]}>
              {item.subTitle}
            </Text>
            <Text style={[styles.value, { ...FONTS.body3 }]}>
              {item.value || "-"}
            </Text>
          </View>
        ))}
      </View>
    </View>
  ) : (
    <LinearGradient
      style={[styles.container, { ...containerStyle }]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[COLORS.lightGreen, COLORS.lightYellow]}
    >
      <Text style={{ ...FONTS.body1, width: "50%" }}>{data[0].value}</Text>
      {imageUri && <Image source={imageUri} style={styles.image} />}

      {data.map((item, index) => (
        <View
          key={index}
          style={[styles.listItem, { width: item.fullWidth ? "100%" : "50%" }]}
        >
          <Text style={styles.label}>{item.subTitle}</Text>
          <Text style={styles.value}>{item.value || "-"}</Text>
        </View>
      ))}
    </LinearGradient>
  );
};

const styles = EStyleSheet.create({
  container: {
    //backgroundColor: COLORS.primaryBackground,
    width: "100%",
    marginBottom: "10rem",
    padding: "20rem",
    flexDirection: "row",
    //alignItems: "center",
    borderRadius: "10rem",

    flexWrap: "wrap",
    marginVertical: "10rem",
  },
  gradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderTopLeftRadius: "10rem",
    borderTopRightRadius: "10rem",
  },
  aadhaarImage: {
    height: "80rem",
    width: "80rem",
    borderRadius: "5rem",
  },
  image: {
    height: "80rem",
    width: "80rem",
    position: "absolute",
    right: 0,
    margin: "10rem",
    borderRadius: 5,
  },
  listItem: { marginVertical: "10rem" },
  label: {
    ...FONTS.body5,
    color: COLORS.black,
    marginBottom: "2rem",
  },
  value: {
    ...FONTS.h4,
    color: COLORS.black,
  },
  text: { paddingLeft: "10rem", ...FONTS.body5, color: COLORS.gray, flex: 1 },
});

export default DetailsCard;
