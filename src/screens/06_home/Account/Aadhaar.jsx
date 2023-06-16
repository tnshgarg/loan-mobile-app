import { useNavigation } from "@react-navigation/core";
import { useEffect } from "react";
import { SafeAreaView, View } from "react-native";
import { useSelector } from "react-redux";
import { strings } from "../../../helpers/Localization";
import TopTabNav from "../../../navigators/TopTabNav";
import AadhaarFormTemplate from "../../../templates/aadhaar/Form";
import AadhaarVerifyTemplate from "../../../templates/aadhaar/Verify";
import AadhaarConfirmApi from "../../../apis/aadhaar/Confirm";
import { styles } from "../../../styles";
import DetailsCard from "../../../components/molecules/DetailsCard";
import PrimaryButton from "../../../components/atoms/PrimaryButton";
import { useGetKycQuery } from "../../../store/apiSlices/kycApi";

const Aadhaar = () => {
  const navigation = useNavigation();
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);

  const { data: kycData, isLoading: loading } = useGetKycQuery(
    unipeEmployeeId,
    {
      pollingInterval: 1000 * 60 * 60 * 24,
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

  const tabs = [
    {
      name: "Form",
      component: AadhaarFormTemplate,
      initialParams: { type: "KYC" },
      disable: true,
    },
    {
      name: "Verify",
      component: AadhaarVerifyTemplate,
      initialParams: { type: "KYC" },
      disable: true,
    },
    {
      name: "Confirm",
      component: AadhaarConfirmApi,
      initialParams: { type: "KYC" },
      disable: true,
    },
  ];

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
          {pan?.verifyStatus != "SUCCESS" ? (
            <PrimaryButton
              title={strings.continuePanVerification}
              onPress={() => {
                navigation.navigate("KYC", {
                  screen: "PAN",
                });
              }}
            />
          ) : bank?.verifyStatus != "SUCCESS" ? (
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
        <TopTabNav tabs={tabs} hide={true} />
      )}
    </SafeAreaView>
  );
};

export default Aadhaar;
