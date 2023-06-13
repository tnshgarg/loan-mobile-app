import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, View, BackHandler, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { form, styles } from "../../styles";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import FormInput from "../../components/atoms/FormInput";
import DropDownForm from "../../components/molecules/DropDownForm";
import analytics from "@react-native-firebase/analytics";
import { showToast } from "../../components/atoms/Toast";

import { useUpdateProfileMutation } from "../../store/apiSlices/profileApi";
import { COLORS, FONTS } from "../../constants/Theme";
import { useGetKycQuery } from "../../store/apiSlices/kycApi";

const ProfileFormTemplate = ({ type }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [next, setNext] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validAltMobile, setValidAltMobile] = useState(false);

  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  console.log({ unipeEmployeeId });
  const { data: kycData } = useGetKycQuery(unipeEmployeeId, {
    pollingInterval: 1000 * 60 * 60 * 24,
  });
  const {
    isAadhaarSuccess,
    isPanSuccess,
    isBankSuccess,
    isProfileSuccess,
    profile,
    aadhaar,
    pan,
    bank,
  } = kycData ?? {};
  console.log({ kycData });

  const [maritalStatus, setMaritalStatus] = useState(profile?.maritalStatus);
  const [qualification, setQualification] = useState(profile?.qualification);
  const [altMobile, setAltMobile] = useState(profile?.altMobile);
  const [email, setEmail] = useState(profile?.email);
  const [motherName, setMotherName] = useState(profile?.motherName);
  const campaignId = useSelector(
    (state) => state.campaign.onboardingCampaignId
  );

  const [updateProfile] = useUpdateProfileMutation();

  useEffect(() => {
    dispatch(addCurrentScreen("ProfileForm"));
  }, []);

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
    if (aadhaar.verifyStatus != "SUCCESS") {
      navigation.navigate("KYC", {
        screen: "AADHAAR",
      });
    } else if (pan.verifyStatus != "SUCCESS") {
      navigation.navigate("KYC", {
        screen: "PAN",
      });
    } else if (bank.verifyStatus != "SUCCESS") {
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

    updateProfile(body)
      .unwrap()
      .then((response) => {
        if (type === "KYC") {
          handleConditionalNav();
        } else {
          navigation.navigate("AadhaarForm");
        }
        showToast("Profile Details Updated", "success");
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
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
    let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/gm;
    if (emailReg.test(email)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  }, [email]);

  useEffect(() => {
    let phoneno = /^\d{10}$/gm;
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
      <KeyboardAvoidingWrapper>
        <View>
          <DropDownForm
            accessibilityLabel="EducationDropdown"
            placeholder={"Education*"}
            value={qualification}
            setValue={setQualification}
            data={qualifications}
          />
          <DropDownForm
            accessibilityLabel="MaritalStatusDropdown"
            placeholder={"Maritial Status*"}
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
            placeholder={"Whatsapp no."}
            autoCompleteType="tel"
            keyboardType="phone-pad"
            value={altMobile}
            maxLength={10}
            onChange={setAltMobile}
            errorMsg={
              altMobile && !validAltMobile && !validAltMobile
                ? "Incorrect Format"
                : ""
            }
            appendComponent={
              <Text style={{ ...FONTS.body5, color: COLORS.gray }}>
                {altMobile?.length}/10
              </Text>
            }
          />

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
              analytics().logEvent("ProfileForm_PushData_Success", {
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
