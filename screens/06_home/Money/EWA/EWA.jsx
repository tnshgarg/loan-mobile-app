import React from "react";
import { SafeAreaView, Text } from "react-native";
import { useSelector } from "react-redux";
import { styles } from "../../../../styles";
import PrimaryButton from "../../../../components/PrimaryButton";
import HomeMain from "../../HomeMain";

const EWA = () => {
  const aadhaarVerifyState = useSelector((state) => state.aadhaar.verifyStatus);
  const panVerifyState = useSelector((state) => state.pan.verifyStatus);
  const bankVerifyState = useSelector((state) => state.bank.verifyStatus);

  return (
    <SafeAreaView style={styles.container}>
      {aadhaarVerifyState === "SUCCESS" &&
      panVerifyState === "SUCCESS" &&
      bankVerifyState === "SUCCESS" ? (
        <>
          <Text
            style={{
              color: "green",
              fontWeight: "bold",
              alignSelf: "center",
              marginTop: 20,
            }}
          >
            You are eligible for EWA.
          </Text>
          <PrimaryButton
            title="Apply"
            uppercase={false}
            onPress={() => {
              navigation.navigate("EWALanding");
            }}
          />
        </>
      ) : (
        <>
          <Text
            style={{
              color: "red",
              fontWeight: "bold",
              alignSelf: "center",
              marginTop: 20,
            }}
          >
            You are not eligible for EWA.
          </Text>
          <HomeMain />
        </>
      )}
    </SafeAreaView>
  );
};

export default EWA;
