import { useNavigation } from "@react-navigation/core";
import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import BannerCard from "../../components/atoms/BannerCard";
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
            cmsData.blogs.map((item, index) => (
              <BannerCard data={item} key={index} />
            ))
          ) : (
            <></>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default LearnWithUs;
