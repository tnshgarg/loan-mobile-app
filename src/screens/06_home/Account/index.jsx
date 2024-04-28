import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  BackHandler,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import LogoHeader from "../../../components/atoms/LogoHeader";
import LogoutItem from "../../../components/atoms/LogoutItem";
import CmsLoading from "../../../components/cms/CmsLoading";
import CmsRoot from "../../../components/cms/CmsRoot";
import LogoutModal from "../../../components/organisms/LogoutModal";
import { strings } from "../../../helpers/Localization";
import {
  InteractionTypes,
  setSessionValue,
  trackEvent,
} from "../../../helpers/analytics/commonAnalytics";
import {
  CMS_POLLING_DURATION,
  KYC_POLLING_DURATION,
} from "../../../services/constants";
import { useGetCmsQuery } from "../../../store/apiSlices/cmsApi";
import { useGetKycQuery } from "../../../store/apiSlices/kycApi";
import { accountStyles, styles } from "../../../styles";

const AccountMenu = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);

  const { data: kycData, isLoading: kycLoading } = useGetKycQuery(
    unipeEmployeeId,
    {
      pollingInterval: KYC_POLLING_DURATION,
    }
  );
  const { aadhaar, pan, profile } = kycData ?? {};
  const fullName = aadhaar?.data?.name || pan?.data?.name;

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

  const logOutItem = {
    title: strings.logout,
    subtitle: strings.logoutFromUnipe,
    imageUri:
      "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-07-06/circleIcons/logout.png",
    action: () => onLogout(),
  };

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
  console.log({
    accountNavList: JSON.stringify(cmsData?.account_navigation_list),
  });
  return (
    <SafeAreaView style={styles.safeContainer}>
      <LogoHeader
        title={"Account"}
        containerStyle={{ backgroundColor: null }}
      />
      <LogoutModal modalVisible={modalVisible} />
      <ScrollView>
        {/* {!cmsData && cmsLoading ? (
          <CmsLoading />
        ) : (
          <CmsRoot children={DUMMY_RES?.account_top || []}></CmsRoot>
        )} */}
        <View style={accountStyles.imageContainer}>
          <Image
            style={accountStyles.userImage}
            source={{
              uri: `data:image/jpeg;base64,${aadhaar?.data?.["photo_base64"]}`,
            }}
          />
          <View style={{ flexDirection: "column", flex: 1 }}>
            <Text style={accountStyles.userTitle}>{fullName}</Text>
            {/* <Text style={accountStyles.userSubtitle}>Employer</Text> */}
          </View>
        </View>

        {!cmsData && cmsLoading ? (
          <CmsLoading />
        ) : (
          <CmsRoot children={cmsData?.account_navigation_list || []}></CmsRoot>
        )}

        <LogoutItem
          key={logOutItem}
          item={{ ...logOutItem, onPress: () => onPressCard(logOutItem) }}
          showIcon={true}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountMenu;
