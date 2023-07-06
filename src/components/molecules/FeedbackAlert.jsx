import React, { useEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, FONTS } from "../../constants/Theme";
import {
  setSessionValue
} from "../../helpers/analytics/commonAnalytics";
import BottomSheetWrapper from "../atoms/BottomSheetWrapper";
import PrimaryButton from "../atoms/PrimaryButton";
import Rating from "../atoms/Rating";

const FeedbackAlert = ({
  // rating,
  // setRating,
  ratingHook,
  category,
  setCategory,
  data,
  onSubmit,
}) => {
  const [visible, setVisible] = useState(true);
  const [rating, setRating] = ratingHook || [];

  useEffect(() => {
    setSessionValue("flow", "feedback");
  }, []);

  return (
    <BottomSheetWrapper open={visible} setOpen={setVisible}>
      <Text style={styles.header}>Rate your experience</Text>
      <Rating value={rating} setValue={setRating} />
      <Text style={styles.header}>
        Tell us the purpose of your EWA withdrawal
      </Text>
      <ScrollView>
        {data.map((item, index) => (
          <View
            accessibilityLabel="Dropdown"
            style={styles.container}
            key={item}
          >
            <TouchableOpacity
              style={styles.listItem}
              activeOpacity={0.7}
              onPress={() => setCategory(item)}
              accessibilityLabel={data[1]}
            >
              <MaterialCommunityIcons
                name={category == item ? "radiobox-marked" : "radiobox-blank"}
                size={24}
                color={category == item ? COLORS.primary : COLORS.gray}
              />
              <Text style={styles.listText}>{item}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <PrimaryButton
        title="Submit"
        disabled={category?.length == 0 || rating == 0}
        containerStyle={{ marginBottom: Platform.OS === "ios" ? 20 : 0 }}
        onPress={() => {
          setVisible(false);
          onSubmit();
        }}
      />
    </BottomSheetWrapper>
  );
};

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
  },
  header: {
    ...FONTS.body2,
    marginVertical: "10rem",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: "10rem",
  },
  listText: {
    ...FONTS.body3,
    flex: 1,
    marginLeft: "10rem",
  },
});

export default FeedbackAlert;
