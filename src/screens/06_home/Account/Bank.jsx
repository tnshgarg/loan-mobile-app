import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import NoData from "../../../assets/NoData.svg";
import PrimaryButton from "../../../components/atoms/PrimaryButton";
import SvgContainer from "../../../components/atoms/SvgContainer";
import DetailsCard from "../../../components/molecules/DetailsCard";
import { COLORS, FONTS } from "../../../constants/Theme";
import { KYC_POLLING_DURATION } from "../../../services/constants";
import { useGetKycQuery } from "../../../store/apiSlices/kycApi";
import { styles } from "../../../styles";

const Bank = () => {
  const navigation = useNavigation();

  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);

  const { data: kycData, isLoading: loading } = useGetKycQuery(
    unipeEmployeeId,
    {
      pollingInterval: KYC_POLLING_DURATION,
    }
  );

  const { aadhaar, pan, bank } = kycData ?? {};

  useEffect(() => {
    if (!loading && bank?.verifyStatus == "INPROGRESS_CONFIRMATION") {
      navigation.navigate("KYC", {
        screen: "BANK",
        params: {
          screen: "Confirm",
        },
      });
    }
  }, [bank?.verifyStatus]);

  const cardData = () => {
    let res = [
      {
        subTitle: "Account Holder Name",
        value: bank?.data?.accountHolderName,
        fullWidth: true,
      },
      {
        subTitle: "Account Number",
        value: bank?.data?.accountNumber,
      },
      { subTitle: "Bank Name", value: bank?.data?.bankName },
      {
        subTitle: "Branch Name",
        value: bank?.data?.branchName,
        fullWidth: true,
      },
      { subTitle: "Branch City", value: bank?.data?.branchCity },

      { subTitle: "IFSC", value: bank?.data?.ifsc },
      { subTitle: "UPI", value: bank?.data?.upi, fullWidth: true },
      // { subTitle: "Verify Status", value: !loading && bank?.verifyStatus },
    ];
    return res;
  };

  if (loading) return null;

  return (
    <SafeAreaView style={styles.safeContainer}>
      {bank?.verifyStatus == "SUCCESS" ? (
        <View style={styles.container}>
          <DetailsCard data={cardData()} variant={"light"} />
        </View>
      ) : (
        <View style={[styles.container, { alignItems: "center" }]}>
          <SvgContainer height={300} width={300}>
            <NoData />
          </SvgContainer>
          <Text
            style={{
              ...FONTS.h2,
              color: COLORS.secondary,
              textAlign: "center",
            }}
          >
            {aadhaar.verifyStatus != "SUCCESS"
              ? "Aadhaar not added"
              : "Bank A/C not added"}
          </Text>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.gray,
              textAlign: "center",
              marginTop: 5,
              marginBottom: 15,
            }}
          >
            {aadhaar.verifyStatus != "SUCCESS"
              ? "Please add your aadhaar details first"
              : "Please add your bank account details now"}
          </Text>
          <PrimaryButton
            title={
              aadhaar.verifyStatus != "SUCCESS"
                ? "+ Add Aadhaar"
                : "+ Add Bank Account"
            }
            onPress={() =>
              navigation.navigate("EWAStack", {
                screen: "EWA_KYC_STACK",
                params: {
                  screen:
                    aadhaar.verifyStatus != "SUCCESS"
                      ? "AadhaarForm"
                      : "BankForm",
                },
              })
            }
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Bank;
