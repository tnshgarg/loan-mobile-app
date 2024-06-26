import { View, Text } from "react-native";
import { COLORS, FONTS } from "../../constants/Theme";

const DetailItem = ({ label, value, divider }) => {
  return (
    <View style={{ paddingVertical: 10 }}>
      <Text
        accessibilityLabel={`${label} Label`}
        style={{ ...FONTS.body5, color: COLORS.gray }}
      >
        {label}
      </Text>
      {value == "Not Provided" ? (
        <Text
          accessibilityLabel={`${value} Value`}
          style={{
            ...FONTS.h4,
            paddingTop: 5,
            color: COLORS.gray,
          }}
        >
          {value}
        </Text>
      ) : (
        <Text
          accessibilityLabel={`${value} Value`}
          style={{ ...FONTS.body4, paddingTop: 5 }}
        >
          {value}
        </Text>
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
