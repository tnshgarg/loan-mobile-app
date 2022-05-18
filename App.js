import React ,{useState,useEffect} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const Stack = createNativeStackNavigator();
import tw from "twrnc";
import LoginScreen from "./screens/LoginScreen";
import {StateProvider} from "./StateProvider";
import reducer, { initialState } from './reducer/reducer';
import OTPScreen from './screens/OTPScreen';
import { IconComponentProvider} from "@react-native-material/core";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function App() {
  return (
  <StateProvider initialState={initialState} reducer={reducer}>
  <NavigationContainer>
  <SafeAreaProvider style={tw`flex-1 bg-white`}>
  <IconComponentProvider IconComponent={Icon}>
  <KeyboardAvoidingView 
        style={tw`flex-1`} 
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
    </Stack.Navigator>
    </KeyboardAvoidingView>
    </IconComponentProvider>
  </SafeAreaProvider>
</NavigationContainer>
</StateProvider>
  );
}