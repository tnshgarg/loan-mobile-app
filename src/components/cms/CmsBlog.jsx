import { Image, Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import LinearGradient from "react-native-linear-gradient";
import { COLORS, FONTS } from "../../constants/Theme";
import CollapsibleItem from "../atoms/CollapsibleItem";

const CmsBlog = ({ data, questions }) => {
  console.log("data: ", data);
  return (
    <View style={styles.modalContainer}>
      {data?.map((item, index) => (
        <View
          style={[
            styles.row,
            { flexDirection: item.key % 2 == 0 ? "row-reverse" : "row" },
          ]}
        >
          {item.headingImage && (
            <Image
              style={[
                styles.headingImage,
                item.key % 2 == 0 ? { marginRight: -50 } : { marginLeft: -50 },
              ]}
              source={{ uri: item.headingImage }}
            />
          )}

          <View
            style={[
              styles.col,
              item.key % 2 == 0 ? { marginRight: 30 } : { marginLeft: 30 },
            ]}
          >
            <Text style={styles.title}>{item.heading}</Text>
            <Text style={styles.subtitle}>{item.description}</Text>
          </View>
        </View>
      ))}
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[COLORS.lightGreen, COLORS.lightYellow]}
        style={{
          padding: 15,
          width: "120%",
          marginTop: 30,
          marginBottom: 20,
        }}
      >
        <Text
          style={[
            styles.title,
            { ...FONTS.body4, color: COLORS.gray, marginBottom: 0 },
          ]}
        >
          FAQs
        </Text>
      </LinearGradient>

      {questions ? (
        questions.map((item, index) => (
          <CollapsibleItem
            item={item}
            key={index}
            titleStyle={{ ...FONTS.body3 }}
          />
        ))
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = EStyleSheet.create({
  modalContainer: {
    backgroundColor: "$white",
    flex: 1,
    flexDirection: "column",
    marginBottom: "20rem",
    padding: 0,
  },
  headingImage: {
    height: "120rem",
    width: "120rem",
    // marginRight: "15rem",
    resizeMode: "contain",
  },
  title: {
    ...FONTS.body3,
    color: COLORS.secondary,
    marginBottom: 5,
  },
  subtitle: {
    ...FONTS.body4,
    color: COLORS.secondary,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginBottom: "15rem",
    padding: "15rem",
  },
  col: { flexDirection: "column", flex: 1 },
  pointsContainer: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: "20rem",
    marginBottom: "10rem",
  },
  pointsTitle: {
    ...FONTS.body3,
    color: COLORS.secondary,
    textAlign: "center",
    width: "80%",
    alignSelf: "center",
    marginTop: "10rem",
  },
  flexCenter: { flex: 1, alignItems: "center", justifyContent: "flex-start" },
  btnContainer: {
    paddingHorizontal: "15rem",
    paddingVertical: "10rem",
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderColor: COLORS.lightGray,
  },
  // stepImage: { height: "180rem", width: "100%", marginVertical: "10rem" },
});

export default CmsBlog;
