import { useNavigation } from "@react-navigation/core";
import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import BannerCard from "../../components/atoms/BannerCard";
import LogoHeaderBack from "../../components/molecules/LogoHeaderBack";
import DUMMY_RES, { useGetCmsQuery } from "../../store/apiSlices/cmsApi";
import { styles } from "../../styles";
import CmsRoot from "../../components/cms/CmsRoot";

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
            <CmsRoot children={DUMMY_RES?.blogs || []}></CmsRoot>
          ) : (
            <></>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default LearnWithUs;
