import analytics from "@react-native-firebase/analytics";
import { useNavigation } from "@react-navigation/core";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import { showToast } from "../../components/atoms/Toast";
import DetailsCard from "../../components/molecules/DetailsCard";
import { COLORS, FONTS } from "../../constants/Theme";
import { strings } from "../../helpers/Localization";
import { useUpdateAadhaarMutation } from "../../store/apiSlices/aadhaarApi";
import { addVerifyStatus } from "../../store/slices/aadhaarSlice";
import { bankform, form, styles } from "../../styles";

const AadhaarConfirmApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const campaignId = useSelector(
    (state) => state.campaign.onboardingCampaignId
  );
  const data = useSelector((state) => state.aadhaar.data);
  const number = useSelector((state) => state.aadhaar.number);
  const [updateAadhaar] = useUpdateAadhaarMutation();
  const backendPush = async ({ verifyStatus }) => {
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
          if (props?.route?.params?.type === "KYC") {
            navigation.navigate("KYC", {
              screen: "AADHAAR",
            });
          } else {
            navigation.navigate("PanForm");
          }
        }
      })
      .catch((error) => {
        showToast(error?.message, "error");
      });
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

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>{strings.areTheseAadhaarDetails}</Text>
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
          title={strings.notMe}
          containerStyle={form.noButton}
          titleStyle={{ ...FONTS.h4, color: COLORS.warning }}
          onPress={() => {
            backendPush({
              verifyStatus: "REJECTED",
            });
            analytics().logEvent("Aadhaar_Confirm_Error", {
              unipeEmployeeId: unipeEmployeeId,
              error: "Rejected by User",
            });
          }}
        />
        <PrimaryButton
          accessibilityLabel="YesButton"
          title={strings.yesMe}
          containerStyle={form.yesButton}
          titleStyle={{ ...FONTS.h4, color: COLORS.primary }}
          onPress={() => {
            backendPush({
              verifyStatus: "SUCCESS",
            });
            analytics().logEvent("Aadhaar_Confirm_Success", {
              unipeEmployeeId: unipeEmployeeId,
            });
          }}
        />
        <View style={bankform.padding}></View>
      </View>
    </View>
  );
};

export default AadhaarConfirmApi;
