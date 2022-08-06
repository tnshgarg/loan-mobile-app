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
import ProgressBarTop from "../../../components/ProgressBarTop";
import { addCurrentScreen } from "../../../store/slices/navigationSlice";
import { aadhaarBackendPush } from "../../../helpers/BackendPush";
import { bankform, form, styles } from "../../../styles";

export default AadhaarConfirmOCR = () => {
  const navigation = useNavigation();
  const aadhaarFront = useSelector((state) => state.aadhaar.frontImg);
  const frontAadhaarData = useSelector((state) => state.aadhaar.frontData);
  const backAadhaarData = useSelector((state) => state.aadhaar.backData);
  const id = useSelector((state) => state.auth.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addCurrentScreen("AadhaarConfirm"));
  }, []);
  const backAlert = () =>
    Alert.alert(
      "Heading Back?",
      "If you continue to go back your OCR Aadhaar Verification would be invalid and you would have to redo it!",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "OK", onPress: () => navigation.navigate("AadhaarForm") },
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
              uri: `data:image/jpeg;base64,${aadhaarFront}}`,
            }}
            style={form.aadharimg}
          />
          <Text style={form.userData}>Name: {frontAadhaarData["name"]}</Text>
          <Text style={form.userData}>
            Date of Birth: {frontAadhaarData["date_of_birth"]}
          </Text>
          <Text style={form.userData}>
            Address: {backAadhaarData["address"]}
          </Text>
          <View style={{ flexDirection: "row", marginBottom: 50 }}>
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
                {
                  aadhaarBackendPush({
                    type: "OCR",
                    status: "SUCCESS",
                    id: id,
                    frontAadhaarData: frontAadhaarData,
                    backAadhaarData: backAadhaarData,
                    message: "",
                  });
                }
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
