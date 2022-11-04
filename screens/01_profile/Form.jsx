import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, View, BackHandler, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProgressBarTop from "../../navigators/ProgressBarTop";
import {
  addAltMobile,
  addQualification,
  addEmail,
  addMotherName,
  addMaritalStatus,
} from "../../store/slices/profileSlice";
import { profileBackendPush } from "../../helpers/BackendPush";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { form, styles } from "../../styles";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import FormInput from "../../components/atoms/FormInput";
import DropDownForm from "../../components/molecules/DropDownForm";
import Analytics from "appcenter-analytics";
import Header from "../../components/atoms/Header";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [next, setNext] = useState(false);
  const [backendPush, setBackendPush] = useState(false);

  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const token = useSelector((state) => state.auth.token);
  const profileSlice = useSelector((state) => state.profile);
  const [maritalStatus, setMaritalStatus] = useState(
    profileSlice?.maritalStatus
  );
  const [qualification, setQualification] = useState(
    profileSlice?.qualification
  );
  const [altMobile, setAltMobile] = useState(profileSlice?.altMobile);
  const [email, setEmail] = useState(profileSlice?.email);
  const [motherName, setMotherName] = useState(profileSlice?.motherName);

  useEffect(() => {
    dispatch(addCurrentScreen("ProfileForm"));
  }, []);

  useEffect(() => {
    dispatch(addMaritalStatus(maritalStatus));
  }, [maritalStatus]);

  useEffect(() => {
    dispatch(addQualification(qualification));
  }, [qualification]);

  useEffect(() => {
    dispatch(addMotherName(motherName));
  }, [motherName]);

  useEffect(() => {
    dispatch(addAltMobile(altMobile));
  }, [altMobile]);

  useEffect(() => {
    dispatch(addEmail(email));
  }, [email]);

  useEffect(() => {
    if (maritalStatus && qualification && motherName && email) {
      setNext(true);
    } else {
      setNext(false);
    }
  }, [maritalStatus, qualification, motherName, email]);

  useEffect(() => {
    console.log("ProfileForm profileSlice: ", profileSlice);
    if (backendPush) {
      profileBackendPush({
        data: {
          unipeEmployeeId: unipeEmployeeId,
          maritalStatus: maritalStatus,
          qualification: qualification,
          altMobile: altMobile,
          email: email,
          motherName: motherName,
        },
        token: token,
      });
      setBackendPush(false);
    }
  }, [backendPush]);

  const qualifications = [
    "10th Pass",
    "12th Pass",
    "Graduate",
    "Post Graduate",
    "None of the Above",
  ];

  const maritalStatuses = ["Unmarried", "Married"];

  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      { text: "No", onPress: () => null, style: "cancel" },
      { text: "Yes", onPress: () => navigation.navigate("Welcome") },
    ]);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header title="Setup Profile" onLeftIconPress={() => backAction()} />

      <ProgressBarTop step={0} />
      <Text style={form.formHeader}>Employee basic details</Text>
      <KeyboardAvoidingWrapper>
        <View>
          <DropDownForm
            placeholder={"Select Education*"}
            containerStyle={{ marginVertical: 10 }}
            value={qualification}
            setValue={setQualification}
            data={qualifications}
          />
          <DropDownForm
            placeholder={"Select Maritial Status*"}
            containerStyle={{ marginVertical: 10 }}
            value={maritalStatus}
            setValue={setMaritalStatus}
            data={maritalStatuses}
          />
          <FormInput
            placeholder={"Mother's Name*"}
            containerStyle={{ marginVertical: 10 }}
            value={motherName}
            onChange={setMotherName}
          />
          <FormInput
            placeholder={"Alternate Phone Number"}
            containerStyle={{ marginVertical: 10 }}
            autoCompleteType="tel"
            keyboardType="phone-pad"
            value={altMobile}
            onChange={setAltMobile}
          />
          <FormInput
            placeholder={"Email Address"}
            containerStyle={{ marginVertical: 10 }}
            autoCompleteType="email"
            keyboardType="email-address"
            value={email}
            onChange={setEmail}
          />
          <PrimaryButton
            title="Continue"
            disabled={!next}
            onPress={() => {
              setBackendPush(true);
              Analytics.trackEvent("ProfileForm|PushData|Success", {
                unipeEmployeeId: unipeEmployeeId,
              });
              navigation.navigate("AadhaarForm");
            }}
          />
        </View>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
};

export default ProfileForm;
