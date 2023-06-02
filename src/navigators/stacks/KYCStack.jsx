import { useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileForm from "../../screens/01_profile/Form";
import AadhaarConfirm from "../../screens/02_aadhaar/Confirm";
import AadhaarForm from "../../screens/02_aadhaar/Form";
import AadhaarVerify from "../../screens/02_aadhaar/Verify";
import PanConfirm from "../../screens/03_pan/Confirm";
import PanForm from "../../screens/03_pan/Form";
import BankConfirm from "../../screens/04_bank/Confirm";
import BankForm from "../../screens/04_bank/Form";
import KycProgress from "../../screens/KycProgress";

const KYCStack = () => {
  const Stack = createNativeStackNavigator();
  let initialRoute = useSelector((state) => state.navigation.currentScreen);

  console.log("KYCStack initialRoute: ", initialRoute);

  return (
    <Stack.Navigator
      screenOptions={{ animation: "slide_from_right" }}
      // initialRouteName={initialRoute}
      initialRouteName={"BankForm"}
    >
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
          animation: "simple_push",
        }}
      />
      <Stack.Screen
        name="AadhaarConfirm"
        component={AadhaarConfirm}
        options={{
          headerShown: false,
          header: null,
          animation: "simple_push",
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
          animation: "simple_push",
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
          animation: "simple_push",
        }}
      />
    </Stack.Navigator>
  );
};

export default KYCStack;
