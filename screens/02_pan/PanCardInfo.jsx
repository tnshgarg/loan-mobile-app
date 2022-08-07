import { OG_API_KEY } from "@env";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Button, Icon, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import {
  Alert,
  Linking,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import ProgressBarTop from "../../components/ProgressBarTop";
import {
  addPanNumber,
  addPanVerifyStatus,
  addPanVerifyMsg,
} from "../../store/slices/panSlice";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { panBackendPush } from "../../helpers/BackendPush";
import { bankform, checkBox, form, styles } from "../../styles";
import { showToast } from "../../components/Toast";
import { addEmail } from "../../store/slices/profileSlice";
import DateEntry from "../../components/DateEntry";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";

export default PanCardInfo = () => {
  const navigation = useNavigation();
  const panSlice = useSelector((state) => state.pan);
  const [pan, setPan] = useState(panSlice?.number);
  const [next, setNext] = useState();
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.id);
  const [panName, setPanName] = useState("");
  const [dob, setDob] = useState("");
  const [verifyStatus, setVerifyStatus] = useState(panSlice?.verifyStatus);
  const [verifyMsg, setVerifyMsg] = useState(panSlice?.verifyMsg);

  const [backendPush, setBackendPush] = useState(false);

  useEffect(() => {
    if (backendPush) {
      panBackendPush({
        id: id,
        pan: pan,
        dob: dob,
        verifyStatus: verifyStatus,
        verifyMsg: verifyMsg,
      });
    }
  }, [backendPush]);

  useEffect(() => {
    console.log("panSlice : ", panSlice);
    setVerifyStatus(panSlice?.verifyStatus);
  }, [panSlice.verifyStatus]);

  useEffect(() => {
    console.log("panSlice : ", panSlice);
    setVerifyMsg(panSlice?.verifyMsg);
  }, [panSlice.verifyMsg]);

  const aadhaartype = useSelector((state) => {
    if (state.aadhaar.verifyStatus.OCR != "PENDING") {
      return "OCR";
    } else {
      return "OTP";
    }
  });

  useEffect(() => {
    dispatch(addCurrentScreen("PanCardInfo"));
  }, []);

  useEffect(() => {
    // TODO: should be a check on regex
    if (pan.length === 10) {
      setNext(true);
      dispatch(addPanNumber(pan));
    } else {
      setNext(false);
    }
  }, [pan]);

  const SkipPAN = () => {
    Alert.alert("PAN KYC pending", `You have not completed PAN KYC.`);
    navigation.navigate("BankInfoForm");
  };

  const VerifyPAN = () => {
    const data = {
      pan_number: pan,
      name: panName,
      date_of_birth: dob,
      consent: "Y",
    };
    const options = {
      method: "POST",
      headers: {
        "X-Auth-Type": "API-Key",
        "X-API-Key": OG_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`https://api.gridlines.io/pan-api/v2/verify`, options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response["status"] == "200") {
          switch (response["data"]["code"]) {
            case "1001":
              RetrievePAN();
              dispatch(addPanVerifyStatus("SUCCESS"));
              dispatch(addPanVerifyMsg(""));
              break;
            case "1002":
              dispatch(addPanVerifyStatus("ERROR"));
              dispatch(addPanVerifyMsg(response["data"]["message"]));
              response["data"]["pan_data"]["name_match_status"] == "NO_MATCH"
                ? Alert.alert(
                    "Pan Number Verification status",
                    `Partial details matched, Please Check Name.`
                  )
                : Alert.alert(
                    "Pan Number Verification status",
                    `Partial details matched, Please Check DOB.`
                  );
              break;
            case "1003":
              dispatch(addPanVerifyStatus("ERROR"));
              dispatch(addPanVerifyMsg(response["data"]["message"]));
              Alert.alert(
                "Pan Number Verification status",
                `Multiple Details mismatched, Please Check Details.`
              );
              break;
            case "1004":
              dispatch(addPanVerifyStatus("ERROR"));
              dispatch(addPanVerifyMsg(response["data"]["message"]));
              Alert.alert(
                "Pan Number Verification status",
                `PAN number incorrect.`
              );
              break;
          }
        } else {
          dispatch(addPanVerifyStatus("ERROR"));
          if (response["error"]) {
            dispatch(addPanVerifyMsg(response["error"]["message"]));
            Alert.alert("Error", response["error"]["message"]);
          } else {
            dispatch(addPanVerifyMsg(response["message"]));
            Alert.alert("Error", response["message"]);
          }
        }
        setBackendPush(true);
      })
      .catch((err) => {
        dispatch(addPanVerifyStatus("ERROR"));
        dispatch(addPanVerifyMsg(err));
        Alert.alert("Error", err);
        setBackendPush(true);
      });
  };

  const RetrievePAN = () => {
    const data = {
      pan_number: pan,
      consent: "Y",
    };
    const options = {
      method: "POST",
      headers: {
        "X-Auth-Type": "API-Key",
        "X-API-Key": OG_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`https://api.gridlines.io/pan-api/fetch-detailed`, options)
      .then((response) => response.json())
      .then((response) => {
        Alert.alert(
          "PAN Information",
          `PAN: ${pan}\nName: ${panName}\nGender: ${
            response["data"]["pan_data"]["gender"]
          }\nEmail: ${response["data"]["pan_data"]["email"].toLowerCase()}`
        );
        showToast("PAN Details Recorded");
        dispatch(addEmail(response["data"]["pan_data"]["email"].toLowerCase()));
        navigation.navigate("BankInfoForm");
      })
      .catch((err) => Alert.alert("Error", err));
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <AppBar
          title="Setup Profile"
          color="#4E46F1"
          leading={
            <IconButton
              icon={<Icon name="arrow-back" size={20} color="white" />}
              onPress={() => navigation.navigate("AadhaarConfirm", aadhaartype)}
            />
          }
        />
        <ProgressBarTop step={2} />
        <Text style={form.formHeader}>PAN Verification</Text>
        <KeyboardAvoidingWrapper>
          <View>
            <Text style={form.formLabel}>Enter PAN Number</Text>
            <TextInput
              style={form.formTextInput}
              autoCapitalize="characters"
              value={pan}
              onChangeText={setPan}
              maxLength={10}
              placeholder="Enter PAN Number"
              required
            />
            <View style={form.forgotText}>
              <Text
                style={styles.termsText}
                onPress={() =>
                  Linking.openURL(
                    "https://docs.google.com/document/d/19nf3qwzXcun0yTN6WH6iA5hpGKlgsg4erbHuDql0EZQ/edit"
                  )
                }
              >
                Forgot PAN?
              </Text>
            </View>
            <Text style={form.formLabel}>Name as per PAN Card</Text>
            <TextInput
              style={form.formTextInput}
              autoCapitalize="words"
              value={panName}
              onChangeText={setPanName}
              placeholder="Enter Name Registered with PAN"
              required
            />
            <DateEntry
              title="Date of birth as recorded in PAN"
              val={dob}
              setval={setDob}
            />
            {console.log(dob)}
            <View style={bankform.infoCard}>
              <Icon name="info-outline" size={20} color="#4E46F1" />
              <Text style={bankform.infoText}>
                PAN is needed to verify your name and date of birth
              </Text>
            </View>
            {next ? (
              <Button
                uppercase={false}
                title="Continue"
                type="solid"
                color="#4E46F1"
                style={form.nextButton}
                onPress={() => {
                  VerifyPAN();
                }}
              />
            ) : (
              <Button
                title="Continue"
                uppercase={false}
                type="solid"
                style={form.nextButton}
                disabled
              />
            )}
            <View>
              <Button
                title="Skip"
                uppercase={false}
                type="solid"
                color="#4E46F1"
                style={form.skipButton}
                onPress={() => {
                  SkipPAN();
                }}
              />
            </View>
          </View>
        </KeyboardAvoidingWrapper>
      </SafeAreaView>
    </>
  );
};
