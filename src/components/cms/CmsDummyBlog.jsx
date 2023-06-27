import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { Alert, BackHandler, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { CMS_POLLING_DURATION } from "../../services/constants";
import { useGetCmsQuery } from "../../store/apiSlices/cmsApi";
import { styles } from "../../styles";
import LogoHeaderBack from "../molecules/LogoHeaderBack";
import CmsRoot from "./CmsRoot";

const CmsDummyBlog = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  const { unipeEmployeeId } = useSelector((state) => state.auth);
  const { data: cmsData, isLoading: cmsLoading } = useGetCmsQuery(
    unipeEmployeeId,
    {
      pollingInterval: CMS_POLLING_DURATION,
    }
  );

  console.log("route.params: ", props.route.params);
  let blogKey = props.route?.params?.blogKey;
  let backScreen = props.route?.params?.backScreen;
    console.log({backScreen})
  // const { data, screenTitle, headline, headingImage } =
  //   DUMMY_RES?.[blogKey] ?? {};

  const { data, screenTitle, headline, headingImage,disableBack } =
    cmsData?.[blogKey] ?? {};
  console.log("MyData: ", {
    blogKey,
    data,
    screenTitle,
    headline,
    headingImage,
    cmsData,
    cms: cmsData?.[blogKey],
    styling: (data || [])[0]?.styling
  });
  console.log(JSON.stringify(data))
  const backAction = () => {
    if (disableBack)  {
      Alert.alert("Hold on!", "Are you sure you want to Logout?", [
        { text: "No", onPress: () => null, style: "cancel" },
        { text: "Yes", onPress: () => {
          dispatch({"action": "Logout"})
          navigation.navigate("Login")
        }},
      ]);
    } else if (backScreen) {
      navigation.navigate(backScreen.stack, {screen: backScreen.screen})
    } else {
      navigation.goBack()
    }
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);
  
  return (
    <View style={[styles.safeContainer, { padding: 0 }]}>
      <LogoHeaderBack
        title={screenTitle}
        onLeftIconPress={backAction}
        headline={headline}
        headerImageUri={headingImage}
      />
      <ScrollView>
        <View style={[styles.container, { padding: 0,margin: 0 }]}>
          {/* {!cmsLoading ? <CmsRoot children={data}></CmsRoot> : <></>} */}
          <CmsRoot children={data}></CmsRoot>
        </View>
      </ScrollView>
    </View>
  );
};

export default CmsDummyBlog;
