import React, { useEffect } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import CmsRoot from "../../components/cms/CmsRoot";
import { navigationRef } from "../../navigators/RootNavigation";
import { useGetCmsLanguageListQuery } from "../../store/apiSlices/cmsApi";

const Localization = () => {
  const loggedOut = useSelector((state) => state.auth.loggedOut);
  const language = useSelector((state) => state.localization.language);
  console.log("Language: ", language);
  const { data: cmsLanguageList, isLoading: cmsLoading } =
    useGetCmsLanguageListQuery();

  useEffect(() => {
    if (!cmsLoading) {
      console.log("Second stage");
      if (
        !cmsLanguageList.language_list.localization_enabled ||
        language !== ""
      ) {
        console.log("third stage");
        if (loggedOut) {
          navigationRef.navigate("OnboardingStack", { screen: "Login" });
        } else {
          navigationRef.navigate("HomeStack", {
            screen: "Home",
          });
        }
      }
    }
  }, [cmsLoading]);

  return (
    <View>
      {!cmsLoading ? (
        <CmsRoot children={cmsLanguageList?.language_list?.languages} />
      ) : (
        <></>
      )}
    </View>
  );
};

export default Localization;
