import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
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
import PrimaryButton from "../../components/PrimaryButton";
import FormInput from "../../components/atoms/FormInput";
import DropDownForm from "../../components/molecules/DropDownForm";
import Analytics from "appcenter-analytics";
import Header from "../../components/atoms/Header";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [backendPush, setBackendPush] = useState(false);

  const [next, setNext] = useState(false);
  const id = useSelector((state) => state.auth.id);
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
        id: id,
        maritalStatus: maritalStatus,
        qualification: qualification,
        altMobile: altMobile,
        email: email,
        motherName: motherName,
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

  return (
    <>
      <SafeAreaView style={[styles.container, { padding: 0 }]}>
        <Header
          title="Setup Profile"
          onLeftIconPress={() => navigation.navigate("Login")}
        />
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
                  userId: id,
                });
                navigation.navigate("AadhaarForm");
              }}
            />
          </View>
        </KeyboardAvoidingWrapper>
      </SafeAreaView>
    </>
  );
};

export default ProfileForm;