import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import DetailsCard from "../../components/molecules/DetailsCard";
import FuzzyCheck from "../../components/molecules/FuzzyCheck";
import { COLORS, FONTS } from "../../constants/Theme";
import { strings } from "../../helpers/Localization";
import Analytics, { InteractionTypes } from "../../helpers/analytics/commonAnalytics";
import { KYC_POLLING_DURATION } from "../../services/constants";
import { kycNavigate } from "../../services/kyc/navigation";
import { useGetKycQuery } from "../../store/apiSlices/kycApi";
import { useUpdatePanMutation } from "../../store/apiSlices/panApi";
import { addVerifyStatus } from "../../store/slices/panSlice";
import { form, styles } from "../../styles";

const PanConfirmApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const campaignId = useSelector(
    (state) => state.campaign.onboardingCampaignId
  );
  const { data: kycData } = useGetKycQuery(unipeEmployeeId, {
    pollingInterval: KYC_POLLING_DURATION,
  });
  const { pan: panData } = kycData || {};
  const { data, number, verifyStatus } = panData ?? {};
  console.log({ data });

  const [updatePan] = useUpdatePanMutation();

  const backendPush = async ({ verifyStatus }) => {
    setLoading(true)
    dispatch(addVerifyStatus(verifyStatus));

    const payload = {
      unipeEmployeeId: unipeEmployeeId,
      number: number,
      verifyStatus: verifyStatus,
      campaignId: campaignId,
    };

    updatePan(payload)
      .unwrap()
      .then((res) => {
        kycNavigate({...kycData, pan: {verifyStatus}}, navigation)
      })
      .catch((error) => {
        console.error(error)
        Alert.alert("Error", error?.message);
      }).finally(() => {
        setLoading(false);
      });
  };

  const cardData = () => {
    let res = [
      { subTitle: "Name", value: data?.name, fullWidth: true },
      { subTitle: "Number", value: number, fullWidth: true },

      { subTitle: "Date of Birth", value: data?.date_of_birth },
      { subTitle: "Gender", value: data?.gender },
    ];
    if (data?.["email"]) {
      res.push({ subTitle: "Email", value: data?.email, fullWidth: true });
    }
    return res;
  };

  return (
    <View style={styles.container}>
      <DetailsCard data={cardData()} />
      {loading ? (
        <View style={{ marginTop: 20 }}>
          <ActivityIndicator size={"large"} color={COLORS.secondary} />
        </View>
      ) : (
        <></>
      )}
      <View
        style={[
          styles.row,
          { justifyContent: "space-between", display: loading ? "none" : null },
        ]}
      >
        <FuzzyCheck name={data?.["name"]} step="PAN" />
        <PrimaryButton
          title={strings.notMe}
          containerStyle={form.noButton}
          titleStyle={{ ...FONTS.h3, color: COLORS.black }}
          onPress={() => {
            Analytics.trackEvent({
              interaction: InteractionTypes.BUTTON_PRESS,
              screen: "panOk",
              action: "CONTINUE",
            });
            Analytics.trackEvent({
              interaction: InteractionTypes.BUTTON_PRESS,
              screen: "panOk",
              action: "REJECT",
              error: "Rejected by User",
            });
            backendPush({
              verifyStatus: "REJECTED",
            });
          }}
        />
        <PrimaryButton
          accessibilityLabel="PanYesBtn"
          title={strings.yesMe}
          containerStyle={form.yesButton}
          color={COLORS.primary}
          titleStyle={{ ...FONTS.h3, color: COLORS.white }}
          onPress={() => {
            Analytics.trackEvent({
              interaction: InteractionTypes.BUTTON_PRESS,
              screen: "panOk",
              action: "CONTINUE",
            });
            Analytics.trackEvent({
              interaction: InteractionTypes.BUTTON_PRESS,
              screen: "panOk",
              action: "SUCCESS",
            });
            backendPush({
              verifyStatus: "SUCCESS",
            });
          }}
        />
      </View>
    </View>
  );
};

export default PanConfirmApi;
