import { SafeAreaView, Text, View } from "react-native";
import Insurance from "../../../assets/insurance.svg";
import Percentage from "../../../assets/percentage.svg";
import TaskList from "../../../assets/task.svg";
import Header from "../../../components/atoms/Header";
import PrimaryButton from "../../../components/atoms/PrimaryButton";
import SvgListItem from "../../../components/molecules/SvgListItem";
import { navigate } from "../../../navigators/RootNavigation";
import { investStyles, styles } from "../../../styles";

const HowItWorks = ({ navigation }) => {
  const backAction = () => {
    navigate("HomeStack", {
      screen: "InvestNow",
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
        <Text style={investStyles.title}>Welcome to Unipe Invest.</Text>
        <Text style={investStyles.subtitle}>
          Designed to multiply your growth
        </Text>
        {data.map((item, index) => (
          <SvgListItem item={item} key={index} />
        ))}
        <View style={{ flex: 1 }} />
        <PrimaryButton
          title="Know more"
          onPress={() => {
            navigate("InvestStack", { screen: "P2P" });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default HowItWorks;
