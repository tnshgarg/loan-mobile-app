import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Alert, BackHandler, SafeAreaView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import FormInput from "../../components/atoms/FormInput";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import { showToast } from "../../components/atoms/Toast";
import DropDownForm from "../../components/molecules/DropDownForm";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { form, styles } from "../../styles";
import Analytics, {
  InteractionTypes,
} from "../../helpers/analytics/commonAnalytics";
import { useUpdateProfileMutation } from "../../store/apiSlices/profileApi";
import { strings } from "../../helpers/Localization";
const ProfileFormTemplate = ({ type }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [next, setNext] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validAltMobile, setValidAltMobile] = useState(false);

  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
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
    Alert.alert(strings.holdOn, strings.goBack, [
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
      <Text style={styles.headline}>Tell us about you</Text>
      <Text style={styles.subHeadline}>(अपनी जानकारी यहाँ भरें)</Text>
      <KeyboardAvoidingWrapper>
        <View>
          <DropDownForm
            accessibilityLabel="EducationDropdown"
            placeholder={strings.educationPlaceholder}
            value={qualification}
            setValue={setQualification}
            data={qualifications}
          />
          <DropDownForm
            accessibilityLabel="MaritalStatusDropdown"
            placeholder={strings.maritalStatusPlaceholder}
            value={maritalStatus}
            setValue={setMaritalStatus}
            data={maritalStatuses}
          />
          <FormInput
            accessibilityLabel="MotherNameInput"
            placeholder={strings.motherNamePlaceholder}
            value={motherName}
            onChange={setMotherName}
          />
          <FormInput
            accessibilityLabel="AltPhoneNumberInput"
            placeholder={strings.whatsappPlaceholder}
            autoCompleteType="tel"
            keyboardType="phone-pad"
            value={altMobile}
            onChange={setAltMobile}
            maxLength={10}
          />
          {altMobile && !validAltMobile ? (
            <Text style={form.formatmsg}>{strings.incorrectFormat}</Text>
          ) : null}
          <FormInput
            accessibilityLabel="EmailAddressInput"
            placeholder={strings.emailPlaceholder}
            autoCompleteType="email"
            keyboardType="email-address"
            value={email}
            onChange={setEmail}
          />
          {email && !validEmail ? (
            <Text style={form.formatmsg}>{strings.incorrectFormat}</Text>
          ) : null}
          <PrimaryButton
            accessibilityLabel={"ProfileBtn"}
            title={strings.continue}
            disabled={!next}
            onPress={() => {
              backendPush();
              Analytics.trackEvent({
                interaction: InteractionTypes.BUTTON_PRESS,
                component: "ProfileForm",
                action: "PushData",
                status: "Success",
              });
            }}
          />
        </View>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
};

export default ProfileFormTemplate;
