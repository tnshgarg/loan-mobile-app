import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { BackHandler, SafeAreaView, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import LogoHeader from "../../../components/atoms/LogoHeader";
import LogoutItem from "../../../components/atoms/LogoutItem";
import CmsLoading from "../../../components/cms/CmsLoading";
import CmsRoot from "../../../components/cms/CmsRoot";
import TermsAndPrivacyModal from "../../../components/molecules/TermsAndPrivacyModal";
import LogoutModal from "../../../components/organisms/LogoutModal";
import { strings } from "../../../helpers/Localization";
import {
  CMS_POLLING_DURATION,
  KYC_POLLING_DURATION,
} from "../../../services/constants";
import { useGetCmsQuery } from "../../../store/apiSlices/cmsApi";
import { useGetKycQuery } from "../../../store/apiSlices/kycApi";
import { styles } from "../../../styles";

const AccountMenu = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [isPrivacyModalVisible, setIsPrivacyModalVisible] = useState(false);
  const [isTermsOfUseModalVisible, setIsTermsOfUseModalVisible] =
    useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [kycCompleted, setKycCompleted] = useState(false);

  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const { data: kycData } = useGetKycQuery(unipeEmployeeId, {
    pollingInterval: KYC_POLLING_DURATION,
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

  useEffect(() => {
    if (isAadhaarSuccess && isPanSuccess && isBankSuccess && isProfileSuccess) {
      setKycCompleted(true);
    }
  }, [isAadhaarSuccess, isPanSuccess, isBankSuccess, isProfileSuccess]);

  const backAction = () => {
    navigation.navigate("HomeStack", {
      screen: "Money",
    });
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const onLogout = () => {
    dispatch({ type: "LOGOUT" });
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
      navigation.navigate("OnboardingStack", { screen: "Login" });
    }, 5000);
  };

  const options = [
    {
      title: strings.logout,
      subtitle: strings.logoutFromUnipe,
      imageUri:
        "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-07-06/circleIcons/logout.png",
      action: () => onLogout(),
    },
  ];

  const onPressCard = ({ route, action }) => {
    console.log({ route });
    if (route) props.navigation.navigate(route.stack, { screen: route.screen });
    else action();
  };

  const { data: cmsData, isLoading: cmsLoading } = useGetCmsQuery(
    unipeEmployeeId,
    {
      pollingInterval: CMS_POLLING_DURATION,
    }
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LogoHeader
        title={"Account"}
        containerStyle={{ backgroundColor: null }}
      />
      <ScrollView>
        {!cmsData && cmsLoading ? (
          <CmsLoading />
        ) : (
          <CmsRoot children={cmsData?.account_top || []}></CmsRoot>
        )}

        {!cmsData && cmsLoading ? (
          <CmsLoading />
        ) : (
          <CmsRoot children={cmsData?.account_navigation_list || []}></CmsRoot>
        )}

        {options.map((item, index) => (
          <LogoutItem
            key={index}
            item={{ ...item, onPress: () => onPressCard(item) }}
            showIcon={true}
          />
        ))}
      </ScrollView>
      {isTermsOfUseModalVisible && (
        <TermsAndPrivacyModal
          isVisible={isTermsOfUseModalVisible}
          setIsVisible={setIsTermsOfUseModalVisible}
          data={termsOfUse}
        />
      )}
      {isPrivacyModalVisible && (
        <TermsAndPrivacyModal
          isVisible={isPrivacyModalVisible}
          setIsVisible={setIsPrivacyModalVisible}
          data={privacyPolicy}
        />
      )}
      {modalVisible && <LogoutModal modalVisible={modalVisible} />}
    </SafeAreaView>
  );
};

export default AccountMenu;
