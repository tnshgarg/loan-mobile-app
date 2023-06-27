import {
  View,
  Text,
  SafeAreaView,
  Alert,
  BackHandler,
  Linking,
} from "react-native";
import { onboardingStyles, styles } from "../styles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { addCurrentScreen } from "../store/slices/navigationSlice";
import LogoHeaderBack from "../components/molecules/LogoHeaderBack";
import { navigationHelper } from "../helpers/CmsNavigationHelper";
import CmsRoot from "../components/cms/CmsRoot";
import DUMMY_RES, { useGetCmsQuery } from "../store/apiSlices/cmsApi";
import { CMS_POLLING_DURATION } from "../services/constants";

const KycSuccess = () => {
  const [visible, setVisible] = useState(false);
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

      {!cmsLoading ? (
        <CmsRoot children={cmsData?.kyc_success || []}></CmsRoot>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};

export default KycSuccess;
