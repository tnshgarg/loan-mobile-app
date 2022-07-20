import { AppBar, Button, Icon, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import { useSelector } from "react-redux";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import ProgressBarTop from "../../components/ProgressBarTop";
import { GenerateDocument } from "../../helpers/GenerateDocument";
import { putAadhaarData } from "../../services/employees/employeeServices";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { bankform, form, styles } from "../../styles";

export default AadhaarConfirm = () => {
  const navigation = useNavigation();
  const AadhaarData = useSelector((state) => state.aadhaar.aadhaarData);
  const aadhaar = useSelector((state) => state.aadhaar.aadhaar);
  const id = useSelector((state) => state.auth.userId);

  useEffect(() => {dispatch(addCurrentScreen("AadhaarConfirm"))}, []);
  const onConfirm = () => {
    var aadhaarPayload = GenerateDocument({
      src: "AadhaarOTP",
      id: id,
      aadhaar: aadhaar,
      xml: AadhaarData["aadhaar_data"]["xml_base64"],
    });
    putAadhaarData(aadhaarPayload)
      .then((res) => {
        console.log(aadhaarPayload);
        console.log(res.data);
        if (res.data["message"]) {
          Alert.alert("Message", res.data["message"]);
        }
        navigation.navigate("PanCardInfo");
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        { text: "OK", onPress: () => navigation.goBack() },
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
              uri: `data:image/jpeg;base64,${AadhaarData["aadhaar_data"]["photo_base64"]}`,
            }}
            style={form.aadharimg}
          />
          {console.log(AadhaarData["aadhaar_data"])}
          <Text style={form.OtpAwaitMsg}>
            Name: {AadhaarData["aadhaar_data"]["name"]}
          </Text>
          <Text style={form.userData}>
            Date of Birth: {AadhaarData["aadhaar_data"]["date_of_birth"]}
          </Text>
          <Text style={form.userData}>
            Locality: {AadhaarData["aadhaar_data"]["locality"]}
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
                onConfirm();
              }}
            />
            <View style={bankform.padding}></View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
