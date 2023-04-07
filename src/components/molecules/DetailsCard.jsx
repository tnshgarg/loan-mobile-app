import { View, Text, Image } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS } from "../../constants/Theme";

const DetailsCard = ({ data, imageUri, containerStyle, type }) => {
  return (
    <View style={[styles.container, { ...containerStyle }]}>
      {imageUri && <Image source={imageUri} style={styles.image} />}
      {type == "Aadhaar" && (
        <Image
          source={require("../../assets/Aadhaar.png")}
          resizeMode="cover"
          style={{
            width: "65%",
            height: 40,
            marginBottom: "5%",
            transform: [{ scaleY: -1 }],
          }}
        />
      )}

      {data.map((item, index) => (
        <View
          key={index}
          style={[styles.listItem, { width: item.fullWidth ? "100%" : "50%" }]}
        >
          <Text style={styles.label}>{item.subTitle}</Text>
          <Text style={styles.value}>{item.value || "-"}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    //backgroundColor: COLORS.primaryBackground,
    width: "100%",
    marginBottom: "10rem",
    padding: "10rem",
    flexDirection: "row",
    //alignItems: "center",
    borderRadius: 5,
    backgroundColor: COLORS.cardBackground,
    flexWrap: "wrap",
    marginVertical: "10rem",
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
    color: COLORS.gray,
    marginBottom: "2rem",
  },
  value: {
    ...FONTS.body4,
    color: COLORS.black,
  },
  text: { paddingLeft: "10rem", ...FONTS.body5, color: COLORS.gray, flex: 1 },
});

export default DetailsCard;
