import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { Image, StyleSheet } from "react-native";

const delay = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};
const SplashScreen = (props) => {
  const navigation = useNavigation();
  // const { unipeEmployeeId } = useSelector((state) => state.auth);
  // const { data: cmsData, isLoading: cmsLoading } = useGetCmsQuery(
  //   unipeEmployeeId,
  //   {
  //     pollingInterval: 1000,
  //   }
  // );

  const navigateHome = () =>
    navigation.navigate("HomeStack", { screen: "Home" });

  const navigateInitialRoute = async () => {
    await delay(500);
    const { initialRoute, initialScreen } = props?.route?.params;
    if (initialRoute && navigation.replace)
      navigation.navigate(initialRoute, { screen: initialScreen });
    // else if (cmsData.language_list.localization_enabled) {
    //   navigation.navigate("OnboardingStack", { screen: "Localization" });
    // }
    else {
      navigateHome();
    }
  };

  useEffect(() => {
    navigateInitialRoute();
  }, []);

  return (
    <Image
      source={require("../assets/splash_screen.png")}
      style={styles.root}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
  },
});

export default SplashScreen;
