import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, View } from "react-native";
import { Button } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import {
  addVerifyMsg,
  addVerifyStatus,
} from "../../store/slices/bankSlice";
import { bankBackendPush } from "../../helpers/BackendPush";
import { bankform, form, styles } from "../../styles";
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

  return (
    <View style={styles.container}>
      <Text style={form.OtpAwaitMsg}>Are these your Bank details ?{"\n"}</Text>
      <Text style={form.userData}>Bank Name: {data?.bankName}</Text>
      <Text style={form.userData}>Branch Name: {data?.branchName}</Text>
      <Text style={form.userData}>Branch City: {data?.branchCity}</Text>
      <Text style={form.userData}>AccountHolderName: {data?.accountHolderName}</Text>
      <Text style={form.userData}>AccountNumber: {data?.accountNumber}</Text>
      <Text style={form.userData}>IFSC: {data?.ifsc}</Text>
      <Text style={form.userData}>UPI: {data?.upi}</Text>
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
          color="#EB5757"
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
        <FuzzyCheck name={data?.accountHolderName} step="Bank Account"/>
        <Button
          title="Yes"
          type="solid"
          uppercase={false}
          style={form.yesButton}
          color="#4E46F1"
          onPress={() => {
            setVerifyMsg("Confirmed by User");
            setVerifyStatus("SUCCESS");
            setBackendPush(true);
            {
              props?.route?.params?.type == "KYC"
                ? navigation.navigate("KYC", {
                    screen: "BANK",
                  })
                : navigation.navigate("PersonalDetailsForm");
            }
          }}
        />
        <View style={bankform.padding}></View>
      </View>
    </View>
  );
};

export default BankConfirmApi;
