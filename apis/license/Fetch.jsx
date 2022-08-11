import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/core";
import {
  addLicenseNumber,
  addLicenseVerifyStatus,
  addDob,
  addLicenseVerifyMsg,
  addClasses,
  addValidity,
  addRto,
  addName,
  addBloodGroup,
  addPhoto,
} from "../../store/slices/licenseSlice";
import ApiView from "../ApiView";
import { OG_API_KEY } from "@env";

export default Fetch = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const id = useSelector((state) => state.auth.id);
  const licenseSlice = useSelector((state) => state.license);
  const [verifyStatus, setVerifyStatus] = useState(licenseSlice?.verifyStatus);
  const [verifyMsg, setVerifyMsg] = useState(licenseSlice?.verifyMsg);
  const [classes, setClasses] = useState(licenseSlice?.classes);
  const [validity, setValidity] = useState(licenseSlice?.validity);
  const [rto, setRto] = useState(licenseSlice?.rto);
  const [bloodGroup, setBloodGroup] = useState(licenseSlice?.bloodGroup);
  const [name, setName] = useState(licenseSlice?.name);
  const [photo, setPhoto] = useState(licenseSlice?.photo);

  useEffect(() => {
    dispatch(addLicenseVerifyStatus(verifyStatus));
  }, [verifyStatus]);

  useEffect(() => {
    dispatch(addLicenseVerifyMsg(verifyMsg));
  }, [verifyMsg]);

  useEffect(() => {
    dispatch(addClasses(classes));
  }, [classes]);

  useEffect(() => {
    dispatch(addValidity(validity));
  }, [validity]);

  useEffect(() => {
    dispatch(addRto(rto));
  }, [rto]);

  useEffect(() => {
    dispatch(addBloodGroup(bloodGroup));
  }, [bloodGroup]);

  useEffect(() => {
    dispatch(addName(name));
  }, [name]);

  useEffect(() => {
    dispatch(addPhoto(photo));
  }, [photo]);

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
        if (responseJson["status"] == "200") {
          switch (responseJson["data"]["code"]) {
            case "1000":
              setName(responseJson["data"]["driving_license_data"]["name"]);
              setBloodGroup(
                responseJson["data"]["driving_license_data"]["blood_group"]
              );
              setPhoto(
                responseJson["data"]["driving_license_data"]["photo_base64"]
              );
              setRto(
                responseJson["data"]["driving_license_data"]["rto_details"]
              );
              setClasses(
                responseJson["data"]["driving_license_data"][
                  "vehicle_class_details"
                ]
              );
              setValidity(
                responseJson["data"]["driving_license_data"]["validity"]
              );
              setVerifyStatus("PENDING");
              setVerifyMsg("To be confirmed by User");
              navigation.navigate("LicenseConfirm");
              break;

            case "1001":
              Alert.alert("Error", responseJson["data"]["message"]);
              setVerifyMsg(responseJson["data"]["message"]);
              setVerifyStatus("ERROR");
              break;
          }
        } else {
          if (responseJson["error"]) {
            Alert.alert("Error", responseJson["error"]["message"]);
            setVerifyMsg(responseJson["error"]["message"]);
            setVerifyStatus("ERROR");
          } else {
            Alert.alert("Error", responseJson["message"]);
            setVerifyMsg(responseJson["message"]);
            setVerifyStatus("ERROR");
          }
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
        setVerifyStatus("ERROR");
        Alert.alert("Error", error);
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
