import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, View } from "react-native";
import { Button } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import { addVerifyMsg, addVerifyStatus } from "../../store/slices/bankSlice";
import { bankBackendPush } from "../../helpers/BackendPush";
import { bankform, form, styles } from "../../styles";
import { COLORS, FONTS } from "../../constants/Theme";
import CollapsibleCard from "../../components/molecules/CollapsibleCard";
import FuzzyCheck from "../../components/molecules/FuzzyCheck";
import Analytics from "appcenter-analytics";

const BankConfirmApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const data = useSelector((state) => state.bank.data);
  const verifyTimestamp = useSelector((state) => state.bank.verifyTimestamp);

  const bankSlice = useSelector((state) => state.bank);
  const [verifyMsg, setVerifyMsg] = useState(bankSlice?.verifyMsg);
  const [verifyStatus, setVerifyStatus] = useState(bankSlice?.verifyStatus);

  useEffect(() => {
    dispatch(addVerifyMsg(verifyMsg));
  }, [verifyMsg]);

  useEffect(() => {
    dispatch(addVerifyStatus(verifyStatus));
  }, [verifyStatus]);

  const backendPush = ({
    token,
    unipeEmployeeId,
    data,
    verifyTimestamp,
    verifyMsg,
    verifyStatus,
  }) => {
    bankBackendPush({
      data: {
        unipeEmployeeId: unipeEmployeeId,
        data: data,
        verifyMsg: verifyMsg,
        verifyStatus: verifyStatus,
        verifyTimestamp: verifyTimestamp,
      },
      token: token,
    });
  };

  const cardData = () => {
    var res = [
      { subTitle: "Bank Name", value: data?.bankName },
      { subTitle: "Branch Name", value: data?.branchName },
      { subTitle: "Branch City", value: data?.branchCity },
      { subTitle: "AccountHolderName", value: data?.accountHolderName },
      { subTitle: "AccountNumber", value: data?.accountNumber },
      { subTitle: "IFSC", value: data?.ifsc },
      { subTitle: "UPI", value: data?.upi },
    ];
    return res;
  };

  return (
    <View style={styles.container}>
      <CollapsibleCard
        data={cardData()}
        title="Are these your Bank details ?"
        isClosed={false}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Button
          title="No"
          type="solid"
          uppercase={false}
          style={form.noButton}
          color={COLORS.warning}
          titleStyle={{ ...FONTS.h3, color: COLORS.warning }}
          pressableContainerStyle={{ width: "100%" }}
          contentContainerStyle={{ width: "100%", height: "100%" }}
          onPress={() => {
            setVerifyMsg("Rejected by User");
            setVerifyStatus("ERROR");
            backendPush({
              token: token,
              unipeEmployeeId: unipeEmployeeId,
              data: data,
              verifyTimestamp: verifyTimestamp,
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
                      screen: "Bank Data",
                    },
                  })
                : navigation.navigate("BankForm");
            }
          }}
        />
        <FuzzyCheck name={data?.accountHolderName} step="Bank Account" />
        <Button
          title="Yes"
          type="solid"
          uppercase={false}
          style={form.yesButton}
          color={COLORS.primary}
          titleStyle={{ ...FONTS.h3, color: COLORS.primary }}
          pressableContainerStyle={{ width: "100%" }}
          contentContainerStyle={{ width: "100%", height: "100%" }}
          onPress={() => {
            setVerifyMsg("Confirmed by User");
            setVerifyStatus("SUCCESS");
            backendPush({
              token: token,
              unipeEmployeeId: unipeEmployeeId,
              data: data,
              verifyTimestamp: verifyTimestamp,
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
                : navigation.navigate("Mandate");
            }
          }}
        />
        <View style={bankform.padding}></View>
      </View>
    </View>
  );
};

export default BankConfirmApi;
