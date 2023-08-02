import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import Header from "../../../components/atoms/Header";
import VideoPlayer from "../../../components/organisms/VideoPlayer";
import { COLORS, FONTS } from "../../../constants/Theme";
import { navigate } from "../../../navigators/RootNavigation";
import { investStyles, styles } from "../../../styles";

const P2P = ({ navigation }) => {
  const backAction = () => {
    navigate("InvestStack", { screen: "HowItWorks" });
    return true;
  };
  const data = [
    {
      title: "What is P2P investment?",
      subtitle:
        "Peer 2 Peer investment allows you to invest money against loans given to borrows and is done by our RBI regulated partner",
    },
    {
      title: "What are the benefits of P2P investment?",
      subtitle:
        "P2P lending is regulated by RBI. We have partnered with Liquiloans to offer investment products\n\nP2P investment gives opportunity to earn more than traditional deposit products",
    },
    {
      title: "What are the risks associated with P2P investment?",
      subtitle:
        "Like any other investment product P2P investment also has associated risk like performance of loans and repayment of borrowers affect your returns\n\nGood News is Our partner has honoured 100% withdrawal within 48 Hrs.\n\nAlso our partner investment product is rated as AA- (by CRISIL) which is one of the highest in the industry",
    },
    {
      title: "Why invest with Unipe?",
      subtitle:
        "You can earn inflation beating highest returns for your investment\n\nYour principal and base interest is secured at our RBI regulated partner",
    },
  ];
  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header
        title="Know more about P2P investment"
        onLeftIconPress={() => backAction()}
      />
      <ScrollView>
        <View style={styles.container}>
          <VideoPlayer title="What is P2P investment?" />

          {data.map((item, index) => (
            <View key={index} style={styles.col}>
              <Text
                style={{
                  ...FONTS.h4,
                  color: COLORS.black,
                }}
              >
                {item.title}
              </Text>
              <Text style={[investStyles.description, { width: "100%" }]}>
                {item.subtitle}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default P2P;
