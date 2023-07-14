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
import { InteractionTypes, setSessionValue, trackEvent } from "../../../helpers/analytics/commonAnalytics";
import {
  CMS_POLLING_DURATION
} from "../../../services/constants";
import { useGetCmsQuery } from "../../../store/apiSlices/cmsApi";
import { styles } from "../../../styles";

const AccountMenu = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [isPrivacyModalVisible, setIsPrivacyModalVisible] = useState(false);
  const [isTermsOfUseModalVisible, setIsTermsOfUseModalVisible] =
    useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);

  useEffect(() => {
    trackEvent({
      interaction: InteractionTypes.BUTTON_PRESS,
      screen: "account",
      action: "START",
    });
  }, []);

  const backAction = () => {
    trackEvent({
      interaction: InteractionTypes.BUTTON_PRESS,
      screen: "account",
      action: "BACK",
    });
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
    setModalVisible(true);
    setTimeout(() => {
      dispatch({ type: "LOGOUT" });
      setModalVisible(false);
      navigation.replace("OnboardingStack", { screen: "Login" });
    }, 2000);
  };

  useEffect(() => {
    setSessionValue("flow", "account");
  }, []);

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
      <LogoutModal modalVisible={modalVisible} />
      <ScrollView>
        {!cmsData && cmsLoading ? (
          <CmsLoading />
        ) : (
          <CmsRoot children={cmsData?.account_top || []}></CmsRoot>
        )}

        {!cmsData && cmsLoading ? (
          <CmsLoading />
        ) : (
          <CmsRoot
            children={cmsData?.account_navigation_list || []}
          ></CmsRoot>
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
    </SafeAreaView>
  );
};

export default AccountMenu;
