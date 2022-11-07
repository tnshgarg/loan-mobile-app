import { View, Text } from "react-native";
import { COLORS, FONTS } from "../../constants/Theme";

const DetailItem = ({ label, value, divider }) => {
  return (
    <View style={{ paddingVertical: 10 }}>
      <Text style={{ ...FONTS.h4, fontWeight: "bold" }}>{label}</Text>
      {value == "Not Provided" ? (
        <Text
          style={{
            ...FONTS.h5,
            paddingVertical: 5,
            color: COLORS.gray,
          }}
        >
          {value}
        </Text>
      ) : (
        <Text style={{ ...FONTS.body4, paddingTop: 8 }}>{value}</Text>
      )}
      {divider && (
        <View
          style={{
            width: "100%",
            height: 1,
            backgroundColor: "lightgray",
            marginTop: 10,
          }}
        />
      )}
    </View>
  );
};

export default DetailItem;
