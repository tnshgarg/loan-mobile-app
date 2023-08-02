import React, { useEffect } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import {
  InteractionTypes,
  trackEvent
} from "../../helpers/analytics/commonAnalytics";
import { navigationRef } from "../../navigators/RootNavigation";
import { CMS_POLLING_DURATION } from "../../services/constants";
import { useGetCmsQuery } from "../../store/apiSlices/cmsApi";
import LogoHeaderBack from "../molecules/LogoHeaderBack";
import CmsLoading from "./CmsLoading";
import CmsRoot from "./CmsRoot";

const CmsNotificationView = () => {
  const { unipeEmployeeId } = useSelector((state) => state.auth);
  const { data: cmsData, isLoading: cmsLoading } = useGetCmsQuery(
    unipeEmployeeId,
    {
      pollingInterval: CMS_POLLING_DURATION,
    }
  );

  useEffect(() => {
    trackEvent({
      interaction: InteractionTypes.BUTTON_PRESS,
      screen: "notifications",
      action: "START",
    });
  }, []);

  return (
    <View>
      <LogoHeaderBack
        title={cmsData?.notifications?.title}
        onLeftIconPress={() => {
          trackEvent({
            interaction: InteractionTypes.BUTTON_PRESS,
            screen: "notifications",
            action: "BACK",
          });
          navigationRef.goBack();
        }}
      />
      <View>
        {!cmsData && cmsLoading ? (
          <CmsLoading />
        ) : (
          <CmsRoot children={cmsData?.notifications?.data} />
        )}
      </View>
    </View>
  );
};

export default CmsNotificationView;
