import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/atoms/Loading";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import { showToast } from "../../components/atoms/Toast";
import DetailsCard from "../../components/molecules/DetailsCard";
import { COLORS, FONTS } from "../../constants/Theme";
import { strings } from "../../helpers/Localization";
import {
  InteractionTypes,
  trackEvent,
} from "../../helpers/analytics/commonAnalytics";
import { kycNavigate } from "../../services/kyc/navigation";
import { useUpdateAadhaarMutation } from "../../store/apiSlices/aadhaarApi";
import { useGetKycQuery } from "../../store/apiSlices/kycApi";
import { addVerifyStatus } from "../../store/slices/aadhaarSlice";
import { form, styles } from "../../styles";

const AadhaarConfirmApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const [loading, setLoading] = useState(false);
  const campaignId = useSelector(
    (state) => state.campaign.onboardingCampaignId
  );

  const { data: kycData, isLoading: kycLoading } = useGetKycQuery(
    unipeEmployeeId,
    {
      pollingInterval: 1000 * 60 * 60 * 24,
    }
  );

  const { aadhaar } = kycData ?? {};

  const { data, number } = aadhaar ?? {};

  const [updateAadhaar] = useUpdateAadhaarMutation();
  const backendPush = async ({ verifyStatus }) => {
    console.log("Backend PUSH Called");
    setLoading(true);
    dispatch(addVerifyStatus(verifyStatus));

    const payload = {
      unipeEmployeeId: unipeEmployeeId,
      number: number,
      verifyStatus: verifyStatus,
      campaignId: campaignId || "123",
    };
    console.log("Reached here", payload);
    updateAadhaar(payload)
      .unwrap()
      .then((res) => {
        console.log("verify status: ", res);
        if (verifyStatus === "REJECTED") {
          trackEvent({
            interaction: InteractionTypes.BUTTON_PRESS,
            screen: "aadhaarOk",
            action: "REJECT",
          });
          console.log(
            "props?.route?.params?.type: ",
            props?.route?.params?.type
          );
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
          trackEvent({
            interaction: InteractionTypes.SCREEN_OPEN,
            screen: "aadhaarOk",
            action: "ACCEPT",
          });
          kycNavigate({ ...kycData, aadhaar: { verifyStatus } }, navigation);
        }
      })
      .catch((error) => {
        trackEvent({
          interaction: InteractionTypes.SCREEN_OPEN,
          screen: "aadhaarOk",
          action: "ERROR",
        });
        showToast(error?.message, "error");
      })
      .finally(() => setLoading(false));
  };

  const cardData = () => {
    let res = [
      { subTitle: strings.name, value: data?.name, fullWidth: true },
      { subTitle: strings.number, value: number },
      { subTitle: strings.gender, value: data?.gender },
      { subTitle: strings.dateOfBirth, value: data?.date_of_birth },
      { subTitle: strings.address, value: data?.address, fullWidth: true },
    ];
    return res;
  };
  const contentLoading = kycLoading || loading;
  let displayStyle = contentLoading ? { display: "none" } : {};
  console.log({ contentLoading });
  return (
    <View style={styles.safeContainer}>
      {contentLoading ? (
        <Loading isLoading={contentLoading} />
      ) : (
        <View style={styles.container}>
          <DetailsCard
            data={cardData()}
            imageUri={{
              uri: `data:image/jpeg;base64,${data?.["photo_base64"]}`,
              cache: "only-if-cached",
            }}
            type={"Aadhaar"}
          />

          <View
            style={[
              styles.row,
              { justifyContent: "space-between" },
              displayStyle,
            ]}
          >
            <PrimaryButton
              title={strings.notMe}
              containerStyle={form.noButton}
              titleStyle={{ ...FONTS.h3, color: COLORS.black }}
              onPress={() => {
                backendPush({
                  verifyStatus: "REJECTED",
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
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default AadhaarConfirmApi;
