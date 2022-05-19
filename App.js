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
import AadharForm from './screens/AadharForm';
import AadharVerify from './screens/AadharVerify';
import AadharConfirm from './screens/AadharConfirm';

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
        name="AadharForm" 
        component={AadharForm} 
        options={{
          headerShown: false,
          header: null,
        }}
      />
       <Stack.Screen 
        name="AadharVerify" 
        component={AadharVerify} 
        options={{
          headerShown: false,
          header: null,
        }}
      />
       <Stack.Screen 
        name="AadharConfirm" 
        component={AadharConfirm} 
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