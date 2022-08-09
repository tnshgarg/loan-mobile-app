import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/core";
import ApiView from '../ApiView';
import { showToast } from "../../components/Toast";
import {
    addPanName,
    addPanDob,
    addPanVerifyMsg,
    addPanVerifyStatus
  } from "../../store/slices/panSlice";
import { addEmail } from "../../store/slices/profileSlice";
import { panBackendPush } from "../../helpers/BackendPush";
import { OG_API_KEY } from "@env";

const PanVerify = (props) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [backendPush, setBackendPush] = useState(false);

    const id = useSelector((state) => state.auth.id);
    const panSlice = useSelector((state) => state.pan);
    const [panName, setPanName] = useState(panSlice?.name);
    const [panDob, setPanDob] = useState(panSlice?.dob);
    const [verifyMsg, setVerifyMsg] = useState(panSlice?.verifyMsg);
    const [verifyStatus, setVerifyStatus] = useState(panSlice?.verifyStatus);

    useEffect(() => {
        console.log("panName: ", panSlice);
        dispatch(addPanName(panName))
    }, [panName]);

    useEffect(() => {
        console.log("panDob : ", panSlice);
        dispatch(addPanDob(panDob))
    }, [panDob]);

    useEffect(() => {
        console.log("verifyMsg : ", panSlice);
        dispatch(addPanVerifyMsg(verifyMsg))
    }, [verifyMsg]);

    useEffect(() => {
        console.log("verifyStatus : ", panSlice);
        dispatch(addPanVerifyStatus(verifyStatus))
    }, [verifyStatus]);

    useEffect(() => {
        if (backendPush) {
          panBackendPush({
            id: id,
            number: panSlice?.number,
            dob: panDob,
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
            .then(response => response.json())
            .then((responseJson) => {
                try {
                    console.log('getting data from fetch', responseJson);
                    setPanName(responseJson["data"]["pan_data"]["first_name"] + " " + responseJson["data"]["pan_data"]["middle_name"] + " " + responseJson["data"]["pan_data"]["last_name"]);
                    setPanDob(responseJson["data"]["pan_data"]["date_of_birth"]);

                    // TODO: PAN Confirm screen
                    Alert.alert(
                    "PAN Information",
`
PAN: ${panSlice?.number}
Name: ${panName}
Gender: ${responseJson["data"]["pan_data"]["gender"]}
Email: ${responseJson["data"]["pan_data"]["email"]?.toLowerCase()}
Date of Birth: ${panDob}
`
                    );
                    setBackendPush(true);
                    showToast("PAN Details Recorded");
                    dispatch(
                        addEmail(responseJson["data"]["pan_data"]["email"]?.toLowerCase())
                    );
                    setVerifyStatus("SUCCESS");
                    navigation.navigate("BankInfoForm");
                }
                catch(err) {
                    console.log("Error: ", err);
                    setVerifyStatus("ERROR");
                    setVerifyMsg(err);
                    Alert.alert("Error", err);
                }
            })
            .catch((err) => {
                console.log("Error: ", err);
                setVerifyStatus("ERROR");
                setVerifyMsg(err);
                Alert.alert("Error", err);
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
}

export default PanVerify;
