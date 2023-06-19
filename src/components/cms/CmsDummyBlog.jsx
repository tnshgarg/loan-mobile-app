import { useNavigation } from "@react-navigation/core";
import React from "react";
import { ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import { useGetCmsQuery } from "../../store/apiSlices/cmsApi";
import { styles } from "../../styles";
import LogoHeaderBack from "../molecules/LogoHeaderBack";
import CmsRoot from "./CmsRoot";

const CmsDummyBlog = (props) => {
  const navigation = useNavigation();
  const { unipeEmployeeId } = useSelector((state) => state.auth);
  const { data: cmsData, isLoading: cmsLoading } = useGetCmsQuery(
    unipeEmployeeId,
    {
      pollingInterval: 1000,
    }
  );

  console.log("route.params: ", props.route.params);
  
  // const { data, screenTitle, headline, headingImage } =
  //   cmsData?.[props.route.params.blogKey] || [];

  let blogKey = props.route?.params?.blogKey;
  const { data, screenTitle, headline, headingImage } = cmsData?.[blogKey] ?? {};
  console.log("MyData: ", { blogKey, data, screenTitle, headline, headingImage,cmsData ,cms: cmsData[blogKey]});

  return (
    <View style={[styles.safeContainer, { padding: 0 }]}>
      <LogoHeaderBack
        title={screenTitle}
        onLeftIconPress={() => navigation.goBack()}
        headline={headline}
        headerImageUri={headingImage}
      />
      <ScrollView>
        <View style={[styles.container, { padding: 0 }]}>
          {!cmsLoading ? <CmsRoot children={data}></CmsRoot> : <></>}
        </View>
      </ScrollView>
    </View>
  );
};

export default CmsDummyBlog;
