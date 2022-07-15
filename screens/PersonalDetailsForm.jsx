import { AppBar, Button, Icon, IconButton } from "@react-native-material/core";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProgressBarTop from "../components/ProgressBarTop";
import { addProfile } from "../store/slices/profileSlice";
import { bankform, form, styles } from "./styles";

export default PersonalDetailsForm = () => {
  const educationalQualifications = [
    "10th Pass",
    "12th Pass",
    "Graduate",
    "Post Graduate",
    "None of the Above",
  ];
  const maritalStatuses = ["Unmarried", "Married"];
  const [maritalStatus, setMaritalStatus] = useState(useSelector((state) => state.profile.profile["maritalStatus"]));
  const [educationalQualification, setEducationallQualification] = useState(useSelector((state) => state.profile.profile["education"]));
  const [alternatePhone, setAlternatePhone] = useState(useSelector((state) => state.profile.profile["altnum"]));
  const [email, setEmail] = useState(useSelector((state) => state.profile.profile["email"]));
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const onFinish = () => {
    dispatch(
      addProfile({
        maritalStatus: maritalStatus,
        education: educationalQualification,
        altnum: alternatePhone,
        email: email,
      })
    );
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <AppBar
          title="Setup Profile"
          color="#4E46F1"
          leading={
            <IconButton
              icon={<Icon name="arrow-back" size={20} color="white" />}
              onPress={() => navigation.goBack()}
            />
          }
        />

        <ProgressBarTop step={4} />
        <Text style={form.formHeader}>Employee basic details</Text>
        <ScrollView keyboardShouldPersistTaps="handled">
          <Text style={form.formLabel}>Select Education*</Text>
          <Picker
            selectedValue={educationalQualification}
            style={form.picker}
            onValueChange={(itemValue) =>
              setEducationallQualification(itemValue)
            }
            prompt="Educational Qualification"
          >
            {educationalQualifications.map((item, index) => {
              return <Picker.Item label={item} value={item} />;
            })}
          </Picker>
          <Text style={form.formLabel}>Marital Status*</Text>
          <View style={styles.flexrow}>
            {maritalStatuses.map((item, index) => {
              return (
                <Button
                  key={index}
                  uppercase={false}
                  style={
                    maritalStatus == item
                      ? form.chosenButton
                      : form.choiceButton
                  }
                  title={item}
                  type="solid"
                  color="#4E46F1"
                  onPress={() => setMaritalStatus(item)}
                />
              );
            })}
          </View>
          <Text style={form.formLabel}>Enter your alternate mobile number</Text>
          <TextInput
            style={styles.textInput}
            value={alternatePhone}
            onChangeText={setAlternatePhone}
            autoCompleteType="tel"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            required
            placeholder="XXXXXXXXXX"
          />
          <Text style={form.formLabel}>Enter your Email ID</Text>
          <TextInput
            style={form.formTextInput}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter Email"
            required
          />

          <Button
            title="Continue"
            type="solid"
            uppercase={false}
            style={form.nextButton}
            color="#4E46F1"
            onPress={() => {
              onFinish();
              navigation.navigate("PersonalImage");
            }}
          />
          <View style={bankform.padding}></View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
