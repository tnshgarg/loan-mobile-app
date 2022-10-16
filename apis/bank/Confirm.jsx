import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, View } from "react-native";
import { Button } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import { addVerifyMsg, addVerifyStatus } from "../../store/slices/bankSlice";
import { bankBackendPush } from "../../helpers/BackendPush";
import { bankform, form, styles } from "../../styles";
import { COLORS } from "../../constants/Theme";
import CollapsibleCard from "../../components/CollapsibleCard";
import FuzzyCheck from "../../components/FuzzyCheck";

const BankConfirmApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [backendPush, setBackendPush] = useState(false);

  const id = useSelector((state) => state.auth.id);
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

  useEffect(() => {
    console.log("BankConfirmApi bankSlice : ", bankSlice);
    if (backendPush) {
      bankBackendPush({
        id: id,
        data: data,
        verifyMsg: verifyMsg,
        verifyStatus: verifyStatus,
        verifyTimestamp: verifyTimestamp,
      });
      setBackendPush(false);
    }
  }, [backendPush]);

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
  }

  return (
    <View style={styles.container}>

      <CollapsibleCard
        data={cardData()}
        title="Are these your Bank details ?"
        isClosed={false}
      />

      <View
        style={{
          alignSelf: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <Button
          title="No"
          type="solid"
          uppercase={false}
          style={form.noButton}
          color={COLORS.warning}
          onPress={() => {
            setVerifyMsg("Rejected by User");
            setVerifyStatus("ERROR");
            setBackendPush(true);
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
          onPress={() => {
            setVerifyMsg("Confirmed by User");
            setVerifyStatus("SUCCESS");
            setBackendPush(true);
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
