import { IconComponentProvider } from "@react-native-material/core";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Provider } from "react-redux";
import AadhaarConfirm from "./screens/AadhaarConfirm";
import AadhaarForm from "./screens/AadhaarForm";
import AadhaarVerify from "./screens/AadhaarVerify";
import BankInformationForm from "./screens/BankInformationForm";
import Home from "./screens/Home";
import IDCapture from "./screens/IDCapture";
import LoginScreen from "./screens/LoginScreen";
import OTPScreen from "./screens/OTPScreen";
import PanCardInfo from "./screens/PanCardInfo";
import PersonalDetailsForm from "./screens/PersonalDetailsForm";
import PersonalImage from "./screens/PersonalImage";
import WelcomePage from "./screens/WelcomePage";
import { store } from "./store/store";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider style={{ backgroundColor: "white", flex: 1 }}>
          <IconComponentProvider IconComponent={Icon}>
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
            >
              <Stack.Navigator>
                <Stack.Screen
                  name="Welcome"
                  component={WelcomePage}
                  options={{
                    headerShown: false,
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
                <Stack.Screen
                  name="PersonalImage"
                  component={PersonalImage}
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
    </Provider>
  );
}
