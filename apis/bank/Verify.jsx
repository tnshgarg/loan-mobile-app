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
  const bankSlice = useSelector((state) => state.bank);
  const ifsc = useSelector((state) => bankSlice?.ifsc);
  const accountNumber = useSelector((state) => bankSlice?.accountNumber);
  const upi = useSelector((state) => bankSlice?.upi);
  const [verifyStatus, setVerifyStatus] = useState(bankSlice?.verifyStatus);
  const [verifyMsg, setVerifyMsg] = useState(bankSlice?.verifyMsg);
  const [bankName, setBankName] = useState(bankSlice?.bankName);
  const [bankBranch, setBankBranch] = useState(bankSlice?.bankBranch);
  const [city, setCity] = useState(bankSlice?.branchCity);


  useEffect(() => {
    dispatch(addBankBranch(bankBranch));
  } , [bankBranch]);

  useEffect(() => {
    dispatch(addBranchCity(city));
  } , [city]);


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
        {
          if (response["status"] == "200") {
            switch (response["data"]["code"]) {
              case "1000":
                dispatch(
                  addBankName(
                    response["data"]["bank_account_data"]["bank_name"]
                  )
                );
                dispatch(
                  addBankBranch(response["data"]["bank_account_data"]["branch"])
                );
                dispatch(
                  addBranchCity(response["data"]["bank_account_data"]["city"])
                );
                setVerifyStatus("PENDING");
                setVerifyMsg("To be confirmed by User");
                navigation.navigate("BankConfirm");
                break;

              default:
                setVerifyStatus("ERROR");
                setVerifyMsg(response["data"]["message"]);
                Alert.alert("Error", response["data"]["message"]);
                break;
            }
          } else {
            setVerifyStatus("ERROR");
            if (response["error"]) {
              setVerifyMsg(response["error"]);
              Alert.alert(
                "Error",
                response["error"]["metadata"]["fields"]
                  .map((item, value) => item["message"])
                  .join("\n")
              );
            } else {
              setVerifyMsg(response["messsage"]);
              Alert.alert("Error", response["message"]);
            }
          }
        }
        setBackendPush(true);
      })
      .catch((err) => {
        setVerifyStatus("ERROR");
        setVerifyMsg(err);
        Alert.alert("Error", err);
        setBackendPush(true);
      });
    setLoading(false);
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
