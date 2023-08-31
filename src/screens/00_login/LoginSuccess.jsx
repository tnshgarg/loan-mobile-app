import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Alert, BackHandler, SafeAreaView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CmsLoading from "../../components/cms/CmsLoading";
import CmsRoot from "../../components/cms/CmsRoot";
import LogoHeaderBack from "../../components/molecules/LogoHeaderBack";
import { navigationHelper } from "../../helpers/CmsNavigationHelper";
import {
  InteractionTypes,
  trackEvent,
} from "../../helpers/analytics/commonAnalytics";
import { CMS_POLLING_DURATION } from "../../services/constants";
import { useGetCmsQuery } from "../../store/apiSlices/cmsApi";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { styles } from "../../styles";

const LoginSuccess = () => {
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    trackEvent({
      interaction: InteractionTypes.SCREEN_OPEN,
      screen: "welcome",
      action: "START",
    });
    dispatch(addCurrentScreen("LoginSuccess"));
  }, []);

  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to Logout?", [
      { text: "No", onPress: () => null, style: "cancel" },
      {
        text: "Yes",
        onPress: () => {
          trackEvent({
            interaction: InteractionTypes.BUTTON_PRESS,
            screen: "welcome",
            action: "BACK",
          });
          navigation.navigate("Login");
        },
      },
    ]);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const {
    data: cmsData,
    isLoading: cmsLoading,
    isFetching: cmsFetching
    isError: cmsError,
  } = useGetCmsQuery(unipeEmployeeId, {
    pollingInterval: CMS_POLLING_DURATION,
  });
  console.log({ cmsError, cmsData });
  return (
    <SafeAreaView accessibilityLabel="WelcomePage" style={styles.safeContainer}>
      <LogoHeaderBack
        containerStyle={{ backgroundColor: "#223240" }}
        hideLogo={true}
        onRightIconPress={() => {
          trackEvent({
            interaction: InteractionTypes.SCREEN_OPEN,
            screen: "welcome",
            action: "HELP",
          });
          navigationHelper({
            type: "cms",
            params: { blogKey: "kyc_help" },
          });
        }}
      />
      {!cmsData && (cmsLoading || cmsFetching) ? (
        <CmsLoading />
      ) : (
        <View style={{ flex: 1 }}>
          <CmsRoot children={cmsData?.login_success?.data || []}></CmsRoot>
        </View>
      )}
    </SafeAreaView>
  );
};

export default LoginSuccess;
