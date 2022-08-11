import { OG_API_KEY } from "@env";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/core";
import {
  addDob,
  addEmail,
  addGender,
  addName,
  addVerifyMsg,
  addVerifyStatus
} from "../../store/slices/panSlice";
import ApiView from '../ApiView';
import { panBackendPush } from "../../helpers/BackendPush";
import BugSnagNotify from "../../helpers/BugSnag";

export default Verify = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [backendPush, setBackendPush] = useState(false);

  const id = useSelector((state) => state.auth.id);
  const panSlice = useSelector((state) => state.pan);
  const [dob, setDob] = useState(panSlice?.dob);
  const [email, setEmail] = useState(panSlice?.email);
  const [gender, setGender] = useState(panSlice?.gender);
  const [name, setName] = useState(panSlice?.name);
  const [verifyMsg, setVerifyMsg] = useState(panSlice?.verifyMsg);
  const [verifyStatus, setVerifyStatus] = useState(panSlice?.verifyStatus);

  useEffect(() => {
    dispatch(addDob(dob))
  }, [dob]);

  useEffect(() => {
    dispatch(addEmail(email))
  }, [email]);

  useEffect(() => {
    dispatch(addGender(gender))
  }, [gender]);

  useEffect(() => {
    dispatch(addName(name))
  }, [name]);

  useEffect(() => {
    dispatch(addVerifyMsg(verifyMsg))
  }, [verifyMsg]);

  useEffect(() => {
    dispatch(addVerifyStatus(verifyStatus))
  }, [verifyStatus]);

  useEffect(() => {
    console.log(backendPush);
    console.log("verifyStatus: ", verifyStatus);
    if (backendPush) {
      panBackendPush({
        id: id,
        dob: dob,
        email: email,
        gender: gender,
        name: name,
        number: panSlice?.number,
        verifyMsg: verifyMsg,
        verifyStatus: verifyStatus,
      });
      setLoading(false);
      setBackendPush(false);
      setLoading(false);
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
      .then(response => response.json())
      .then((responseJson) => {
        try {
          if (responseJson["status"] == "200") {
            switch (responseJson["data"]["code"]) {
              case "1000":
                const names = ["first", "middle", "last"];
                console.log('getting data from fetch', responseJson);
                setDob(responseJson["data"]["pan_data"]["date_of_birth"]);
                setEmail(responseJson["data"]["pan_data"]["email"]?.toLowerCase());
                setGender(responseJson["data"]["pan_data"]["gender"]);
                setName(names.map(k => responseJson["data"]["pan_data"][`${k}_name`]).join(" "));
                setVerifyMsg("To be confirmed by User");
                setVerifyStatus("PENDING");
                setBackendPush(true);
                navigation.navigate("PanConfirm");
                break;
              default:
                setVerifyMsg(responseJson["data"]["message"]);
                setVerifyStatus("ERROR");
                Alert.alert("Error", responseJson["data"]["message"]);
            }
          } else if (responseJson["error"]) {
            setVerifyMsg(responseJson["error"]["message"]);
            setVerifyStatus("ERROR");
            Alert.alert("Error", responseJson["error"]["message"]);
          } else {
            setVerifyMsg(responseJson["message"]);
            setVerifyStatus("ERROR");
            Alert.alert("Error", responseJson["message"]);
          }
        }
        catch(error) {
          BugSnagNotify({text: error});
          console.log("Error: ", error);
          setVerifyMsg(error);
          setVerifyStatus("ERROR");
          setBackendPush(true);
          Alert.alert("Error", error);
        }
      })
      .catch((error) => {
        BugSnagNotify({text: error});
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
