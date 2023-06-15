import { View, Text, ScrollView, SafeAreaView, Image } from "react-native";
import React from "react";
import LogoHeaderBack from "../../components/molecules/LogoHeaderBack";
import { COLORS, FONTS } from "../../constants/Theme";
import { styles } from "../../styles";
import BannerCard from "../../components/atoms/BannerCard";
import Blog1 from "../../assets/Blog1.svg";
import Blog2 from "../../assets/Blog2.svg";
import Blog3 from "../../assets/Blog3.svg";
import Blog4 from "../../assets/Blog4.svg";
import { useNavigation } from "@react-navigation/core";

const LearnWithUs = () => {
  const navigation = useNavigation();
  const data = [
    { title: "What are the benefits of completing KYC?", imageUri: <Blog1 /> },
    {
      title: "Why Unipe?",
      subtitle: "Lorem Ipsum is simply dumm typesetting industry.",
      description: "3 min video",
      desIcon: "video-outline",
      thumbnail:
        "https://static-cse.canva.com/blob/1068019/1600w-wlXEWqHuexQ.jpg",
    },
    {
      title: "What are the benefits of Mandate Registration?",
      imageUri: <Blog2 />,
      titleStyle: "strong",
    },
    {
      title: "How Unipe Works?",
      subtitle: "Lorem Ipsum is simply dumm typesetting industry.",
      description: "3 min video",
      desIcon: "video-outline",
      thumbnail:
        "https://static-cse.canva.com/blob/1068019/1600w-wlXEWqHuexQ.jpg",
    },
    {
      title: "What are the benefits of Advance Salary?",
      imageUri: <Blog3 />,
      titleStyle: "strong",
    },
    {
      title: "How do I check my PF Balance?",
      imageUri: <Blog4 />,
      titleStyle: "strong",
    },
  ];
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
          {data.map((item, index) => (
            <BannerCard data={item} key={index} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default LearnWithUs;
