import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import FormInput from "../atoms/FormInput";
import { Icon, IconButton } from "@react-native-material/core";
import { COLORS, FONTS } from "../../constants/Theme";
import BottomSheetWrapper from "../atoms/BottomSheetWrapper";
import { useState } from "react";
import PrimaryButton from "../atoms/PrimaryButton";

const DropDownForm = ({
  data,
  containerStyle,
  value,
  setValue,
  placeholder,
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          setVisible(true);
        }}
      >
        <FormInput
          containerStyle={{ ...containerStyle }}
          placeholder={placeholder}
          value={value}
          disabled={true}
          appendComponent={
            <Icon name="keyboard-arrow-down" size={24} color={COLORS.gray} />
          }
        />
      </TouchableOpacity>

      <BottomSheetWrapper open={visible} setOpen={setVisible}>
        <Text style={styles.header}>{placeholder}</Text>
        <ScrollView>
          {data.map((item, index) => (
            <View style={styles.container} key={item}>
              <TouchableOpacity
                style={styles.listItem}
                activeOpacity={0.7}
                onPress={() => setValue(item)}
              >
                <Icon
                  name={
                    value == item
                      ? "radio-button-checked"
                      : "radio-button-unchecked"
                  }
                  size={24}
                  color={value == item ? COLORS.primary : COLORS.gray}
                />
                <Text style={styles.listText}>{item}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <PrimaryButton
          title="Done"
          disabled={!value}
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
    paddingVertical: "15rem",
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
