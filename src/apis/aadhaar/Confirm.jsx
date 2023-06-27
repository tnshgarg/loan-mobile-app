import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import { showToast } from "../../components/atoms/Toast";
import DetailsCard from "../../components/molecules/DetailsCard";
import { COLORS, FONTS } from "../../constants/Theme";
import { strings } from "../../helpers/Localization";
import Analytics, { InteractionTypes } from "../../helpers/analytics/commonAnalytics";
import { kycNavigate } from "../../services/kyc/navigation";
import { useUpdateAadhaarMutation } from "../../store/apiSlices/aadhaarApi";
import { useGetKycQuery } from "../../store/apiSlices/kycApi";
import { addVerifyStatus } from "../../store/slices/aadhaarSlice";
import { bankform, form, styles } from "../../styles";


const AadhaarConfirmApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const [loading, setLoading] = useState(false);
  const campaignId = useSelector(
    (state) => state.campaign.onboardingCampaignId
  );

  const { data: kycData, isLoading: kycLoading } = useGetKycQuery(unipeEmployeeId, {
    pollingInterval: 1000 * 60 * 60 * 24,
  });

  console.log({ kycData });

  const { aadhaar } = kycData ?? {};

  const { data, number } = aadhaar ?? {};

  console.log({ aadhaar });

  const [updateAadhaar] = useUpdateAadhaarMutation();
  const backendPush = async ({ verifyStatus }) => {
    setLoading(true);
    dispatch(addVerifyStatus(verifyStatus));

    const payload = {
      unipeEmployeeId: unipeEmployeeId,
      number: number,
      verifyStatus: verifyStatus,
      campaignId: campaignId,
    };

    updateAadhaar(payload)
      .unwrap()
      .then((res) => {
        if (verifyStatus === "REJECTED") {
          if (props?.route?.params?.type === "KYC") {
            navigation.navigate("KYC", {
              screen: "AADHAAR",
              params: {
                screen: "Form",
              },
            });
          } else {
            navigation.navigate("AadhaarForm");
          }
        } else if (verifyStatus === "SUCCESS") {
          kycNavigate({...kycData,aadhaar: {verifyStatus}}, navigation)
        }
      })
      .catch((error) => {
        showToast(error?.message, "error");
      }).finally(() => setLoading(false));
  };

  const cardData = () => {
    let res = [
      { subTitle: "Name", value: data?.name, fullWidth: true },
      { subTitle: "Number", value: number },
      { subTitle: "Gender", value: data?.gender },
      { subTitle: "Date of Birth", value: data?.date_of_birth },
      { subTitle: "Address", value: data?.address, fullWidth: true },
    ];
    return res;
  };
  const contentLoading = kycLoading || loading;
  let displayStyle = contentLoading ? {display: "none"} : {}
  console.log({contentLoading})
  return (
    <View style={[styles.container]}>
      <DetailsCard
        data={cardData()}
        imageUri={{
          uri: `data:image/jpeg;base64,${data?.["photo_base64"]}`,
          cache: "only-if-cached",
        }}
        type={"Aadhaar"}
      />
      {/* TODO: make a loader component which takes in an attribute to do this */}
      {contentLoading ? <View style={{marginTop: 20}}>
        <ActivityIndicator size={"large"} color={COLORS.secondary}/> 
        </View>: <></> 
      }
      <View style={[styles.row, { justifyContent: "space-between"}, displayStyle]}>
        <PrimaryButton
          title={strings.notMe}
          containerStyle={form.noButton}
          titleStyle={{ ...FONTS.h3, color: COLORS.black }}
          onPress={() => {
            backendPush({
              verifyStatus: "REJECTED",
            });
            Analytics.trackEvent({
              interaction: InteractionTypes.BUTTON_PRESS,
              component: "Aadhaar",
              action: "Confirm",
              status: "Error",
              error: "Rejected by User",
            });
          }}
        />
        <PrimaryButton
          accessibilityLabel="YesButton"
          title={strings.yesMe}
          containerStyle={form.yesButton}
          titleStyle={{ ...FONTS.h3, color: COLORS.white }}
          onPress={() => {
            backendPush({
              verifyStatus: "SUCCESS",
            });
            
            Analytics.trackEvent({
              interaction: InteractionTypes.BUTTON_PRESS,
              component: "Aadhaar",
              action: "Confirm",
              status: "Success"
            });
          }}
        />
        <View style={bankform.padding}></View>
      </View>
    </View>
  );
};

export default AadhaarConfirmApi;
