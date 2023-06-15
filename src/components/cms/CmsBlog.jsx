import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS } from "../../constants/Theme";
import LogoHeaderBack from "../molecules/LogoHeaderBack";

import { useNavigation } from "@react-navigation/core";
import LinearGradient from "react-native-linear-gradient";
import CollapsibleItem from "../atoms/CollapsibleItem";

const CmsBlog = ({ data }) => {
  const {
    heading,
    headingImage,
    subtitle,
    btnText,
    steps,
    questions,
    badgeTitle,
  } = data;

  console.log({ btnText });
  const navigation = useNavigation();

  const kycData = {
    heading: "Help - KYC Verification",
    headingImage: require("../../assets/KycHeader.png"),
    title: "KYC verification in just 3 simple steps",
    subtitle: "Verify your identity & complete your full KYC ",
    btnText: "Start KYC",
    keyPoints: [
      { title: "0% Interest Rate" },
      { title: "₹0 joining fees" },
      { title: "1 Lac Employees Joined" },
    ],
    stepsTitle: "How to complete your KYC?",
    stepsSubtitle: "Follow this 3-step process",
    steps: [
      {
        title: "Verify Aadhaar",
        subtitle:
          "Enter your Aadhaar number and complete verification with OTP",
        imageUri: require("../../assets/KycHelp1.png"),
      },
      {
        title: "Verify PAN Card",
        subtitle: "Enter your PAN Card number and verify the details.",
        imageUri: require("../../assets/KycHelp2.png"),
      },
      {
        title: "Add Bank Account",
        subtitle:
          "Enter your bank account number to receive the advance salary money",
        imageUri: require("../../assets/KycHelp3.png"),
      },
    ],
    questions: [
      {
        title: "Q: Do I need to pay for KYC",
        subtitle: "A: No. KYC is FREE.",
      },
      {
        title: "Q: Why do I need to do KYC?",
        subtitle: "A: As per RBI Regulations, KYC verification is mandatory.",
      },
      {
        title: "Q: What are the required documents for KYC?",
        subtitle:
          "A: Aadhaar Card and PAN Card are mandatory to initiate KYC process.",
      },
      {
        title: "Q: How much time will KYC Process take?",
        subtitle: "A: KYC happens instantly with government APIs.",
      },
      {
        title: "Q: What happens if I don’t complete my minimum KYC?",
        subtitle: "A: You won't be able to withdraw your advance salary.",
      },
    ],
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <LogoHeaderBack
        headline={heading}
        subHeadline={subtitle}
        onLeftIconPress={() => navigation.goBack()}
        // onRightIconPress={() => setVisible(true)}
      />
      <ScrollView>
        <View style={styles.modalContainer}>
          {kycData?.map((item, index) => (
            <View
              style={[
                styles.row,
                { flexDirection: index % 2 == 1 ? "row-reverse" : "row" },
              ]}
            >
              {headingImage && (
                <Image style={styles.headingImage} source={headingImage} />
              )}

              <View style={styles.col}>
                <Text style={styles.title}>What is KYC?</Text>
                <Text style={styles.subtitle}>
                  KYC (Know Your Customer) is a mandatory process of identifying
                  and verifying the employee’s identity while offering features
                  like advance salrary.
                </Text>
              </View>
            </View>
          ))}
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[COLORS.lightGreen, COLORS.lightYellow]}
            style={{
              padding: 15,
              width: "120%",
            }}
          >
            <Text
              style={[
                styles.title,
                { ...FONTS.body4, color: COLORS.gray, marginBottom: 0 },
              ]}
            >
              FAQs
            </Text>
          </LinearGradient>

          {questions.map((item, index) => (
            <CollapsibleItem
              item={item}
              key={index}
              titleStyle={{ ...FONTS.body3 }}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = EStyleSheet.create({
  modalContainer: {
    backgroundColor: "$white",
    flex: 1,

    flexDirection: "column",
  },
  headingImage: {
    height: "120rem",
    width: "120rem",
    marginRight: "15rem",
    resizeMode: "contain",
  },
  title: {
    ...FONTS.body3,
    color: COLORS.secondary,
    marginBottom: 5,
  },
  subtitle: {
    ...FONTS.body4,
    color: COLORS.secondary,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    padding: "20rem",
  },
  col: { flexDirection: "column", flex: 1 },
  pointsContainer: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: "20rem",
    marginBottom: "10rem",
  },
  pointsTitle: {
    ...FONTS.body3,
    color: COLORS.secondary,
    textAlign: "center",
    width: "80%",
    alignSelf: "center",
    marginTop: "10rem",
  },
  flexCenter: { flex: 1, alignItems: "center", justifyContent: "flex-start" },
  btnContainer: {
    paddingHorizontal: "15rem",
    paddingVertical: "10rem",
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderColor: COLORS.lightGray,
  },
  // stepImage: { height: "180rem", width: "100%", marginVertical: "10rem" },
});

export default CmsBlog;
