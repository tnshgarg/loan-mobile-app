import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { styles } from "../../../styles";
import { Ionicons } from "react-native-vector-icons";
import { COLORS, FONTS } from "../../../constants/Theme";
import Header from "../../../components/atoms/Header";

const P2P = ({ navigation }) => {
  const backAction = () => {
    navigation.navigate("InvestStack", { screen: "HowItWorks" });
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
          <View
            style={{
              width: "100%",
              height: 200,
              backgroundColor: COLORS.black,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="play-circle" size={64} color={COLORS.white} />
            <Text style={{ ...FONTS.h3, color: COLORS.white }}>
              What is P2P investment?
            </Text>
          </View>
          {data.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: "column",
                //justifyContent: "flex-start",
                justifyContent: "center",
                width: "100%",
                marginVertical: 15,
              }}
            >
              <Text
                style={{
                  ...FONTS.h4,
                  color: COLORS.black,
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  ...FONTS.body4,
                  color: COLORS.gray,
                  marginTop: 10,
                }}
              >
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
