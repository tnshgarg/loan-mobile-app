import React from "react";
import { useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/00_login/LoginScreen";
import OTPScreen from "../screens/00_login/OTPScreen";
import WelcomePage from "../screens/00_login/WelcomePage";
import AadhaarConfirm from "../screens/01_aadhaar/Confirm";
import AadhaarForm from "../screens/01_aadhaar/Form";
import AadhaarVerify from "../screens/01_aadhaar/Verify";
import PanForm from "../screens/02_pan/Form";
import PanConfirm from "../screens/02_pan/Confirm";
import BankForm from "../screens/03_bank/Form";
import PersonalDetailsForm from "../screens/04_profile/PersonalDetailsForm";
import PersonalImage from "../screens/05_photo/PersonalImage";
import DevMenu from "../screens/DevMenu";
import BackendSync from "../screens/BackendSync";
import RNPhotoCapture from "../components/RNPhotoCapture";
import DrawerNavigator from "./DrawerNavigator";

import { STAGE } from "@env";
import KYCScreen from "../screens/07_drawer/KYCScreen";
import Profile from "../screens/07_drawer/Profile";
import BankConfirm from "../screens/03_bank/Confirm";
import Offer from "../screens/06_home/Money/EWA/01_Offer";
import Mandate from "../screens/03_bank/Mandate";
import Agreement from "../screens/06_home/Money/EWA/04_Agreement";
import EarnedWage from "../screens/06_home/Money/EWA/05_EarnedWage";
import KYC from "../screens/06_home/Money/EWA/02_Kyc";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();

  const initialRoute = useSelector((state) => state.navigation.currentScreen);

  console.log("STAGE: ", STAGE);
  console.log("initialRoute: ", initialRoute);

  return (
    <Stack.Navigator
      initialRouteName={STAGE === "dev" ? "DevMenu" : initialRoute}
    >
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
        name="PersonalDetailsForm"
        component={PersonalDetailsForm}
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
        name="RNPhotoCapture"
        component={RNPhotoCapture}
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
        name="PersonalImage"
        component={PersonalImage}
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
        name="EWAOffer"
        component={Offer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EWAKYC"
        component={KYC}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EWAAgreement"
        component={Agreement}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EWAEarnedWage"
        component={EarnedWage}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
