import { Button, Icon } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Alert, SafeAreaView, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAvoidingWrapper } from "../../../KeyboardAvoidingWrapper";
import { bankform, form, styles } from "../../../styles";

import Fetch from "../../../apis/license/Fetch";
import { addDob, addLicenseNumber } from "../../../store/slices/licenseSlice";
import DateEntry from "../../../components/DateEntry";

export default LicenseForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [validNumber, setValidNumber] = useState(true);
  const [dob, setDob] = useState(licenseSlice?.dob);
  const licenseSlice = useSelector((state) => state.license);
  const [number, setNumber] = useState(licenseSlice?.number);

  useEffect(() => {
    var licenseReg = /^([A-Z]{2})(\d{2}|\d{3})[a-zA-Z]{0,1}(\d{4})(\d{7})$/gm;
    if (licenseReg.test(number)) {
      dispatch(addLicenseNumber(number));
      setValidNumber(true);
    } else {
      setValidNumber(false);
    }
  }, [number]);

  const SkipLicense = () => {
    Alert.alert(
      "License Verification pending",
      `You have not completed License Verification.`
    );
    navigation.navigate("Home");
  };

  useEffect(() => {
    dispatch(addDob(dob));
  }, [dob]);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingWrapper>
          <View>
            <Text style={form.formLabel}>Enter License Number</Text>
            <TextInput
              style={form.formTextInput}
              autoCapitalize="characters"
              value={number}
              onChangeText={setNumber}
              placeholder="Enter License Number"
              required
            />
            {number && !validNumber ? (
              <Text style={bankform.formatmsg}>Invalid License Number.</Text>
            ) : null}
            <DateEntry
              title="Date of birth as recorded in License"
              val={dob}
              setval={setDob}
            />
            <View style={bankform.infoCard}>
              <Icon name="info-outline" size={20} color="#4E46F1" />
              <Text style={bankform.infoText}>
                License is needed to verify your eligibility to operate heavy
                machinery.
              </Text>
            </View>

            <Fetch
              url={"https://api.gridlines.io/dl-api/fetch"}
              data={{
                driving_license_number: number,
                date_of_birth: dob,
                consent: "Y",
              }}
              style={form.skipButton}
              disabled={!validNumber}
            />

            <Button
              title="Skip"
              uppercase={false}
              type="solid"
              color="#4E46F1"
              style={form.skipButton}
              onPress={() => {
                SkipLicense();
              }}
            />
          </View>
        </KeyboardAvoidingWrapper>
      </SafeAreaView>
    </>
  );
};
