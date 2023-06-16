import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { navigationRef } from "../../navigators/RootNavigation";
import DUMMY_RES, { useGetCmsQuery } from "../../store/apiSlices/cmsApi";
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

  console.log("Noti Data", DUMMY_RES?.notifications);

  return (
    <View>
      <LogoHeaderBack
        title={cmsData?.notifications?.title}
        onLeftIconPress={() => navigationRef.goBack()}
      />
      <View>
        {!cmsLoading ? <CmsRoot children={DUMMY_RES?.notifications} /> : <></>}
      </View>
    </View>
  );
};

export default CmsNotificationView;
