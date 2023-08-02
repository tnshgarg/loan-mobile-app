import { STAGE } from "@env";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import Offer from "../../screens/06_home/Money/EWA/01_Offer";
import KYC from "../../screens/06_home/Money/EWA/02_Kyc";
import Mandate from "../../screens/06_home/Money/EWA/03_Mandate";
import Agreement from "../../screens/06_home/Money/EWA/04_Agreement";
import Disbursement from "../../screens/06_home/Money/EWA/05_Disbursement";
import WithdrawalStatement from "../../screens/06_home/Money/EWA/06_WithdrawalStatement";
import EWA from "../../screens/06_home/Money/EWA/EWA";
import KYCStack from "./KYCStack";

const EWAStack = () => {
  const Stack = createNativeStackNavigator();
  let initialRoute = useSelector((state) => state.navigation.currentScreen);

  STAGE === "dev" ? (initialRoute = "DevMenu") : null;
  console.log("EWAStack initialRoute: ", initialRoute);

  return (
    <Stack.Navigator
      screenOptions={{ animation: "slide_from_right" }}
      initialRouteName={initialRoute}
    >
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
        name="EWA_KYC_STACK"
        component={KYCStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EWA_MANDATE"
        component={Mandate}
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
      <Stack.Screen
        name="EWA_WITHDRAWAL_STATEMENT"
        component={WithdrawalStatement}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default EWAStack;
