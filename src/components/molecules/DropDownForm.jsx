import React, { useState } from "react";
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
import BottomSheetWrapper from "../atoms/BottomSheetWrapper";
import FormInput from "../atoms/FormInput";
import PrimaryButton from "../atoms/PrimaryButton";

const DropDownForm = ({
  data,
  containerStyle,
  value,
  setValue,
  placeholder,
  accessibilityLabel,
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setVisible(true);
        }}
      >
        <FormInput
          containerStyle={{ ...containerStyle }}
          placeholder={placeholder}
          value={value}
          accessibilityLabel={accessibilityLabel}
          disabled={true}
          appendComponent={
            <MaterialCommunityIcons
              name="chevron-down"
              size={28}
              color={COLORS.gray}
            />
          }
        />
      </TouchableOpacity>

      <BottomSheetWrapper open={visible} setOpen={setVisible}>
        <Text style={styles.header}>{placeholder}</Text>
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
                onPress={() => setValue(item)}
                accessibilityLabel={data[1]}
              >
                <MaterialCommunityIcons
                  name={value == item ? "radiobox-marked" : "radiobox-blank"}
                  size={24}
                  color={value == item ? COLORS.primary : COLORS.gray}
                />
                <Text style={styles.listText}>{item}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <PrimaryButton
          accessibilityLabel={"DropdownBtn"}
          title="Done"
          disabled={!value}
          containerStyle={{ marginBottom: Platform.OS === "ios" ? 20 : 0 }}
          onPress={() => {
            setVisible(false);
          }}
        />
      </BottomSheetWrapper>
    </>
  );
};

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
  },
  header: {
    ...FONTS.h3,
    marginBottom: "10rem",
    alignSelf: "center",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: "10rem",
    borderBottomWidth: 1.5,
    borderColor: COLORS.lightgray_01,
  },
  listText: {
    ...FONTS.body3,
    flex: 1,
    marginLeft: "10rem",
  },
});

export default DropDownForm;
