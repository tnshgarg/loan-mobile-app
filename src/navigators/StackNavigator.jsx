import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";

import { STAGE } from "@env";
import { useEffect, useState } from "react";
import OfflineAlert from "../components/organisms/OfflineAlert";
import DevMenu from "../screens/DevMenu";
import EWAStack from "./stacks/EWAStack";
import OnboardingStack from "./stacks/OnboardingStack";

import { useNavigation } from "@react-navigation/core";
import { decode } from "react-native-pure-jwt";
import { showToast } from "../components/atoms/Toast";
import LogoutModal from "../components/organisms/LogoutModal";
import LearnWithUs from "../screens/06_home/LearnWithUs";
import BackendSync from "../screens/BackendSync";
import KycProgress from "../screens/KycProgress";
import KycSuccess from "../screens/KycSuccess";
import SplashScreen from "../screens/SplashScreen";
import BottomTabNav from "./BottomTabNav";
import AccountStack from "./stacks/AccountStack";
import BenefitsStack from "./stacks/BenefitsStack";
import CmsStack from "./stacks/CmsStack";
import InvestStack from "./stacks/InvestStack";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  var initialRoute = useSelector((state) => state.navigation.currentStack);
  const token = useSelector((state) => state.auth.token);
  var initialScreen = useSelector((state) => state.navigation.currentScreen);
  const [modalVisible, setModalVisible] = useState(false);

  console.log({ token });

  useEffect(() => {
    if (token) {
      decode(
        token, // the token
        "Un!pe@2*22", // the secret
        {
          skipValidation: false, // to skip signature and exp verification
        }
      )
        .then(() => {
          showToast("Your Session has expired. Please login again.");
          dispatch({ type: "LOGOUT" });
          setModalVisible(true);
          setTimeout(() => {
            setModalVisible(false);
            navigation.navigate("OnboardingStack", { screen: "Login" });
          }, 8000);
        })
        .catch(console.log);
    }
  }, [token]);

  console.log("STAGE: ", STAGE);
  console.log("initialRoute: ", initialRoute);
  console.log("currentScreen: ", initialScreen);

  STAGE === "dev" ? (initialRoute = "DevMenu") : null;
  console.log("initialRoute: ", initialRoute);
  return (
    <OfflineAlert>
      <Stack.Navigator initialRouteName={"DevMenu"}>
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
          name="KycProgress"
          component={KycProgress}
          options={{
            headerShown: false,
            header: null,
          }}
        />
        <Stack.Screen
          name="KycSuccess"
          component={KycSuccess}
          options={{
            headerShown: false,
            header: null,
          }}
        />
        <Stack.Screen
          name="CmsStack"
          component={CmsStack}
          options={{
            headerShown: false,
            header: null,
          }}
        />
        {token ? (
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
              name="LearnWithUs"
              component={LearnWithUs}
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
        ) : null}
      </Stack.Navigator>
      <LogoutModal modalVisible={modalVisible} />
    </OfflineAlert>
  );
};

export default StackNavigator;
