import { useDispatch, useSelector } from "react-redux";
import { View } from "react-native";
import { Button } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import { addVerifyMsg, addVerifyStatus } from "../../store/slices/bankSlice";
import { bankform, form, styles } from "../../styles";
import { COLORS, FONTS } from "../../constants/Theme";
import Analytics from "appcenter-analytics";
import FuzzyCheck from "../../components/molecules/FuzzyCheck";
import DetailsCard from "../../components/molecules/DetailsCard";
import { updateBank } from "../../queries/onboarding/bank";

const BankConfirmApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const campaignId = useSelector((state) => state.campaign.onboardingCampaignId);
  const data = useSelector((state) => state.bank.data);
  const verifyTimestamp = useSelector((state) => state.bank.verifyTimestamp);

  const { mutateAsync: updateBankMutateAsync } = updateBank();

  const backendPush = ({ verifyMsg, verifyStatus }) => {
    dispatch(addVerifyMsg(verifyMsg));
    dispatch(addVerifyStatus(verifyStatus));
    updateBankMutateAsync({
      data: {
        unipeEmployeeId: unipeEmployeeId,
        data: data,
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
      {
        subTitle: "Account Holder Name",
        value: data?.accountHolderName,
        fullWidth: true,
      },
      {
        subTitle: "Account Number",
        value: data?.accountNumber,
      },
      { subTitle: "Bank Name", value: data?.bankName },
      { subTitle: "Branch Name", value: data?.branchName, fullWidth: true },
      { subTitle: "Branch City", value: data?.branchCity },

      { subTitle: "IFSC", value: data?.ifsc },
      { subTitle: "UPI", value: data?.upi, fullWidth: true },
    ];
    return res;
  };

  return (
    <View style={styles.container}>
      <DetailsCard data={cardData()} />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 20,
        }}
      >
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
            Analytics.trackEvent("Bank|Confirm|Error", {
              unipeEmployeeId: unipeEmployeeId,
              error: "Rejected by User",
            });
            {
              props?.route?.params?.type == "KYC"
                ? navigation.navigate("KYC", {
                    screen: "BANK",
                    params: {
                      screen: "Form",
                    },
                  })
                : navigation.navigate("BankForm");
            }
          }}
        />
        <FuzzyCheck name={data?.accountHolderName} step="Bank Account" />
        <Button
          accessibilityLabel="BankYesBtn"
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
            Analytics.trackEvent("Bank|Confirm|Success", {
              unipeEmployeeId: unipeEmployeeId,
            });
            {
              props?.route?.params?.type == "KYC"
                ? navigation.navigate("KYC", {
                    screen: "BANK",
                  })
                : props?.type === "Onboarding"
                ? navigation.replace("HomeStack")
                : null;
            }
          }}
        />
        <View style={bankform.padding}></View>
      </View>
    </View>
  );
};

export default BankConfirmApi;
