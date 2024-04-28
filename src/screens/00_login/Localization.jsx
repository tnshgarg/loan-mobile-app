import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CmsLoading from "../../components/cms/CmsLoading";
import CmsRoot from "../../components/cms/CmsRoot";
import {
  InteractionTypes,
  setSessionValue,
  trackEvent,
} from "../../helpers/analytics/commonAnalytics";
import { useGetCmsLanguageListQuery } from "../../store/apiSlices/cmsApi";
import { addLanguage } from "../../store/slices/localizationSlice";

const Localization = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loggedIn = !!useSelector((state) => state.auth.token);
  const language = useSelector((state) => state.localization.language);
  console.log("Localization Screen Language: ", language);
  const {
    data: languageList,
    isSuccess: languageListSuccess,
    refetch: fetchLanguageList,
    isLoading: cmsLoading,
  } = useGetCmsLanguageListQuery();

  const navigateUser = () => {
    if (loggedIn) {
      navigation.replace("HomeStack", {
        screen: "Home",
      });
    } else {
      navigation.replace("OnboardingStack", { screen: "Login" });
    }
  };

  useEffect(() => {
    setSessionValue("flow", "login");
  }, []);

  useEffect(() => {
    trackEvent({
      interaction: InteractionTypes.BUTTON_PRESS,
      screen: "language",
      action: "START",
    });
    fetchLanguageList()
      .unwrap()
      .then((res) => {
        if (languageListSuccess) {
          if (!languageList?.language_list?.localization_enabled) {
            dispatch(addLanguage("en"));
            navigateUser();
            return;
          }
          if (language) {
            navigateUser();
            return;
          }
        }
      });
  }, [languageListSuccess]);
  console.log(languageList?.language_list?.languages);

  return (
    <View>
      {!languageList && cmsLoading ? (
        <CmsLoading />
      ) : (
        <CmsRoot children={languageList?.language_list?.languages} />
      )}
    </View>
  );
};

export default Localization;
