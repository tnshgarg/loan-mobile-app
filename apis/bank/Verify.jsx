import { OG_API_KEY } from "@env";
import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../components/Toast";
import { bankBackendPush } from "../../helpers/BackendPush";
import {
    addBankVerifyMsg,
    addBankVerifyStatus
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
  const [verifyMsg, setverifyMsg] = useState(bankSlice?.verifyMsg);

  useEffect(() => {
    setverifyMsg(bankSlice.verifyMsg);
  }, [bankSlice.verifyMsg]);

  useEffect(() => {
    setVerifyStatus(bankSlice.verifyStatus);
  }, [bankSlice.verifyStatus]);

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
                Alert.alert(
                  "Your Bank Account Information",
                  `Name: ${response["data"]["bank_account_data"]["name"]}\nBank Name: ${response["data"]["bank_account_data"]["bank_name"]}\nUTR no.: ${response["data"]["bank_account_data"]["utr"]}\nBranch: ${response["data"]["bank_account_data"]["branch"]}\nCity: ${response["data"]["bank_account_data"]["city"]}`,
                  [
                    {
                      text: "Yes",
                      onPress: () => {
                        dispatch(addBankVerifyStatus("SUCCESS"));
                        dispatch(addBankVerifyMsg(""));
                        navigation.navigate("PersonalDetailsForm");
                        showToast("Bank Account Details Recorded");
                      },
                    },
                    {
                      text: "No",
                      onPress: () => {
                        Alert.alert(
                          "Information Validation",
                          "Please provide the correct bank account number and IFSC Code."
                        );
                      },
                      style: "cancel",
                    },
                  ]
                );
                break;
              default:
                dispatch(addBankVerifyStatus("ERROR"));
                dispatch(addBankVerifyMsg(response["data"]["message"]));
                Alert.alert("Error", response["data"]["message"]);
                break;
            }
          } else {
            dispatch(addBankVerifyStatus("ERROR"));
            if (response["error"]) {
              dispatch(addBankVerifyMsg(response["error"]));
              Alert.alert(
                "Error",
                response["error"]["metadata"]["fields"]
                  .map((item, value) => item["message"])
                  .join("\n")
              );
            } else {
              dispatch(addBankVerifyMsg(response["messsage"]));
              Alert.alert("Error", response["message"]);
            }
          }
        }
        setBackendPush(true);
      })
      .catch((err) => {
        dispatch(addBankVerifyStatus("ERROR"));
        dispatch(addBankVerifyMsg(err));
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
