import { useNavigation } from "@react-navigation/core";
import React from "react";
import { ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import { useGetCmsQuery } from "../../store/apiSlices/cmsApi";
import { styles } from "../../styles";
import LogoHeaderBack from "../molecules/LogoHeaderBack";
import CmsRoot from "./CmsRoot";
import { useEffect } from "react";

const CmsDummyBlog = (props) => {
  const navigation = useNavigation();
  const { screenTitle } = props;
  const { unipeEmployeeId } = useSelector((state) => state.auth);
  const { data: cmsData, isLoading: cmsLoading } = useGetCmsQuery(
    unipeEmployeeId,
    {
      pollingInterval: 1000,
    }
  );

  console.log("route.params: ", props.route.params);

  const [_, key] = props.route.params.blogKey.split("_");

  const data = cmsData[props.route.params.blogKey] || [];
  console.log({ data });

  return (
    <View style={[styles.safeContainer, { padding: 0 }]}>
      <LogoHeaderBack
        title={screenTitle}
        onLeftIconPress={() => navigation.goBack()}
        headline={data[0]?.title}
        headerImageUri={data[0]?.headingImage}
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
