import { SafeAreaView, View } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import TopTabNav from "../../../navigators/TopTabNav";
import AadhaarFormTemplate from "../../../templates/aadhaar/Form";
import AadhaarVerifyTemplate from "../../../templates/aadhaar/Verify";
import AadhaarConfirmApi from "../../../apis/aadhaar/Confirm";
import { styles } from "../../../styles";
import { useEffect } from "react";
import DetailsCard from "../../../components/molecules/DetailsCard";
import PrimaryButton from "../../../components/atoms/PrimaryButton";
import { useGetAadhaarQuery } from "../../../store/apiSlices/aadhaarApi";
import { useGetPanQuery } from "../../../store/apiSlices/panApi";
import { useGetKycQuery } from "../../../store/apiSlices/kycApi";

const Aadhaar = () => {
  const navigation = useNavigation();
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);

  const { data: aadhaarData, isLoading: aadhaarLoading } = useGetAadhaarQuery(
    unipeEmployeeId,
    {
      pollingInterval: 1000 * 60 * 60 * 24,
    }
  );

  const { verifyStatus, data, number } = aadhaarData ?? {};

  const { data: panData } = useGetPanQuery(unipeEmployeeId, {
    pollingInterval: 1000 * 60 * 60 * 24,
  });

  const { data: kycData } = useGetKycQuery(unipeEmployeeId, {
    pollingInterval: 1000 * 60 * 60 * 24,
  });

  console.log({ kycData });
  const { aadhaar, pan, bank } = kycData ?? {};

  const bankVerifyStatus = useSelector((state) => state.bank.verifyStatus);

  const cardData = () => {
    let res = [
      { subTitle: "Name", value: data?.name, fullWidth: true },
      { subTitle: "Number", value: number },
      { subTitle: "Date of Birth", value: data?.date_of_birth },
      { subTitle: "Gender", value: data?.gender },
      {
        subTitle: "Address",
        value: data?.address,
        fullWidth: true,
      },
      { subTitle: "Verify Status", value: verifyStatus },
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
    if (verifyStatus === "INPROGRESS_OTP") {
      navigation.navigate("KYC", {
        screen: "AADHAAR",
        params: {
          screen: "Verify",
        },
      });
    } else if (verifyStatus === "INPROGRESS_CONFIRMATION") {
      navigation.navigate("KYC", {
        screen: "AADHAAR",
        params: {
          screen: "Confirm",
        },
      });
    }
    return () => {};
  }, [verifyStatus]);

  if (aadhaarLoading) return null;

  return (
    <SafeAreaView style={styles.safeContainer}>
      {verifyStatus === "SUCCESS" ? (
        <View style={styles.container}>
          <DetailsCard
            data={cardData()}
            imageUri={{
              uri: `data:image/jpeg;base64,${data["photo_base64"]}`,
              cache: "only-if-cached",
            }}
            // type={"Aadhaar"}
          />
          {panData?.verifyStatus != "SUCCESS" ? (
            <PrimaryButton
              title="Continue to PAN Verification"
              onPress={() => {
                navigation.navigate("KYC", {
                  screen: "PAN",
                });
              }}
            />
          ) : bankVerifyStatus != "SUCCESS" ? (
            <PrimaryButton
              title="Continue to Bank Verification"
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
