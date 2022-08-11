import { OG_API_KEY } from "@env";
import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { bankBackendPush } from "../../helpers/BackendPush";
import {
  addBankVerifyMsg,
  addBankVerifyStatus,
  addBankName,
  addBankBranch,
  addBranchCity,
} from "../../store/slices/bankSlice";
import ApiView from "../ApiView";

export default Verify = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [backendPush, setBackendPush] = useState(false);
  const id = useSelector((state) => state.auth.id);
  
  const ifsc = useSelector((state) => state.bank?.ifsc);
  const accountNumber = useSelector((state) => state.bank?.accountNumber);
  const upi = useSelector((state) => state.bank?.upi);

  const bankSlice = useSelector((state) => state.bank);
  const [bankBranch, setBankBranch] = useState(bankSlice?.bankBranch);
  const [bankName, setBankName] = useState(bankSlice?.bankName);
  const [city, setCity] = useState(bankSlice?.branchCity);
  const [verifyMsg, setVerifyMsg] = useState(bankSlice?.verifyMsg);
  const [verifyStatus, setVerifyStatus] = useState(bankSlice?.verifyStatus);

  useEffect(() => {
    dispatch(addBankBranch(bankBranch));
  }, [bankBranch]);

  useEffect(() => {
    dispatch(addBankName(bankName));
  }, [bankName]);

  useEffect(() => {
    dispatch(addBranchCity(city));
  }, [city]);

  useEffect(() => {
    dispatch(addBankVerifyMsg(verifyMsg));
  }, [verifyMsg]);

  useEffect(() => {
    dispatch(addBankVerifyStatus(verifyStatus));
  }, [verifyStatus]);

  useEffect(() => {
    console.log("bankSlice : ", bankSlice);
    console.log("upi : ", upi);
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
    setLoading(false);
  }, [backendPush]);

  const goForFetch = () => {
    setLoading(true);
    const options = {
      method: "POST",
      headers: {
        "X-Auth-Type": "API-Key",
        "X-API-Key": OG_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props.data),
    };

    fetch(props.url, options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        try {
          if (response["status"] == "200") {
            switch (response["data"]["code"]) {
              case "1000":
                setBankBranch(response["data"]["bank_account_data"]["branch"]);
                setBankName(response["data"]["bank_account_data"]["bank_name"]);
                setCity(response["data"]["bank_account_data"]["city"]);
                setVerifyMsg("To be confirmed by User");
                setVerifyStatus("PENDING");
                setBackendPush(true);
                navigation.navigate("BankConfirm");
                break;
              default:
                setVerifyMsg(response["data"]["message"]);
                setVerifyStatus("ERROR");
                setBackendPush(true);
                Alert.alert("Error", response["data"]["message"]);
                break;
            }
          } else {
            setVerifyStatus("ERROR");
            if (response["error"]) {
              setVerifyMsg(response["error"]);
              setVerifyStatus("ERROR");
              setBackendPush(true);
              Alert.alert(
                "Error",
                response["error"]["metadata"]["fields"]
                  .map((item, value) => item["message"])
                  .join("\n")
              );
            } else {
              setVerifyMsg(response["messsage"]);
              setVerifyStatus("ERROR");
              setBackendPush(true);
              Alert.alert("Error", response["message"]);
            }
          }
        }
        catch(error) {
          console.log("Error: ", error);
          setVerifyMsg(error);
          setVerifyStatus("ERROR");
          setBackendPush(true);
          Alert.alert("Error", error);
        }
        setBackendPush(true);
      })
      .catch((error) => {
        console.log("Error: ", error);
        setVerifyMsg(error);
        setVerifyStatus("ERROR");
        setBackendPush(true);
        Alert.alert("Error", error);
      });
  };
  return (
    <ApiView
      disabled={props.disabled}
      loading={loading}
      goForFetch={goForFetch}
      style={props.style}
    />
  );
};
