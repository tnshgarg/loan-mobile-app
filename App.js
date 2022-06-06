import React ,{useState,useEffect} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const Stack = createNativeStackNavigator();
import LoginScreen from "./screens/LoginScreen";
import {StateProvider} from "./StateProvider";
import reducer, { initialState } from './reducer/reducer';
import OTPScreen from './screens/OTPScreen';
import { IconComponentProvider} from "@react-native-material/core";
import Icon from 'react-native-vector-icons/MaterialIcons';
import PersonalDetailsForm from './screens/PersonalDetailsForm';
import AadhaarForm from './screens/AadhaarForm';
import IDCapture from './screens/IDCapture';
import AadhaarVerify from './screens/AadhaarVerify';
import AadhaarConfirm from './screens/AadhaarConfirm';
import PanCardInfo from './screens/PanCardInfo';
import BankInformationForm from './screens/BankInformationForm';
import Home from './screens/Home';
import { useStateValue } from "./StateProvider";

import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';
import awsconfig from './src/aws-exports';
Amplify.configure(awsconfig);

export default function App() {
  return (
  <StateProvider initialState={initialState} reducer={reducer}>
  <NavigationContainer>
  <SafeAreaProvider style={{backgroundColor:"white",flex:1}}>
  <IconComponentProvider IconComponent={Icon}>
  <KeyboardAvoidingView 
        style={{flex:1}} 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
        >
    <Stack.Navigator>
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
        name="PersonlInfoForm" 
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
        name="IDCapture" 
        component={IDCapture} 
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
        name="PanCardInfo" 
        component={PanCardInfo} 
        options={{
          headerShown: false,
          header: null,
        }}
      />
         <Stack.Screen 
        name="BankInfoForm" 
        component={BankInformationForm} 
        options={{
          headerShown: false,
          header: null,
        }}
      />
         <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{
          headerShown: false,
          header: null,
        }}
      />
    </Stack.Navigator>
    </KeyboardAvoidingView>
    </IconComponentProvider>
  </SafeAreaProvider>
</NavigationContainer>
</StateProvider>
  );
}