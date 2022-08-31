import { OG_API_KEY } from "@env";
import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { bankBackendPush } from "../../helpers/BackendPush";
import {
  addBankName,
  addBranchName,
  addBranchCity,
  addVerifyMsg,
  addVerifyStatus,
  addVerifyTimestamp,
} from "../../store/slices/bankSlice";
import ApiView from "../ApiView";

export default Verify = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [backendPush, setBackendPush] = useState(false);

  const id = useSelector((state) => state.auth.id);
  const data = useSelector((state) => state.bank.data);

  const bankSlice = useSelector((state) => state.bank);
  const [bankName, setBankName] = useState(bankSlice?.data?.bankName);
  const [branchName, setBranchName] = useState(bankSlice?.data?.bankBranch);
  const [branchCity, setBranchCity] = useState(bankSlice?.data?.branchCity);
  const [verifyMsg, setVerifyMsg] = useState(bankSlice?.verifyMsg);
  const [verifyStatus, setVerifyStatus] = useState(bankSlice?.verifyStatus);
  const [verifyTimestamp, setVerifyTimestamp] = useState(bankSlice?.verifyTimestamp);
  
  console.log("bankSlice: ", bankSlice);
  
  useEffect(() => {
    dispatch(addBankName(bankName));
  }, [bankName]);

  useEffect(() => {
    dispatch(addBranchName(branchName));
  }, [branchName]);

  useEffect(() => {
    dispatch(addBranchCity(branchCity));
  }, [branchCity]);

  useEffect(() => {
    dispatch(addVerifyMsg(verifyMsg));
  }, [verifyMsg]);

  useEffect(() => {
    dispatch(addVerifyStatus(verifyStatus));
  }, [verifyStatus]);

  useEffect(() => {
    dispatch(addVerifyTimestamp(verifyTimestamp));
  }, [verifyTimestamp]);

  useEffect(() => {
    console.log("bankSlice : ", bankSlice);
    if (backendPush) {
      bankBackendPush({
        id: id,
        data: data,
        verifyStatus: verifyStatus,
        verifyMsg: verifyMsg,
        verifyTimestamp: verifyTimestamp,
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
      .then((responseJson) => {
        console.log(responseJson);
        try {
          if (responseJson["status"] == "200") {
            switch (responseJson["data"]["code"]) {
              case "1000":
                setBankName(responseJson["data"]["bank_account_data"]["bank_name"]);
                setBranchName(responseJson["data"]["bank_account_data"]["branch"]);
                setBranchCity(responseJson["data"]["bank_account_data"]["city"]);
                setVerifyMsg("To be confirmed by User");
                setVerifyStatus("PENDING");
                setVerifyTimestamp(responseJson["timestamp"]);
                setBackendPush(true);
                navigation.navigate("BankConfirm");
                break;
              default:
                setVerifyMsg(responseJson["data"]["message"]);
                setVerifyStatus("ERROR");
                setBackendPush(true);
                Alert.alert("Error", responseJson["data"]["message"]);
                break;
            }
          } else {
            setVerifyStatus("ERROR");
            if (responseJson["error"]) {
              setVerifyMsg(responseJson["error"]);
              setVerifyStatus("ERROR");
              setBackendPush(true);
              Alert.alert(
                "Error",
                responseJson["error"]["metadata"]["fields"]
                  .map((item, value) => item["message"])
                  .join("\n")
              );
            } else {
              setVerifyMsg(responseJson["messsage"]);
              setVerifyStatus("ERROR");
              setBackendPush(true);
              Alert.alert("Error", responseJson["message"]);
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
