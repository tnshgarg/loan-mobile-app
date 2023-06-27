import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Alert, BackHandler, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { CMS_POLLING_DURATION } from "../../services/constants";
import { useGetCmsQuery } from "../../store/apiSlices/cmsApi";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { styles } from "../../styles";

const LoginSuccess = () => {
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(addCurrentScreen("LoginSuccess"));
  }, []);

  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to Logout?", [
      { text: "No", onPress: () => null, style: "cancel" },
      { text: "Yes", onPress: () => navigation.navigate("Login") },
    ]);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const {
    data: cmsData,
    isLoading: cmsLoading,
    isError: cmsError,
  } = useGetCmsQuery(unipeEmployeeId, {
    pollingInterval: CMS_POLLING_DURATION,
  });
  console.log({cmsError, cmsData})
  return (
    <SafeAreaView accessibilityLabel="WelcomePage" style={styles.safeContainer}>
      {/* <LogoHeaderBack
        containerStyle={{ backgroundColor: "#223240" }}
        hideLogo={true}
        onRightIconPress={() =>
          navigationHelper({
            type: "cms",
            params: { blogKey: "kyc_help" },
          })
        }
      /> */}
      {/* {!cmsLoading ? (
        <CmsRoot children={cmsData?.login_success || []}></CmsRoot>
      ) : (
        <></>
      )} */}
    </SafeAreaView>
  );
};

export default LoginSuccess;
