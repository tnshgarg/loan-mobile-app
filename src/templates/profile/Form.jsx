import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, View, BackHandler, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addAltMobile,
  addQualification,
  addEmail,
  addMotherName,
  addMaritalStatus,
  addProfileComplete,
} from "../../store/slices/profileSlice";
import { putBackendData } from "../../services/employees/employeeServices";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { form, styles } from "../../styles";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import FormInput from "../../components/atoms/FormInput";
import DropDownForm from "../../components/molecules/DropDownForm";
import Analytics from "appcenter-analytics";
import { showToast } from "../../components/atoms/Toast";

const ProfileFormTemplate = ({ type }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [next, setNext] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validAltMobile, setValidAltMobile] = useState(false);

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
  const campaignId = useSelector(
    (state) => state.campaign.onboardingCampaignId
  );

  const aadhaarVerifyStatus = useSelector(
    (state) => state.aadhaar.verifyStatus
  );
  const panVerifyStatus = useSelector((state) => state.pan.verifyStatus);
  const bankVerifyStatus = useSelector((state) => state.bank.verifyStatus);

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
    if (
      maritalStatus &&
      qualification &&
      motherName &&
      validEmail &&
      validAltMobile
    ) {
      setNext(true);
    } else {
      setNext(false);
    }
  }, [maritalStatus, qualification, motherName, validEmail, validAltMobile]);

  const handleConditionalNav = () => {
    if (aadhaarVerifyStatus != "SUCCESS") {
      navigation.navigate("KYC", {
        screen: "AADHAAR",
      });
    } else if (panVerifyStatus != "SUCCESS") {
      navigation.navigate("KYC", {
        screen: "PAN",
      });
    } else if (bankVerifyStatus != "SUCCESS") {
      navigation.navigate("KYC", {
        screen: "BANK",
      });
    }
  };

  const backendPush = async () => {
    const body = {
      unipeEmployeeId: unipeEmployeeId,
      maritalStatus: maritalStatus,
      qualification: qualification,
      altMobile: altMobile,
      email: email,
      motherName: motherName,
      campaignId: campaignId,
    };

    const response = await putBackendData({
      data: body,
      xpath: "profile",
      token: token,
    });
    const responseJson = response?.data;

    if (responseJson.status === 200) {
      dispatch(addProfileComplete(true));
      if (type === "KYC") {
        handleConditionalNav();
      } else {
        navigation.navigate("AadhaarForm");
      }
      showToast("Profile Details Updated", "success");
    } else {
      Alert.alert("Error", JSON.stringify(responseJson));
    }
  };

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
      {
        text: "Yes",
        onPress: () => navigation.navigate("EWAStack", { screen: "EWA_OFFER" }),
      },
    ]);
    return true;
  };

  useEffect(() => {
    var emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gm;
    if (emailReg.test(email)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  }, [email]);

  useEffect(() => {
    var phoneno = /^[0-9]{10}$/gm;
    if (phoneno.test(altMobile)) {
      setValidAltMobile(true);
    } else {
      setValidAltMobile(false);
    }
  }, [altMobile]);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer} accessibilityLabel="ProfileForm">
      <Text style={styles.headline}>Tell us about you</Text>
      <Text style={styles.subHeadline}>(अपनी जानकारी यहाँ भरें)</Text>
      <KeyboardAvoidingWrapper>
        <View>
          <DropDownForm
            accessibilityLabel="EducationDropdown"
            placeholder={"Select Education*"}
            value={qualification}
            setValue={setQualification}
            data={qualifications}
          />
          <DropDownForm
            accessibilityLabel="MaritalStatusDropdown"
            placeholder={"Select Maritial Status*"}
            value={maritalStatus}
            setValue={setMaritalStatus}
            data={maritalStatuses}
          />
          <FormInput
            accessibilityLabel="MotherNameInput"
            placeholder={"Mother's Name*"}
            value={motherName}
            onChange={setMotherName}
          />
          <FormInput
            accessibilityLabel="AltPhoneNumberInput"
            placeholder={"Your whatsapp mobile no."}
            autoCompleteType="tel"
            keyboardType="phone-pad"
            value={altMobile}
            onChange={setAltMobile}
          />
          {altMobile && !validAltMobile ? (
            <Text style={form.formatmsg}>Incorrect Format</Text>
          ) : null}
          <FormInput
            accessibilityLabel="EmailAddressInput"
            placeholder={"Your email ID"}
            autoCompleteType="email"
            keyboardType="email-address"
            value={email}
            onChange={setEmail}
          />
          {email && !validEmail ? (
            <Text style={form.formatmsg}>Incorrect Format</Text>
          ) : null}
          <PrimaryButton
            accessibilityLabel={"ProfileBtn"}
            title="Continue"
            disabled={!next}
            onPress={() => {
              backendPush();
              Analytics.trackEvent("ProfileForm|PushData|Success", {
                unipeEmployeeId: unipeEmployeeId,
              });
            }}
          />
        </View>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
};

export default ProfileFormTemplate;
