import { useNavigation } from "@react-navigation/core";
import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import CmsRoot from "../../components/cms/CmsRoot";
import LogoHeaderBack from "../../components/molecules/LogoHeaderBack";
import { useGetCmsQuery } from "../../store/apiSlices/cmsApi";
import { styles } from "../../styles";

const LearnWithUs = () => {
  const navigation = useNavigation();
  const { unipeEmployeeId } = useSelector((state) => state.auth);
  const { data: cmsData, isLoading: cmsLoading } = useGetCmsQuery(
    unipeEmployeeId,
    {
      pollingInterval: 1000,
    }
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LogoHeaderBack
        title={"Learn with us"}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
      />

      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {!cmsLoading ? (
            <CmsRoot children={cmsData?.blogs || []}></CmsRoot>
          ) : (
            <></>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default LearnWithUs;
