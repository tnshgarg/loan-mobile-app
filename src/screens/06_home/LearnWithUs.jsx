import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import LogoHeaderBack from "../../components/molecules/LogoHeaderBack";
import { COLORS, FONTS } from "../../constants/Theme";
import { styles } from "../../styles";

const LearnWithUs = () => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <LogoHeaderBack title={"Learn with us"} onLeftIconPress={() => {}} />
      <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
    </SafeAreaView>
  );
};

export default LearnWithUs;
