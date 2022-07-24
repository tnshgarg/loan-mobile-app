import { AppBar, Button, Icon, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import ProgressBarTop from "../../components/ProgressBarTop";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { aadhaarBackendPush } from "../../helpers/BackendPush";
import { bankform, form, styles } from "../../styles";

export default AadhaarConfirm = () => {
  const navigation = useNavigation();
  const aadhaarData = useSelector((state) => state.aadhaar.data);
  const aadhaar = useSelector((state) => state.aadhaar.number);
  const id = useSelector((state) => state.auth.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addCurrentScreen("AadhaarConfirm"));
  }, []);
  const backAlert = () =>
    Alert.alert(
      "Heading Back?",
      "If you continue to go back your OTP Aadhaar Verification would be invalid and you would have to redo it!",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "OK", onPress: () => navigation.navigate("AadhaarVerify") },
      ]
    );

  return (
    <SafeAreaView style={styles.container}>
      <AppBar
        title="Setup Profile"
        color="#4E46F1"
        leading={
          <IconButton
            icon={<Icon name="arrow-back" size={20} color="white" />}
            onPress={() => backAlert()}
          />
        }
      />
      <ProgressBarTop step={1} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Text style={form.OtpAwaitMsg}>
            Please confirm if these are your details
          </Text>
          <Text style={form.OtpAwaitMsg}>
            <Icon name="check-circle-outline" size={30} color="green" />
            Aadhaar Verified Successfully
          </Text>
          <Image
            source={{
              uri: `data:image/jpeg;base64,${aadhaarData["aadhaar_data"]["photo_base64"]}`,
            }}
            style={form.aadharimg}
          />
          {console.log(aadhaarData["aadhaar_data"])}
          <Text style={form.OtpAwaitMsg}>
            Name: {aadhaarData["aadhaar_data"]["name"]}
          </Text>
          <Text style={form.userData}>
            Date of Birth: {aadhaarData["aadhaar_data"]["date_of_birth"]}
          </Text>
          <Text style={form.userData}>
            Locality: {aadhaarData["aadhaar_data"]["locality"]}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Button
              title="No"
              type="solid"
              uppercase={false}
              style={form.noButton}
              color="#EB5757"
              onPress={() => {
                navigation.navigate("AadhaarForm");
              }}
            />
            <Button
              title="Yes"
              type="solid"
              uppercase={false}
              style={form.yesButton}
              color="#4E46F1"
              onPress={() => {
                aadhaarBackendPush({
                  type: "OTP",
                  status: "SUCCESS",
                  id: id,
                  aadhaar: aadhaar,
                  xml: aadhaarData["aadhaar_data"]["xml_base64"],
                  message: "",
                  data : aadhaarData["aadhaar_data"]
                });
                navigation.navigate("PanCardInfo");
              }}
            />
            <View style={bankform.padding}></View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
