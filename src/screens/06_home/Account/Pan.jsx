import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import NoData from "../../../assets/NoData.svg";
import PrimaryButton from "../../../components/atoms/PrimaryButton";
import SvgContainer from "../../../components/atoms/SvgContainer";
import DetailsCard from "../../../components/molecules/DetailsCard";
import { COLORS, FONTS } from "../../../constants/Theme";
import { strings } from "../../../helpers/Localization";
import { KYC_POLLING_DURATION } from "../../../services/constants";
import { useGetKycQuery } from "../../../store/apiSlices/kycApi";
import { styles } from "../../../styles";

const Pan = () => {
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
    if (pan?.verifyStatus == "INPROGRESS_CONFIRMATION") {
      navigation.navigate("KYC", {
        screen: "PAN",
        params: {
          screen: "Confirm",
        },
      });
    }
    return () => {};
  }, [pan?.verifyStatus]);

  const cardData = () => {
    let res = [
      { subTitle: "Name", value: pan?.data?.name, fullWidth: true },
      { subTitle: "Number", value: pan?.number },
      { subTitle: "Date of Birth", value: pan?.data?.date_of_birth },
      { subTitle: "Gender", value: pan?.data?.gender },
      { subTitle: "Email", value: pan?.data?.email, fullWidth: true },
      // { subTitle: "Verify Status", value: pan?.verifyStatus },
    ];
    return res;
  };

  if (loading) return <></>;

  return (
    <SafeAreaView style={styles.safeContainer}>
      {pan?.verifyStatus == "SUCCESS" ? (
        <View style={styles.container}>
          <DetailsCard data={cardData()} variant={"light"} />
          {bank?.verifyStatus != "SUCCESS" ? (
            <PrimaryButton
              title={strings.continueBankVerification}
              onPress={() => {
                navigation.navigate("KYC", {
                  screen: "BANK",
                });
              }}
            />
          ) : null}
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
              : "PAN not added"}
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
              : "Please add your PAN details now"}
          </Text>
          <PrimaryButton
            title={
              aadhaar.verifyStatus != "SUCCESS"
                ? "+ Add Aadhaar"
                : "+ Add PAN"
            }
            onPress={() =>
              navigation.navigate("EWAStack", {
                screen: "EWA_KYC_STACK",
                params: {
                  screen:
                    aadhaar.verifyStatus != "SUCCESS"
                      ? "AadhaarForm"
                      : "PanForm",
                },
              })
            }
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Pan;
