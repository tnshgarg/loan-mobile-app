import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, View } from "react-native";
import { Button } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import {
  addBankVerifyMsg,
  addBankVerifyStatus,
} from "../../store/slices/bankSlice";
import { bankBackendPush } from "../../helpers/BackendPush";
import { bankform, form, styles } from "../../styles";

export default Confirm = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [backendPush, setBackendPush] = useState(false);
  const id = useSelector((state) => state.auth.id);

  const accountHolderName = useSelector(
    (state) => state.bank.accountHolderName
  );
  const ifsc = useSelector((state) => state.bank?.ifsc);
  const accountNumber = useSelector((state) => state.bank?.accountNumber);
  const upi = useSelector((state) => state.bank?.upi);
  const bankName = useSelector((state) => state.bank?.bankName);
  const branch = useSelector((state) => state.bank?.bankBranch);
  const city = useSelector((state) => state.bank?.branchCity);

  const bankSlice = useSelector((state) => state.bank);
  const [verifyStatus, setVerifyStatus] = useState(bankSlice?.verifyStatus);
  const [verifyMsg, setVerifyMsg] = useState(bankSlice?.verifyMsg);

  useEffect(() => {
    dispatch(addBankVerifyMsg(verifyMsg));
  }, [verifyMsg]);

  useEffect(() => {
    dispatch(addBankVerifyStatus(verifyStatus));
  }, [verifyStatus]);

  useEffect(() => {
    console.log("bankSlice : ", bankSlice);
    if (backendPush) {
      bankBackendPush({
        id: id,
        ifsc: ifsc,
        accountNumber: accountNumber,
        upi: upi,
        verifyStatus: verifyStatus,
        verifyMsg: verifyMsg,
      });
    }
    setBackendPush(false);
  }, [backendPush]);

  return (
    <View style={styles.container}>
      <Text style={form.OtpAwaitMsg}>Are these your Bank details ?{"\n"}</Text>
      <Text style={form.userData}>BankName: {bankName}</Text>
      <Text style={form.userData}>Branch: {branch}</Text>
      <Text style={form.userData}>City: {city}</Text>
      <Text style={form.userData}>AccountHolderName: {accountHolderName}</Text>
      <Text style={form.userData}>AccountNumber: {accountNumber}</Text>
      <Text style={form.userData}>IFSC: {ifsc}</Text>
      <Text style={form.userData}>UPI: {upi}</Text>
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
                    screen: "Bank",
                    params: {
                      screen: "Bank Data",
                    },
                  })
                : navigation.navigate("BankInfoForm");
            }
          }}
        />
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
                    screen: "Bank",
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
