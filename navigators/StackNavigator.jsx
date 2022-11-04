import React from "react";
import { useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DevMenu from "../screens/DevMenu";
import LoginScreen from "../screens/00_login/LoginScreen";
import OTPScreen from "../screens/00_login/OTPScreen";
import WelcomePage from "../screens/00_login/WelcomePage";
import ProfileForm from "../screens/01_profile/Form";
import AadhaarConfirm from "../screens/02_aadhaar/Confirm";
import AadhaarForm from "../screens/02_aadhaar/Form";
import AadhaarVerify from "../screens/02_aadhaar/Verify";
import PanConfirm from "../screens/03_pan/Confirm";
import PanForm from "../screens/03_pan/Form";
import BankConfirm from "../screens/04_bank/Confirm";
import BankForm from "../screens/04_bank/Form";
import Mandate from "../screens/04_bank/Mandate";
import BackendSync from "../screens/BackendSync";
import DrawerNavigator from "./DrawerNavigator";

import { STAGE } from "@env";
import KYCScreen from "../screens/07_drawer/KYCScreen";
import Profile from "../screens/07_drawer/Profile";
import EWA from "../screens/06_home/Money/EWA/EWA";
import Offer from "../screens/06_home/Money/EWA/01_Offer";
import KYC from "../screens/06_home/Money/EWA/02_Kyc";
import Agreement from "../screens/06_home/Money/EWA/03_Agreement";
import Disbursement from "../screens/06_home/Money/EWA/04_Disbursement";
import OfflineAlert from "../components/OfflineAlert";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();

  var initialRoute = useSelector((state) => state.navigation.currentScreen);

  console.log("STAGE: ", STAGE);
  console.log("initialRoute: ", initialRoute);

  STAGE === "dev" ? (initialRoute = "DevMenu") : null;
  console.log("initialRoute: ", initialRoute);

  return (
    <OfflineAlert>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="DevMenu"
          component={DevMenu}
          options={{
            headerShown: false,
            header: null,
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Otp"
          component={OTPScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="BackendSync"
          component={BackendSync}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Welcome"
          component={WelcomePage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ProfileForm"
          component={ProfileForm}
          options={{
            headerShown: false,
            header: null,
          }}
        />
        <Stack.Screen
          name="AadhaarForm"
          component={AadhaarForm}
          options={{
            headerShown: false,
            header: null,
          }}
        />
        <Stack.Screen
          name="AadhaarVerify"
          component={AadhaarVerify}
          options={{
            headerShown: false,
            header: null,
          }}
        />
        <Stack.Screen
          name="AadhaarConfirm"
          component={AadhaarConfirm}
          options={{
            headerShown: false,
            header: null,
          }}
        />
        <Stack.Screen
          name="PanForm"
          component={PanForm}
          options={{
            headerShown: false,
            header: null,
          }}
        />
        <Stack.Screen
          name="PanConfirm"
          component={PanConfirm}
          options={{
            headerShown: false,
            header: null,
          }}
        />
        <Stack.Screen
          name="BankForm"
          component={BankForm}
          options={{
            headerShown: false,
            header: null,
          }}
        />
        <Stack.Screen
          name="BankConfirm"
          component={BankConfirm}
          options={{
            headerShown: false,
            header: null,
          }}
        />
        <Stack.Screen
          name="Mandate"
          component={Mandate}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={DrawerNavigator}
          options={{
            headerShown: false,
            header: null,
          }}
        />
        <Stack.Screen
          name="KYC"
          component={KYCScreen}
          options={{
            headerShown: true,
            headerTitle: "KYC Details",
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: true,
            headerTitle: "Profile Details",
          }}
        />
        <Stack.Screen
          name="EWA"
          component={EWA}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EWA_OFFER"
          component={Offer}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EWA_KYC"
          component={KYC}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EWA_AGREEMENT"
          component={Agreement}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EWA_DISBURSEMENT"
          component={Disbursement}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </OfflineAlert>
  );
};

export default StackNavigator;
