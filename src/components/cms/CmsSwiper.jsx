import React, { useState } from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import Swiper from "react-native-swiper";
import { useSelector } from "react-redux";
import { COLORS } from "../../constants/Theme";
import { useGetCmsQuery } from "../../store/apiSlices/cmsApi";
import BannerCard from "../atoms/BannerCard";

const CmsSwiper = ({ urls, banners }) => {
  const [visible, setVisible] = useState(false);
  console.log({ banners });
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
  const { unipeEmployeeId } = useSelector((state) => state.auth);
  const { data: cmsData, isLoading: cmsLoading } = useGetCmsQuery(
    unipeEmployeeId,
    {
      pollingInterval: 1000,
    }
  );
  return (
    <>
      <Swiper
        style={styles.wrapper}
        dotColor={COLORS.lightGray}
        activeDotColor={COLORS.black}
      >
        {cmsData.blogs?.map((item, index) => (
          // <TouchableOpacity
          //   activeOpacity={0.7}
          //   onPress={() => {
          //     setVisible(true);
          //   }}
          // >
          <BannerCard data={item} key={index} />
          // </TouchableOpacity>
        ))}
      </Swiper>
      {/* <BannerFaqSection
        visible={visible}
        setVisible={setVisible}
        data={kycData}
      /> */}
    </>
  );
};

const styles = EStyleSheet.create({
  wrapper: { height: 200, marginVertical: "15rem" },
  image: {
    resizeMode: "contain",
    width: "98%",
    alignSelf: "center",
    borderRadius: "10rem",
    height: 150,
    // marginRight: "2rem",
  },
});

export default CmsSwiper;
