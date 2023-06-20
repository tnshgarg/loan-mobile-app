import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { navigationRef } from "../../navigators/RootNavigation";
import { useGetCmsQuery } from "../../store/apiSlices/cmsApi";
import LogoHeaderBack from "../molecules/LogoHeaderBack";
import CmsRoot from "./CmsRoot";

const CmsNotificationView = () => {
  const { unipeEmployeeId } = useSelector((state) => state.auth);
  const { data: cmsData, isLoading: cmsLoading } = useGetCmsQuery(
    unipeEmployeeId,
    {
      pollingInterval: 1000,
    }
  );

  return (
    <View>
      <LogoHeaderBack
        title={cmsData?.notifications?.title}
        onLeftIconPress={() => navigationRef.goBack()}
      />
      <View>
        {!cmsLoading ? <CmsRoot children={cmsData?.notifications?.data} /> : <></>}
      </View>
    </View>
  );
};

export default CmsNotificationView;
