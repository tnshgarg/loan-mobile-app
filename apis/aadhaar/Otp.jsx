import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/core";
import {

} from "../../store/slices/panSlice";
import ApiView from '../ApiView';
import { OG_API_KEY } from "@env";

export default Otp = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [backendPush, setBackendPush] = useState(false);

  const goForFetch = () => {
    setLoading(true);

    const options = {
      method: "POST",
      headers: {
        "X-Auth-Type": "API-Key",
        "X-API-Key": OG_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(props.url, options)
      .then((response) => response.json())
      .then((responseJson) => {
        {
          if (responseJson["status"] == "200") {
            switch (responseJson["data"]["code"]) {
              case "1001":
                setTransactionId(responseJson["data"]["transaction_id"]);
                navigation.navigate("AadhaarVerify");
                break;

              case "1011":
              case "1008":
                // TODO: handle above cases for backend data push
                break;

              case "1012":
                setErrorMsg(responseJson["data"]["message"]);
                Alert.alert("Error", responseJson["data"]["message"]);
                break;
            }
          } else {
            if (responseJson["error"]) {
              setErrorMsg(responseJson["error"]["message"]);
              Alert.alert("Error", responseJson["error"]["message"]);
            } else {
              setErrorMsg(responseJson["message"]);
              Alert.alert("Error", responseJson["message"]);
            }
          }
        }
      })
      .catch((err) => {
        setErrorMsg(err);
        Alert.alert("Error", err);
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
