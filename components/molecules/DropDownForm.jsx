import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import FormInput from "../atoms/FormInput";
import { Icon, IconButton } from "@react-native-material/core";
import { COLORS, FONTS } from "../../constants/Theme";
import BottomSheetWrapper from "../atoms/BottomSheetWrapper";
import { useState } from "react";
import PrimaryButton from "../PrimaryButton";

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
      <FormInput
        containerStyle={{ ...containerStyle }}
        placeholder={placeholder}
        value={value}
        disabled={true}
        appendComponent={
          <IconButton
            icon={
              <Icon name="keyboard-arrow-down" size={24} color={COLORS.gray} />
            }
            onPress={() => {
              setVisible(true);
            }}
          />
        }
      />
      <BottomSheetWrapper open={visible} setOpen={setVisible}>
        <Text style={styles.header}>{placeholder}</Text>

        {data.map((item, index) => (
          <View style={styles.container}>
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
        <PrimaryButton
          title="Done"
          type="solid"
          uppercase={false}
          color={COLORS.primary}
          disabled={!value}
          onPress={() => {
            setVisible(false);
          }}
        />
      </BottomSheetWrapper>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
  },
  header: {
    ...FONTS.h3,
    marginBottom: 10,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  listText: {
    ...FONTS.h3,
    flex: 1,
    marginLeft: 10,
  },
});

export default DropDownForm;