import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import { bankform, form, styles } from "../../styles";
import Verify from "../../apis/license/Verify";
import DateEntry from "../../components/DateEntry";
import { addNumber } from "../../store/slices/licenseSlice";
import FormInput from "../../components/atoms/FormInput";
import InfoCard from "../../components/atoms/InfoCard";

const LicenseFormTemplate = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [validNumber, setValidNumber] = useState(true);

  const licenseSlice = useSelector((state) => state.license);
  const [dob, setDob] = useState("");
  const [number, setNumber] = useState(licenseSlice?.number);

  useEffect(() => {
    var licenseReg = /^([A-Z]{2})(\d{2}|\d{3})[a-zA-Z]{0,1}(\d{4})(\d{7})$/gm;
    if (licenseReg.test(number)) {
      dispatch(addNumber(number));
      setValidNumber(true);
    } else {
      setValidNumber(false);
    }
  }, [number]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingWrapper>
        <View>
          <FormInput
            placeholder={"Enter License Number"}
            containerStyle={{ marginVertical: 10 }}
            value={number}
            onChange={setNumber}
            autoCapitalize="characters"
          />
          {number && !validNumber ? (
            <Text style={bankform.formatmsg}>Invalid License Number.</Text>
          ) : null}
          <DateEntry
            title="Date of birth as recorded in License"
            val={dob}
            setval={setDob}
          />
          <InfoCard
            info={
              "License is needed to verify your eligibility to operate heavy machinery."
            }
          />

          <Verify
            url={"https://api.gridlines.io/dl-api/fetch"}
            data={{
              driving_license_number: number,
              date_of_birth: dob,
              consent: "Y",
            }}
            disabled={!validNumber}
          />
        </View>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
};

export default LicenseFormTemplate;
