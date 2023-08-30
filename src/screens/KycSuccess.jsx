import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Alert, BackHandler, SafeAreaView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CmsLoading from "../components/cms/CmsLoading";
import CmsRoot from "../components/cms/CmsRoot";
import LogoHeaderBack from "../components/molecules/LogoHeaderBack";
import { navigationHelper } from "../helpers/CmsNavigationHelper";
import { CMS_POLLING_DURATION } from "../services/constants";
import DUMMY_RES, { useGetCmsQuery } from "../store/apiSlices/cmsApi";
import { addCurrentScreen } from "../store/slices/navigationSlice";
import { styles } from "../styles";

const KycSuccess = () => {
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(addCurrentScreen("kycSuccess"));
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

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LogoHeaderBack
        containerStyle={{ backgroundColor: "#223240" }}
        hideLogo={true}
        onRightIconPress={() =>
          navigationHelper({
            type: "cms",
            params: { blogKey: "mandate_help" },
          })
        }
      />

      {!cmsData && cmsLoading ? (
        <CmsLoading />
      ) : (
        <View style={{ flex: 1 }}>
          <CmsRoot children={DUMMY_RES?.kyc_success?.data || []}></CmsRoot>
        </View>
      )}
    </SafeAreaView>
  );
};

export default KycSuccess;
