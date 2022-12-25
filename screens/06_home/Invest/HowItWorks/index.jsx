import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../../../../styles";
import { Ionicons } from "react-native-vector-icons";
import { COLORS, FONTS } from "../../../../constants/Theme";
import Percentage from "../../../../assets/percentage.svg";
import Insurance from "../../../../assets/insurance.svg";
import TaskList from "../../../../assets/task.svg";
import Header from "../../../../components/atoms/Header";

const HowItWorks = ({ navigation }) => {
  const backAction = () => {
    navigation.navigate("HomeStack", {
      screen: "DrawerHome",
      params: {
        screen: "Invest",
      },
    });
    return true;
  };
  const data = [
    {
      title:
        "Unipe Invest is a P2P investment that earns you upto 9% interest on your investments",
      imageUri: <Percentage />,
    },
    {
      title: "We are powered by Liquiloans, RBI regulated P2P NBFC.",
      imageUri: <Insurance />,
    },
    {
      title:
        "Interest earned will be earned daily and you are free to withdraw your investment and earnings at any time",
      imageUri: <TaskList />,
    },
  ];
  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header title="How it works?" onLeftIconPress={() => backAction()} />
      <View style={styles.container}>
        <Text style={{ ...FONTS.body4, color: COLORS.black, marginTop: 10 }}>
          Welcome to Unipe Invest.
        </Text>
        <Text style={{ ...FONTS.body2, color: COLORS.black, marginBottom: 20 }}>
          Designed to multiply your growth
        </Text>
        {data.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              marginVertical: 20,
            }}
          >
            {item.imageUri}
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.secondary,
                marginLeft: 20,
                flex: 1,
              }}
            >
              {item.title}
            </Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default HowItWorks;
