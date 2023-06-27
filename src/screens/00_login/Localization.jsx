import React, { useEffect } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CmsRoot from "../../components/cms/CmsRoot";
import { navigationRef } from "../../navigators/RootNavigation";
import { useGetCmsLanguageListQuery } from "../../store/apiSlices/cmsApi";
import { addLanguage } from "../../store/slices/localizationSlice";

const Localization = () => {
  const dispatch = useDispatch()
  const loggedOut = useSelector((state) => state.auth.loggedOut);
  const language = useSelector((state) => state.localization.language);
  console.log("Localization Screen Language: ", language);
  const { data: languageList, isSuccess: languageListSuccess , refetch: fetchLanguageList} =
    useGetCmsLanguageListQuery();

  const navigateUser = () => {
    if (loggedOut === true) {
      navigationRef.navigate("OnboardingStack", { screen: "Login" });
    } else {
      navigationRef.navigate("HomeStack", {
        screen: "Home",
      });
    }
  }
  useEffect(() => {
    fetchLanguageList().unwrap().then((res) => {
      if (languageListSuccess) {
        console.log("Second stage");
        if (!languageList?.language_list?.localization_enabled) {
          console.log("this called")
          dispatch(addLanguage("en"));
          navigateUser()
          return
        }
        if (language) {
          navigateUser()
          return
        }      
      }
    })
    
  }, [languageListSuccess]);
  console.log(languageList?.language_list?.languages)
  return (
    <View>
      {languageListSuccess ? (
        <CmsRoot children={languageList?.language_list?.languages} />
      ) : (
        <></>
      )}
    </View>
  );
};

export default Localization;
