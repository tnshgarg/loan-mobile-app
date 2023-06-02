import { View, Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS, SIZES } from "../../constants/Theme";
import PrimaryButton from "../atoms/PrimaryButton";
import Coin from "../../assets/Coin.svg";
import Hourglass from "../../assets/Hourglass.svg";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import SvgContainer from "../atoms/SvgContainer";

const GetMoneyCard = ({ navigation, eligible, amount, accessible }) => {
  const [kycCompleted, setKycCompleted] = useState(false);

  const profileComplete = useSelector((state) => state.profile.profileComplete);
  const aadhaarVerifyStatus = useSelector(
    (state) => state.aadhaar.verifyStatus
  );
  const panVerifyStatus = useSelector((state) => state.pan.verifyStatus);
  const bankVerifyStatus = useSelector((state) => state.bank.verifyStatus);
  useEffect(() => {
    if (
      profileComplete &&
      aadhaarVerifyStatus == "SUCCESS" &&
      panVerifyStatus == "SUCCESS" &&
      bankVerifyStatus == "SUCCESS"
    ) {
      setKycCompleted(true);
    }
  }, [profileComplete, aadhaarVerifyStatus, panVerifyStatus, bankVerifyStatus]);
  return (
    <View style={styles.container}>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: COLORS.lightGray,
          padding: 15,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {kycCompleted ? (
            <SvgContainer height={20} width={20}>
              <Coin />
            </SvgContainer>
          ) : (
            <SvgContainer height={20} width={20}>
              <Hourglass />
            </SvgContainer>
          )}
          <Text style={[styles.text, { marginLeft: 10 }]}>
            {kycCompleted
              ? "Withdraw Advance Salary"
              : "KYC pending for Advance Salary"}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: COLORS.lightGray,
          padding: 15,
          alignItems: "center",
        }}
      >
        <Text style={styles.text}>Available Salary</Text>
        <Text style={[styles.text, { ...FONTS.body1 }]}>
          {kycCompleted ? amount : "XX,XXX"}
        </Text>

        {/* TODO: add progress bar as background filled view */}
        <PrimaryButton
          containerStyle={{ height: 40 }}
          title={
            kycCompleted
              ? !accessible
                ? "Offer Inactive"
                : !eligible
                ? "Offer Inactive"
                : "Get Salary Now"
              : "Complete Your KYC"
          }
          disabled={!kycCompleted ? false : !eligible || !accessible}
          onPress={() => {
            kycCompleted
              ? navigation.navigate("EWAStack", { screen: "EWA_OFFER" })
              : navigation.navigate("KycProgress");
          }}
        />
      </View>
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 15,
          backgroundColor: kycCompleted
            ? COLORS.primaryBackground
            : COLORS.pendingBackground,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        <Text style={styles.text}>
          {kycCompleted
            ? `Transfer ${amount} to your Bank account in minutes`
            : "Verify your identity and complete your full KYC process to withdraw advance salary."}
        </Text>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    marginBottom: "10rem",
    // padding: "15rem",
    flexDirection: "column",
    borderRadius: 10,

    backgroundColor: "#f5f9f9",
  },
  text: { ...FONTS.body4, color: COLORS.secondary, marginVertical: 5 },
});

export default GetMoneyCard;
