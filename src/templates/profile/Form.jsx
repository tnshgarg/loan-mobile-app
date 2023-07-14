import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Alert, BackHandler, SafeAreaView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import FormInput from "../../components/atoms/FormInput";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import { showToast } from "../../components/atoms/Toast";
import DropDownForm from "../../components/molecules/DropDownForm";
import Analytics, {
  InteractionTypes,
  trackEvent,
} from "../../helpers/analytics/commonAnalytics";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { form, styles } from "../../styles";

import { strings } from "../../helpers/Localization";
import { KYC_POLLING_DURATION } from "../../services/constants";
import { kycNavigate } from "../../services/kyc/navigation";
import { useGetKycQuery } from "../../store/apiSlices/kycApi";
import { useUpdateProfileMutation } from "../../store/apiSlices/profileApi";

const ProfileFormTemplate = ({ type }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [validEmail, setValidEmail] = useState(false);
  const [validAltMobile, setValidAltMobile] = useState(false);

  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  console.log({ unipeEmployeeId });
  const { data: kycData, isLoading: kycLoading } = useGetKycQuery(
    unipeEmployeeId,
    {
      pollingInterval: KYC_POLLING_DURATION,
    }
  );
  const { profile } = kycData ?? {};
  console.log({ kycData });

  const [maritalStatus, setMaritalStatus] = useState(profile?.maritalStatus);
  const [qualification, setQualification] = useState(profile?.qualification);
  const [altMobile, setAltMobile] = useState(profile?.altMobile);
  const [email, setEmail] = useState(profile?.email);
  const [motherName, setMotherName] = useState(profile?.motherName);
  const [currentAddress, setCurrentAddress] = useState(profile?.currentAddress);
  const campaignId = useSelector(
    (state) => state.campaign.onboardingCampaignId
  );

  const [updateProfile, { isLoading: updateInProgress }] =
    useUpdateProfileMutation();

  useEffect(() => {
    dispatch(addCurrentScreen("ProfileForm"));
  }, []);

  const formFilled =
    maritalStatus &&
    qualification &&
    motherName &&
    validEmail &&
    currentAddress &&
    validAltMobile;

  useEffect(() => {
    if (formFilled) {
      Analytics.trackEvent({
        interaction: InteractionTypes.BUTTON_PRESS,
        screen: "basicInfo",
        action: "COMPLETE",
      });
    }
  }, [formFilled]);

  const handleSubmit = async () => {
    const body = {
      unipeEmployeeId,
      maritalStatus,
      qualification,
      altMobile,
      email,
      motherName,
      currentAddress,
      campaignId,
    };
    console.log({ updatePayload: body });
    updateProfile(body)
      .unwrap()
      .then((response) => {
        console.log({ response });
        Analytics.trackEvent({
          interaction: InteractionTypes.BUTTON_PRESS,
          screen: "basicInfo",
          action: "SUCCESS",
        });
        kycNavigate({ ...kycData, isProfileSuccess: true }, navigation);
        showToast("Profile Details Updated", "success");
      })
      .catch((error) => {
        Analytics.trackEvent({
          interaction: InteractionTypes.BUTTON_PRESS,
          screen: "basicInfo",
          action: "ERROR",
        });
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
        onPress: () => {
          trackEvent({
            interaction: InteractionTypes.SCREEN_OPEN,
            screen: "kycStart",
            action: "BACK",
          });
          navigation.navigate("EWAStack", { screen: "EWA_OFFER" });
        },
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

  useEffect(() => {
    trackEvent({
      interaction: InteractionTypes.SCREEN_OPEN,
      screen: "basicProfile",
      action: "START",
    });
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer} accessibilityLabel="ProfileForm">
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
            accessibilityLabel="CurrentAddressInput"
            placeholder={strings.currentAddressPlaceholder}
            value={currentAddress}
            multiline={true}
            onChange={setCurrentAddress}
          />
          <FormInput
            accessibilityLabel="AltPhoneNumberInput"
            placeholder={strings.whatsappPlaceholder}
            autoCompleteType="tel"
            keyboardType="phone-pad"
            value={altMobile}
            maxLength={10}
            onChange={setAltMobile}
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
            disabled={kycLoading || !formFilled || updateInProgress}
            loading={updateInProgress}
            onPress={() => {
              Analytics.trackEvent({
                interaction: InteractionTypes.BUTTON_PRESS,
                screen: "basicInfo",
                action: "CONTINUE",
              });
              handleSubmit();
            }}
          />
        </View>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
};

export default ProfileFormTemplate;
