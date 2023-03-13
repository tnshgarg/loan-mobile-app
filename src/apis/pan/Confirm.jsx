import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { Alert, Text, View } from "react-native";
import { Button } from "@react-native-material/core";
import { addVerifyMsg, addVerifyStatus } from "../../store/slices/panSlice";
import { form, styles } from "../../styles";
import { COLORS, FONTS } from "../../constants/Theme";
import FuzzyCheck from "../../components/molecules/FuzzyCheck";
import Analytics from "appcenter-analytics";
import DetailsCard from "../../components/molecules/DetailsCard";
import { putBackendData } from "../../services/employees/employeeServices";

const PanConfirmApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const campaignId = useSelector((state) => state.campaign.onboardingCampaignId);
  const token = useSelector((state) => state.auth.token);
  const data = useSelector((state) => state.pan.data);
  const number = useSelector((state) => state.pan.number);
  const verifyTimestamp = useSelector((state) => state.pan.verifyTimestamp);
  
  const backendPush = async ({ verifyMsg, verifyStatus }) => {
    
    dispatch(addVerifyMsg(verifyMsg));
    dispatch(addVerifyStatus(verifyStatus));

    const payload = {
      unipeEmployeeId: unipeEmployeeId,
      data: data,
      number: number,
      verifyMsg: verifyMsg,
      verifyStatus: verifyStatus,
      verifyTimestamp: verifyTimestamp,
      campaignId: campaignId,
    };

    const response = await putBackendData({ data: payload, xpath: "pan", token: token });
    const responseJson = response?.data;

    if (responseJson.status === 200) {
      if (verifyStatus === "ERROR") {
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
      <Text style={styles.headline}>Are these your PAN details?</Text>
      <Text style={styles.subHeadline}>
        कृपया स्पष्ट करें की यहाँ दी गयी सारी जानकारी आपकी ही है?
      </Text>
      <DetailsCard data={cardData()} />
      <View style={[styles.row, { justifyContent: "space-between" }]}>
        <FuzzyCheck name={data["name"]} step="PAN" />
        <Button
          title="Not Me"
          type="solid"
          uppercase={false}
          style={form.noButton}
          color={COLORS.warning}
          titleStyle={{ ...FONTS.h4, color: COLORS.warning }}
          pressableContainerStyle={{ width: "100%" }}
          contentContainerStyle={{ width: "100%", height: "100%" }}
          onPress={() => {
            backendPush({
              verifyMsg: "Rejected by User",
              verifyStatus: "ERROR",
            });
            Analytics.trackEvent("Pan|Confirm|Error", {
              unipeEmployeeId: unipeEmployeeId,
              error: "Rejected by User",
            });
          }}
        />
        <Button
          accessibilityLabel="PanYesBtn"
          title="Yes, that’s me"
          type="solid"
          uppercase={false}
          style={form.yesButton}
          color={COLORS.primary}
          titleStyle={{ ...FONTS.h4, color: COLORS.primary }}
          pressableContainerStyle={{ width: "100%" }}
          contentContainerStyle={{ width: "100%", height: "100%" }}
          onPress={() => {
            backendPush({
              verifyMsg: "Confirmed by User",
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
