import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";

import { Alert, Linking } from "react-native";
import DevMenu from "../screens/DevMenu";
import { useEffect, useState } from "react";
import { STAGE } from "@env";
import OfflineAlert from "../components/organisms/OfflineAlert";
import EWAStack from "./stacks/EWAStack";
import OnboardingStack from "./stacks/OnboardingStack";

import { useNavigation } from "@react-navigation/core";
import LogoutModal from "../components/organisms/LogoutModal";
import BackendSync from "../screens/BackendSync";
import BottomTabNav from "./BottomTabNav";
import AccountStack from "./stacks/AccountStack";
import BenefitsStack from "./stacks/BenefitsStack";
import InvestStack from "./stacks/InvestStack";
import SplashScreen from "../screens/SplashScreen";
import Analytics, {InteractionTypes} from "../helpers/analytics/commonAnalytics";
import {parseUrl} from "../services/campaign/urlParsing"
import { setCampaignStoreData } from "../services/campaign/storeManagement";
import { handleCampaignNavigation } from "../services/campaign/campaignNavigation";
import { setPendingUrl } from "../store/slices/pendingCampaignClickSlice";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  var initialRoute = useSelector((state) => state.navigation.currentStack);
  const token = useSelector((state) => state.auth?.token);
  const onboarded = useSelector((state) => state.auth.onboarded);
  var initialScreen = useSelector((state) => state.navigation.currentScreen);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCampaignUrlClick = (url) => {
    // Alert.alert("Url",`${url}`)
    Analytics.setSessionValue("campaignClick", url);
    if (!token) {
      console.error("Token is not present")
      Analytics.trackEvent({
        interaction: InteractionTypes.CAMPAIGN_URL,
        component: "STACK_NAVIGATOR",
        action: "campaign_url_open",
        status: "WAITING_LOGIN",
        error: "user token is not present"
      })
      dispatch(setPendingUrl(url))
      return
    }

    try {
      const {campaignId,campaignScreen,campaignType} = parseUrl(url)
      setCampaignStoreData({campaignType, campaignId})
      handleCampaignNavigation(campaignType, campaignScreen, navigation, {stack: initialRoute, screen: initialScreen}, onboarded)
      Analytics.trackEvent({
        interaction: InteractionTypes.CAMPAIGN_URL,
        component: "STACK_NAVIGATOR",
        action: "campaign_url_open",
        status: "SUCCESS",
      })
    } catch (err) {
      Analytics.trackEvent({
        interaction: InteractionTypes.CAMPAIGN_URL,
        component: "STACK_NAVIGATOR",
        action: "campaign_url_open",
        status: "ERROR",
        error: JSON.stringify({ message: err.message, stack: err.stack })
      })
      console.error(err)
    }
  }
  useEffect(() => {
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleCampaignUrlClick(url)
      }
    })
    const subscription = Linking.addEventListener('url',({url})=>{ 
      handleCampaignUrlClick(url)
    });
    return () => {
      subscription.remove()
    }
  },[])
  console.log("STAGE: ", STAGE);
  console.log("initialRoute: ", initialRoute);
  console.log("currentScreen: ", initialScreen);
  let devMenu = null;
  if(STAGE === "dev") {
    initialRoute = "DevMenu"
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
    )
  }
  console.log("initialRoute: ", initialRoute);
  return (
    <OfflineAlert>
      <Stack.Navigator initialRouteName={initialRoute}>
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
        {!token ? (
          <Stack.Screen
            name="OnboardingStack"
            component={OnboardingStack}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <>
            <Stack.Screen
              name="BackendSync"
              component={BackendSync}
              options={{
                headerShown: false,
                animation: "default",
              }}
            />
            <Stack.Screen
              name="HomeStack"
              component={BottomTabNav}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="InvestStack"
              component={InvestStack}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="EWAStack"
              component={EWAStack}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="BenefitsStack"
              component={BenefitsStack}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="AccountStack"
              component={AccountStack}
              options={{
                headerShown: false,
              }}
            />
          </>
        )}
      </Stack.Navigator>
      <LogoutModal modalVisible={modalVisible} />
    </OfflineAlert>
  );
};

export default StackNavigator;
