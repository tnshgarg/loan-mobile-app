import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bankBackendPush } from "../../helpers/BackendPush";
import {
  addBankVerifyMsg,
  addBankVerifyStatus,
} from "../../store/slices/bankSlice";

import { Button } from "@react-native-material/core";
import { Text, View } from "react-native";
import { bankform, form, styles } from "../../styles";
import { showToast } from "../../components/Toast";

export default Confirm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [backendPush, setBackendPush] = useState(false);
  const id = useSelector((state) => state.auth.id);
  const bankSlice = useSelector((state) => state.bank);
  const ifsc = useSelector((state) => bankSlice?.ifsc);
  const accountNumber = useSelector((state) => bankSlice?.accountNumber);
  const upi = useSelector((state) => bankSlice?.upi);
  const bankName = useSelector((state) => bankSlice?.bankName);
  const branch = useSelector((state) => bankSlice?.bankBranch);
  const city = useSelector((state) => bankSlice?.branchCity);
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
      <Text style={form.userData}>AccountNumber: {accountNumber}</Text>
      <Text style={form.userData}>IFSC: {ifsc}</Text>
      <Text style={form.userData}>UPI: {upi}</Text>
      <View style={{ flexDirection: "row" }}>
        <Button
          title="No"
          type="solid"
          uppercase={false}
          style={form.noButton}
          color="#EB5757"
          onPress={() => {
            setVerifyMsg("Rejected by User");
            navigation.navigate("BankInfoForm");
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
            showToast("Bank Account Details Recorded");
            navigation.navigate("PersonalDetailsForm");
          }}
        />
        <View style={bankform.padding}></View>
      </View>
    </View>
  );
};
