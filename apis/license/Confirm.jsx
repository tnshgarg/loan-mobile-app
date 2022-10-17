import { Button, Icon } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addVerifyMsg, addVerifyStatus } from "../../store/slices/licenseSlice";
import { licenseBackendPush } from "../../helpers/BackendPush";
import { form, license, styles, selfie } from "../../styles";
import { COLORS } from "../../constants/Theme";
import { useSelector } from "react-redux";
import Analytics from 'appcenter-analytics';

export default Confirm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [backendPush, setBackendPush] = useState(false);

  const id = useSelector((state) => state.auth.id);
  const data = useSelector((state) => state.license.data);
  const number = useSelector((state) => state.license.number);
  const verifyTimestamp = useSelector((state) => state.license.verifyTimestamp);

  const licenseSlice = useSelector((state) => state.license);
  const [verifyMsg, setVerifyMsg] = useState(licenseSlice?.verifyMsg);
  const [verifyStatus, setVerifyStatus] = useState(licenseSlice?.verifyStatus);
  const classes = data?.vehicle_class_details;

  useEffect(() => {
    dispatch(addVerifyMsg(verifyMsg));
  }, [verifyMsg]);

  useEffect(() => {
    dispatch(addVerifyStatus(verifyStatus));
  }, [verifyStatus]);

  useEffect(() => {
    console.log("licenseSlice : ", licenseSlice);
    if (backendPush) {
      licenseBackendPush({
        id: id,
        data: data,
        verifyMsg: verifyMsg,
        verifyStatus: verifyStatus,
        verifyTimestamp: verifyTimestamp,
      });
    }
    setBackendPush(false);
  }, [backendPush]);

  const isDateValid = (expiry_date) => {
    return new Date(expiry_date) > new Date();
  };

  return (
    <View style={styles.container}>
      <Text style={form.OtpAwaitMsg}>
        Are these your License details ?{"\n"}
      </Text>
      {data?.photo_base64 ? (
        <Image
          source={{
            uri: `data:image/jpeg;base64,${data?.photo_base64}`,
          }}
          style={form.aadharimg}
        />
      ) : (
        <Icon
          name="perm-identity"
          size={300}
          color="grey"
          style={selfie.selfie}
        />
      )}
      <Text style={form.userData}>Number: {number}</Text>
      <Text style={form.userData}>Name: {data?.name}</Text>
      <Text style={form.userData}>Date of Birth: {data?.date_of_birth}</Text>
      <Text style={form.userData}>Blood Group: {data?.bloodGroup || "NA"}</Text>
      {classes.map((item, index) => (
        <View key={index}>
          <Text style={form.userData}>Class: {item["category"]}</Text>
          <Text style={license.authority}>{item["authority"]}</Text>
        </View>
      ))}

      {data?.validity?.non_transport ? (
        <>
          <Text style={form.userData}>
            Validity: {data?.validity?.non_transport?.issue_date} to{" "}
            {data?.validity?.non_transport?.expiry_date}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={license.authority}>Non-Transport</Text>
            {isDateValid(data?.validity?.non_transport?.expiry_date) ? (
              <Text style={license.valid}>Valid</Text>
            ) : (
              <Text style={license.invalid}>Invalid</Text>
            )}
          </View>
        </>
      ) : null}

      {data?.validity?.transport ? (
        <>
          <Text style={form.userData}>
            Transport Validity: {data?.validity?.transport?.issue_date} to{" "}
            {data?.validity?.transport?.expiry_date}
          </Text>{" "}
          <View style={{ flexDirection: "row" }}>
            <Text style={license.authority}>Transport</Text>
            {isDateValid(data?.validity?.transport?.expiry_date) ? (
              <Text style={license.valid}>Valid</Text>
            ) : (
              <Text style={license.invalid}>Invalid</Text>
            )}
          </View>
        </>
      ) : null}

      <View
        style={{
          alignSelf: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <Button
          title="No"
          type="solid"
          uppercase={false}
          style={form.noButton}
          color={COLORS.warning}
          onPress={() => {
            setVerifyMsg("Rejected by User");
            Analytics.trackEvent('LicenseInfo unConfirmed', { Category: 'Onboarding', userId: id, error:"Rejected by User" });
            navigation.navigate("Documents", {
              screen: "Driving License",
              params: {
                screen: "Form",
              },
            });
          }}
        />
        <Button
          title="Yes"
          type="solid"
          uppercase={false}
          style={form.yesButton}
          color={COLORS.primary}
          onPress={() => {
            setVerifyMsg("Confirmed by User");
            Analytics.trackEvent('LicenseInfo Confirmed', { Category: 'Onboarding', userId: id});
            setVerifyStatus("SUCCESS");
            setBackendPush(true);
            navigation.navigate("Documents", {
              screen: "Driving License",
            });
          }}
        />
      </View>
    </View>
  );
};
