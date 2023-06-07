import { useSelector, useDispatch} from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Alert, Linking } from "react-native";
import DevMenu from "../screens/DevMenu";
import { useEffect, useState } from "react";
import { STAGE } from "@env";
import OfflineAlert from "../components/organisms/OfflineAlert";
import OnboardingStack from "./stacks/OnboardingStack";
import EWAStack from "./stacks/EWAStack";

import BenefitsStack from "./stacks/BenefitsStack";
import AccountStack from "./stacks/AccountStack";
import InvestStack from "./stacks/InvestStack";
import SplashScreen from "../screens/SplashScreen";
import BottomTabNav from "./BottomTabNav";

import { showToast } from "../components/atoms/Toast";
import { decode } from "react-native-pure-jwt";
import LogoutModal from "../components/organisms/LogoutModal";
import { useNavigation } from "@react-navigation/core";
import asyncTimer from "../helpers/asyncTimer";
import Analytics, {InteractionTypes} from "../helpers/analytics/commonAnalytics";
import {parseUrl} from "../services/campaign/urlParsing"
import { setCampaignStoreData } from "../services/campaign/storeManagement";
import { handleCampaignNavigation } from "../services/campaign/campaignNavigation";
const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  var initialRoute = useSelector((state) => state.navigation.currentStack);
  const token = useSelector((state) => state.auth.token);
  const onboarded = useSelector((state) => state.auth.onboarded);
  var initialScreen = useSelector((state) => state.navigation.currentScreen);
  const [modalVisible, setModalVisible] = useState(false);
  
  useEffect(() => {
    if (token) {
      decode(
        token, // the token
        "Un!pe@2*22", // the secret
        {
          skipValidation: false, // to skip signature and exp verification
        }
      ).then(async () => {
        showToast("Your Session has expired. Please login again.");
        dispatch({ type: "LOGOUT" });
        setModalVisible(true);
        await asyncTimer(8000)
        setModalVisible(false);
        navigation.navigate("OnboardingStack", { screen: "Login" });
      })
      .catch(err => {console.log("Token Err", err)});
    } else {
      navigation.navigate("OnboardingStack", { screen: "Login" });
    }
  }, [token]);

  const handleCampaignUrlClick = (url) => {
    // Alert.alert("Url",`${url}`)
    Analytics.setSessionValue("campaignClick", url);
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

  STAGE === "dev" ? (initialRoute = "DevMenu") : null;
  console.log("initialRoute: ", initialRoute);

  return (
    <OfflineAlert>
      <Stack.Navigator initialRouteName={"Splash"}>
        <Stack.Screen
          name="DevMenu"
          component={DevMenu}
          options={{
            headerShown: false,
            header: null,
          }}
        />
        <Stack.Screen
          name="Splash"
          options={{ headerShown: false, header: null }}
          component={SplashScreen}
          initialParams={{
            initialRoute: initialRoute,
            initialScreen: initialScreen,
          }}
        />
        <Stack.Screen
          name="OnboardingStack"
          component={OnboardingStack}
          options={{
            headerShown: false,
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
      </Stack.Navigator>
      <LogoutModal modalVisible={modalVisible} />
    </OfflineAlert>
  );
};

export default StackNavigator;
