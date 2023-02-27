import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { View, Text } from "react-native";
import { addVerifyMsg, addVerifyStatus } from "../../store/slices/aadhaarSlice";
import { bankform, form, styles } from "../../styles";
import { COLORS, FONTS } from "../../constants/Theme";
import Analytics from "appcenter-analytics";
import DetailsCard from "../../components/molecules/DetailsCard";
import { updateAadhaar } from "../../queries/onboarding/aadhaar";
import PrimaryButton from "../../components/atoms/PrimaryButton";

const AadhaarConfirmApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const data = useSelector((state) => state.aadhaar.data);
  const number = useSelector((state) => state.aadhaar.number);
  const verifyTimestamp = useSelector((state) => state.aadhaar.verifyTimestamp);
  const campaignId = useSelector(
    (state) => state.campaign.onboardingCampaignId
  );

  const { mutateAsync: updateAadhaarMutateAsync } = updateAadhaar();

  const backendPush = ({ verifyMsg, verifyStatus }) => {
    dispatch(addVerifyMsg(verifyMsg));
    dispatch(addVerifyStatus(verifyStatus));
    updateAadhaarMutateAsync({
      data: {
        unipeEmployeeId: unipeEmployeeId,
        data: data,
        number: number,
        verifyMsg: verifyMsg,
        verifyStatus: verifyStatus,
        verifyTimestamp: verifyTimestamp,
        campaignId: campaignId,
      },
      token: token,
    });
  };

  const cardData = () => {
    var res = [
      { subTitle: "Name", value: data?.name, fullWidth: true },
      { subTitle: "Number", value: number },
      { subTitle: "Gender", value: data?.gender },
      { subTitle: "Date of Birth", value: data?.date_of_birth },
      { subTitle: "Address", value: data?.address, fullWidth: true },
    ];
    return res;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Are these your Aadhaar details?</Text>
      <Text style={styles.subHeadline}>
        कृपया स्पष्ट करें की यहाँ दी गयी सारी जानकारी आपकी ही है?
      </Text>
      <DetailsCard
        data={cardData()}
        imageUri={{
          uri: `data:image/jpeg;base64,${data["photo_base64"]}`,
          cache: "only-if-cached",
        }}
      />

      <View style={[styles.row, { justifyContent: "space-between" }]}>
        <PrimaryButton
          title="Not Me"
          containerStyle={form.noButton}
          titleStyle={{ ...FONTS.h4, color: COLORS.warning }}
          onPress={() => {
            backendPush({
              verifyMsg: "Rejected by User",
              verifyStatus: "ERROR",
            });
            Analytics.trackEvent("Aadhaar|Confirm|Error", {
              unipeEmployeeId: unipeEmployeeId,
              error: "Rejected by User",
            });
            {
              props?.route?.params?.type == "KYC"
                ? navigation.navigate("KYC", {
                    screen: "AADHAAR",
                    params: {
                      screen: "Form",
                    },
                  })
                : navigation.navigate("AadhaarForm");
            }
          }}
        />
        <PrimaryButton
          accessibilityLabel="YesButton"
          title="Yes, that’s me"
          containerStyle={form.yesButton}
          titleStyle={{ ...FONTS.h4, color: COLORS.primary }}
          onPress={() => {
            backendPush({
              verifyMsg: "Confirmed by User",
              verifyStatus: "SUCCESS",
            });
            Analytics.trackEvent("Aadhaar|Confirm|Success", {
              unipeEmployeeId: unipeEmployeeId,
            });
            {
              props?.route?.params?.type == "KYC"
                ? navigation.navigate("KYC", {
                    screen: "AADHAAR",
                  })
                : navigation.navigate("PanForm");
            }
          }}
        />
        <View style={bankform.padding}></View>
      </View>
    </View>
  );
};

export default AadhaarConfirmApi;
