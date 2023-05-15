import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { Alert, Text, View } from "react-native";
import { addVerifyStatus } from "../../store/slices/panSlice";
import { form, styles } from "../../styles";
import { COLORS, FONTS } from "../../constants/Theme";
import FuzzyCheck from "../../components/molecules/FuzzyCheck";
import Analytics from "appcenter-analytics";
import DetailsCard from "../../components/molecules/DetailsCard";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import { putBackendData } from "../../services/employees/employeeServices";

const PanConfirmApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const campaignId = useSelector(
    (state) => state.campaign.onboardingCampaignId
  );
  const data = useSelector((state) => state.pan.data);
  const number = useSelector((state) => state.pan.number);

  const backendPush = async ({ verifyStatus }) => {
    dispatch(addVerifyStatus(verifyStatus));

    const payload = {
      unipeEmployeeId: unipeEmployeeId,
      number: number,
      verifyStatus: verifyStatus,
      campaignId: campaignId,
    };

    const response = await putBackendData({
      data: payload,
      xpath: "pan",
      token: token,
    });
    const responseJson = response?.data;

    if (responseJson.status === 200) {
      if (verifyStatus === "REJECTED") {
        if (props?.route?.params?.type === "KYC") {
          navigation.navigate("KYC", {
            screen: "PAN",
            params: {
              screen: "Form",
            },
          });
        } else {
          navigation.navigate("PanForm");
        }
      } else if (verifyStatus === "SUCCESS") {
        if (props?.route?.params?.type === "KYC") {
          navigation.navigate("KYC", {
            screen: "PAN",
          });
        } else {
          navigation.navigate("BankForm");
        }
      }
    } else {
      Alert.alert("Error", JSON.stringify(responseJson));
    }
  };

  const cardData = () => {
    var res = [
      { subTitle: "Name", value: data?.name, fullWidth: true },
      { subTitle: "Number", value: number, fullWidth: true },

      { subTitle: "Date of Birth", value: data?.date_of_birth },
      { subTitle: "Gender", value: data?.gender },
    ];
    if (data["email"]) {
      res.push({ subTitle: "Email", value: data?.email, fullWidth: true });
    }
    return res;
  };

  return (
    <View style={styles.container}>
      <DetailsCard data={cardData()} />
      <View style={[styles.row, { justifyContent: "space-between" }]}>
        <FuzzyCheck name={data["name"]} step="PAN" />
        <PrimaryButton
          title="Not Me"
          containerStyle={form.noButton}
          titleStyle={{ ...FONTS.h3, color: COLORS.black }}
          onPress={() => {
            backendPush({
              verifyStatus: "REJECTED",
            });
            Analytics.trackEvent("Pan|Confirm|Error", {
              unipeEmployeeId: unipeEmployeeId,
              error: "Rejected by User",
            });
          }}
        />
        <PrimaryButton
          accessibilityLabel="PanYesBtn"
          title="Yes, that’s me"
          containerStyle={form.yesButton}
          color={COLORS.primary}
          titleStyle={{ ...FONTS.h3, color: COLORS.white }}
          onPress={() => {
            backendPush({
              verifyStatus: "SUCCESS",
            });
            Analytics.trackEvent("Pan|Confirm|Success", {
              unipeEmployeeId: unipeEmployeeId,
            });
          }}
        />
      </View>
    </View>
  );
};

export default PanConfirmApi;
