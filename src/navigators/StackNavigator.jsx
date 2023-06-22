import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";

import { STAGE } from "@env";
import { useEffect, useState } from "react";
import OfflineAlert from "../components/organisms/OfflineAlert";
// import DevMenu from "../screens/DevMenu";
import EWAStack from "./stacks/EWAStack";
import OnboardingStack from "./stacks/OnboardingStack";

import { useNavigation } from "@react-navigation/core";
import { Linking } from "react-native";
import LogoutModal from "../components/organisms/LogoutModal";
import { changeLanguage } from "../helpers/Localization";
import Analytics, {
  InteractionTypes,
} from "../helpers/analytics/commonAnalytics";
import LearnWithUs from "../screens/06_home/LearnWithUs";
import BackendSync from "../screens/BackendSync";
import CmsScreen from "../screens/CmsScreen";
import DevMenu from "../screens/DevMenu";
import KycProgress from "../screens/KycProgress";
import KycSuccess from "../screens/KycSuccess";
import SplashScreen from "../screens/SplashScreen";
import { handleCampaignNavigation } from "../services/campaign/campaignNavigation";
import { setCampaignStoreData } from "../services/campaign/storeManagement";
import { parseUrl } from "../services/campaign/urlParsing";
import { setPendingUrl } from "../store/slices/pendingCampaignClickSlice";
import { store } from "../store/store";
import BottomTabNav from "./BottomTabNav";
import AccountStack from "./stacks/AccountStack";
import BenefitsStack from "./stacks/BenefitsStack";
import CmsStack from "./stacks/CmsStack";
import InvestStack from "./stacks/InvestStack";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  var initialRoute = useSelector((state) => state.navigation.currentStack);
  const token = useSelector((state) => state.auth?.token);
  const onboarded = useSelector((state) => state.auth.onboarded);
  var initialScreen = useSelector((state) => state.navigation.currentScreen);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    changeLanguage(store.getState().localization.language);
  }, []);

  const handleCampaignUrlClick = (url) => {
    // Alert.alert("Url",`${url}`)
    Analytics.setSessionValue("campaignClick", url);
    if (!token) {
      console.error("Token is not present");
      Analytics.trackEvent({
        interaction: InteractionTypes.CAMPAIGN_URL,
        component: "STACK_NAVIGATOR",
        action: "campaign_url_open",
        status: "WAITING_LOGIN",
        error: "user token is not present",
      });
      dispatch(setPendingUrl(url));
      return;
    }

    try {
      const { campaignId, campaignScreen, campaignType } = parseUrl(url);
      setCampaignStoreData({ campaignType, campaignId });
      handleCampaignNavigation(
        campaignType,
        campaignScreen,
        navigation,
        { stack: initialRoute, screen: initialScreen },
        onboarded
      );
      Analytics.trackEvent({
        interaction: InteractionTypes.CAMPAIGN_URL,
        component: "STACK_NAVIGATOR",
        action: "campaign_url_open",
        status: "SUCCESS",
      });
    } catch (err) {
      Analytics.trackEvent({
        interaction: InteractionTypes.CAMPAIGN_URL,
        component: "STACK_NAVIGATOR",
        action: "campaign_url_open",
        status: "ERROR",
        error: JSON.stringify({ message: err.message, stack: err.stack }),
      });
      console.error(err);
    }
  };
  useEffect(() => {
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleCampaignUrlClick(url);
      }
    });
    const subscription = Linking.addEventListener("url", ({ url }) => {
      handleCampaignUrlClick(url);
    });
    return () => {
      subscription.remove();
    };
  }, []);
  console.log("STAGE: ", STAGE);
  console.log("initialRoute: ", initialRoute);
  console.log("currentScreen: ", initialScreen);
  let devMenu = null;
  if (STAGE === "dev") {
    initialRoute = "DevMenu";
    devMenu = (
      <Stack.Screen
        name="DevMenu"
        options={{ headerShown: false, header: null }}
        component={DevMenu}
        initialParams={{
          initialRoute: initialRoute,
          initialScreen: initialScreen,
        }}
      />
    );
  }

  console.log("initialRoute: ", initialRoute);
  console.log("initialScreen: ", initialScreen);
  return (
    <OfflineAlert>
      <Stack.Navigator
        initialRouteName={"Splash"}
        screenOptions={{ headerShown: false, header: null }}
      >
        {devMenu}
        <Stack.Screen
          name="Splash"
          options={{ headerShown: false, header: null }}
          component={SplashScreen}
          initialParams={{
            initialRoute: initialRoute,
            initialScreen: initialScreen,
          }}
        />
        <Stack.Screen name="OnboardingStack" component={OnboardingStack} />
        <Stack.Screen name="KycProgress" component={KycProgress} />
        <Stack.Screen name="KycSuccess" component={KycSuccess} />
        <Stack.Screen
          name="CmsScreen"
          component={CmsScreen}
          options={{
            animation: "default",
          }}
        />
        <Stack.Screen
          name="CmsStack"
          component={CmsStack}
          options={{
            headerShown: false,
            header: null,
          }}
        />
        {token ? (
          <>
            <Stack.Screen
              name="BackendSync"
              component={BackendSync}
              options={{
                animation: "default",
              }}
            />
            <Stack.Screen name="HomeStack" component={BottomTabNav} />
            <Stack.Screen name="LearnWithUs" component={LearnWithUs} />
            <Stack.Screen name="InvestStack" component={InvestStack} />
            <Stack.Screen name="EWAStack" component={EWAStack} />
            <Stack.Screen name="BenefitsStack" component={BenefitsStack} />
            <Stack.Screen name="AccountStack" component={AccountStack} />
          </>
        ) : null}
      </Stack.Navigator>
      <LogoutModal modalVisible={modalVisible} />
    </OfflineAlert>
  );
};

export default StackNavigator;
