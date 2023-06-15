import { View, Text, ScrollView } from "react-native";
import React from "react";
import { styles } from "../styles";
import LogoHeaderBack from "../components/molecules/LogoHeaderBack";
import { useNavigation } from "@react-navigation/core";
import { useSelector } from "react-redux";
import { useGetCmsQuery } from "../store/apiSlices/cmsApi";
import CmsRoot from "../components/cms/CmsRoot";

const CmsScreen = (props) => {
  const navigation = useNavigation();
  const { screenTitle } = props;
  const { unipeEmployeeId, token, onboarded } = useSelector(
    (state) => state.auth
  );
  const {
    data: cmsData,
    isLoading: cmsLoading,
    isError: cmsError,
  } = useGetCmsQuery(unipeEmployeeId, {
    pollingInterval: 1000,
  });

  return (
    <View style={styles.safeContainer}>
      <LogoHeaderBack
        title={screenTitle}
        onLeftIconPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={styles.container}>
          {!cmsLoading ? <CmsRoot children={cmsData?.home}></CmsRoot> : <></>}
        </View>
      </ScrollView>
    </View>
  );
};

export default CmsScreen;
