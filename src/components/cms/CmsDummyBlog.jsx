import { useNavigation } from "@react-navigation/core";
import React from "react";
import { ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import { CMS_POLLING_DURATION } from "../../services/constants";
import { useGetCmsQuery } from "../../store/apiSlices/cmsApi";
import { styles } from "../../styles";
import LogoHeaderBack from "../molecules/LogoHeaderBack";
import CmsLoading from "./CmsLoading";
import CmsRoot from "./CmsRoot";

const CmsDummyBlog = (props) => {
  const navigation = useNavigation();
  const { unipeEmployeeId } = useSelector((state) => state.auth);
  const { data: cmsData, isLoading: cmsLoading } = useGetCmsQuery(
    unipeEmployeeId,
    {
      pollingInterval: CMS_POLLING_DURATION,
    }
  );

  console.log("route.params: ", props.route.params);
  let blogKey = props.route?.params?.blogKey;

  // const { data, screenTitle, headline, headingImage } =
  //   DUMMY_RES?.[blogKey] ?? {};

  const { data, screenTitle, headline, headingImage } =
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

  return (
    <View style={[styles.safeContainer, { padding: 0 }]}>
      <LogoHeaderBack
        title={screenTitle}
        onLeftIconPress={() => navigation.goBack()}
        headline={headline}
        headerImageUri={headingImage}
      />
      <ScrollView>
        <View style={[styles.container, { padding: 0, margin: 0 }]}>
          {/* {!cmsLoading ? <CmsRoot children={data}></CmsRoot> : <></>} */}
          {!cmsData && cmsLoading ? (
            <CmsLoading />
          ) : (
            <CmsRoot children={data}></CmsRoot>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default CmsDummyBlog;
