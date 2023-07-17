import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { Alert, BackHandler, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { navigate } from "../../navigators/RootNavigation";
import { CMS_POLLING_DURATION } from "../../services/constants";
import DUMMY_RES, { useGetCmsQuery } from "../../store/apiSlices/cmsApi";
import { styles } from "../../styles";
import LogoHeaderBack from "../molecules/LogoHeaderBack";
import CmsLoading from "./CmsLoading";
import CmsRoot from "./CmsRoot";

const CmsScreenOne = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { unipeEmployeeId } = useSelector((state) => state.auth);
  const { data: cmsData, isLoading: cmsLoading } = useGetCmsQuery(
    unipeEmployeeId,
    {
      pollingInterval: CMS_POLLING_DURATION,
    }
  );

  console.log("Format:", cmsData);

  console.log("route.params: ", props.route.params);
  let blogKey = props.route?.params?.blogKey;
  let backScreen = props.route?.params?.backScreen;
  console.log({ backScreen });
  const {
    data,
    screenTitle,
    headline,
    headingImage,
    disableBack,
    headerStyle,
    hideLogo,
    hideLeftIcon,
    rightIconNavigate,
  } = DUMMY_RES?.[blogKey] ?? {};
  // const {
  //   data,
  //   screenTitle,
  //   headline,
  //   headingImage,
  //   disableBack,
  //   headerStyle,
  //   hideLogo,
  //   hideLeftIcon,
  //   rightIconNavigate,
  // } = cmsData?.[blogKey] ?? {};

  console.log("MyData: ", {
    blogKey,
    data,
    screenTitle,
    headline,
    headingImage,
    styling: (data || [])[0]?.styling,
  });
  console.log(disableBack, JSON.stringify(data));
  const backAction = () => {
    if (disableBack) {
      Alert.alert(
        "Hold on! This will log you out",
        "Are you sure you want to Logout?",
        [
          { text: "No", onPress: () => null, style: "cancel" },
          {
            text: "Yes",
            onPress: () => {
              dispatch({ action: "Logout" });
              navigate("OnboardingStack", { screen: "Login" });
            },
          },
        ]
      );
    } else if (backScreen) {
      navigate(backScreen.stack, { screen: backScreen.screen });
    } else {
      navigation.goBack();
    }
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <View style={[styles.safeContainer, { padding: 0 }]}>
      <LogoHeaderBack
        title={screenTitle}
        onLeftIconPress={hideLeftIcon ? null : backAction}
        headline={headline}
        headerImageUri={headingImage}
        onRightIconPress={() => navigationHelper(rightIconNavigate)}
        containerStyle={{ ...headerStyle }}
        hideLogo={hideLogo}
      />
      {!cmsData && cmsLoading ? (
        <CmsLoading />
      ) : (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <CmsRoot children={data}></CmsRoot>
        </ScrollView>
      )}
    </View>
  );
};

export default CmsScreenOne;
