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
  const { screenTitle, cmsData } = props?.route?.params?.data || props;
  console.log({ cmsData });
  const { unipeEmployeeId, token, onboarded } = useSelector(
    (state) => state.auth
  );

  return (
    <View style={styles.safeContainer}>
      <LogoHeaderBack
        title={screenTitle}
        onLeftIconPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={styles.container}>
          <CmsRoot children={cmsData}></CmsRoot>
        </View>
      </ScrollView>
    </View>
  );
};

export default CmsScreen;
