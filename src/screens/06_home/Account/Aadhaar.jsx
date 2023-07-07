import { useNavigation } from "@react-navigation/core";
import { useEffect } from "react";
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
const Aadhaar = () => {
  const navigation = useNavigation();
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);

  const { data: kycData, isLoading: loading } = useGetKycQuery(
    unipeEmployeeId,
    {
      pollingInterval: KYC_POLLING_DURATION,
    }
  );

  const { aadhaar, pan, bank } = kycData ?? {};

  const cardData = () => {
    let res = [
      { subTitle: "Name", value: aadhaar?.data?.name, fullWidth: true },
      { subTitle: "Number", value: aadhaar?.number },
      { subTitle: "Date of Birth", value: aadhaar?.data?.date_of_birth },
      { subTitle: "Gender", value: aadhaar?.data?.gender },
      {
        subTitle: "Address",
        value: aadhaar?.data?.address,
        fullWidth: true,
      },
      // { subTitle: "Verify Status", value: aadhaar?.verifyStatus },
    ];
    return res;
  };

  useEffect(() => {
    if (aadhaar?.verifyStatus === "INPROGRESS_OTP") {
      navigation.navigate("KYC", {
        screen: "AADHAAR",
        params: {
          screen: "Verify",
        },
      });
    } else if (aadhaar?.verifyStatus === "INPROGRESS_CONFIRMATION") {
      navigation.navigate("KYC", {
        screen: "AADHAAR",
        params: {
          screen: "Confirm",
        },
      });
    }
    return () => {};
  }, [aadhaar?.verifyStatus]);

  if (loading) return null;

  return (
    <SafeAreaView style={styles.safeContainer}>
      {aadhaar?.verifyStatus === "SUCCESS" ? (
        <View style={styles.container}>
          <DetailsCard
            data={cardData()}
            imageUri={{
              uri: `data:image/jpeg;base64,${aadhaar?.data["photo_base64"]}`,
              cache: "only-if-cached",
            }}
            variant={"light"}
          />
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
            Aadhaar not added
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
            Please add your aadhaar details now
          </Text>
          <PrimaryButton
            title={"+ Add Aadhaar"}
            onPress={() =>
              navigation.navigate("EWAStack", {
                screen: "EWA_KYC_STACK",
                params: { screen: "AadhaarForm" },
              })
            }
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Aadhaar;
