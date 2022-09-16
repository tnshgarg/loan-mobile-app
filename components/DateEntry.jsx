import React, { useState, useRef, useEffect } from "react";
import { Text, TextInput, View } from "react-native";
import { form } from "../styles";
export default DateEntry = (props) => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const months = useRef();
  const years = useRef();

  useEffect(() => {
    if (day.length === 2) {
      months.current.focus();
    }
  }, [day]);

  useEffect(() => {
    if (month.length === 2) {
      years.current.focus();
    }
  }, [month]);

  useEffect(() => {
    props.setval(`${year}-${month}-${day}`);
  }, [year, month, day]);

  return (
    <>
      <Text style={form.formLabel}>{props.title}</Text>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={form.year}
          maxLength={2}
          keyboardType="numeric"
          autoCompleteType="birthdate-day"
          value={day}
          onChangeText={setDay}
          placeholder="DD"
        />
        <View style={form.hypenView}>
          <Text style={form.hypen}>-</Text>
        </View>
        <TextInput
          style={form.monthday}
          maxLength={2}
          keyboardType="numeric"
          value={month}
          autoCompleteType="birthdate-month"
          onChangeText={setMonth}
          ref={months}
          placeholder="MM"
        />
        <View style={{ width: 30, alignSelf: "center" }}>
          <Text style={{ alignSelf: "center", fontSize: 30 }}>-</Text>
        </View>
        <TextInput
          style={form.monthday}
          maxLength={4}
          keyboardType="numeric"
          value={year}
          autoCompleteType="birthdate-year"
          onChangeText={setYear}
          ref={years}
          placeholder="YYYY"
        />
      </View>
    </>
  );
};
