import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { Text, View, Image } from "react-native";
import { Button } from "@react-native-material/core";
import {
  addLicenseVerifyStatus,
  addLicenseVerifyMsg,
} from "../../store/slices/licenseSlice";
import { bankform, form, license, styles } from "../../styles";

export default Confirm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [backendPush, setBackendPush] = useState(false);
  const licenseSlice = useSelector((state) => state.license);
  const name = useSelector((state) => licenseSlice?.name);
  const number = useSelector((state) => licenseSlice?.number);
  const photo = useSelector((state) => licenseSlice?.photo);
  const bloodGroup = useSelector((state) => licenseSlice?.bloodGroup);
  const dob = useSelector((state) => licenseSlice?.dob);
  const validity = useSelector((state) => licenseSlice?.validity);
  const rto = useSelector((state) => licenseSlice?.rto);
  const classes = useSelector((state) => licenseSlice?.classes);
  const [verifyStatus, setVerifyStatus] = useState(licenseSlice?.verifyStatus);
  const [verifyMsg, setVerifyMsg] = useState(licenseSlice?.verifyMsg);
  useEffect(() => {
    dispatch(addLicenseVerifyMsg(verifyMsg));
  }, [verifyMsg]);

  useEffect(() => {
    dispatch(addLicenseVerifyStatus(verifyStatus));
  }, [verifyStatus]);

  return (
    <View style={styles.container}>
      <Text style={form.OtpAwaitMsg}>
        Are these your License details ?{"\n"}
      </Text>
      <Image
        source={{
          uri: `data:image/jpeg;base64,${photo}`,
        }}
        style={form.aadharimg}
      />
      <Text style={form.userData}>Number: {number}</Text>
      <Text style={form.userData}>Name: {name}</Text>
      <Text style={form.userData}>Date of Birth: {dob}</Text>
      <Text style={form.userData}>Blood Group: {bloodGroup}</Text>
      {classes.map((item, index) => (
        <View key={index} >
          <Text style={form.userData}>
            Class: {item["category"]}
          </Text>
          <Text style={license.authority}>
            {item["authority"]}
          </Text>
        </View>
      ))}
      {validity["non_transport"] ? (
        <>
          <Text style={form.userData}>
            Validity: {validity["non_transport"]["issue_date"]} to{" "}
            {validity["non_transport"]["expiry_date"]}
          </Text>
          <Text style={license.authority}>
            Non-Transport
          </Text>
        </>
      ) : null}
      {validity["transport"] ? (
        <>
        <Text style={form.userData}>
          Transport Validity: {validity["transport"]["issue_date"]} to{" "}
          {validity["transport"]["expiry_date"]}
        </Text>
        <Text style={license.authority}>
            Transport
          </Text>
        </>
      ) : null}

      <View style={{ flexDirection: "row" }}>
        <Button
          title="No"
          type="solid"
          uppercase={false}
          style={form.noButton}
          color="#EB5757"
          onPress={() => {
            setVerifyMsg("Rejected by User");
            navigation.navigate("Home", {
              screen: "Documents",
              params: {
                screen: "Drivers License",
              },
            });
          }}
        />
        <Button
          title="Yes"
          type="solid"
          uppercase={false}
          style={form.yesButton}
          color="#4E46F1"
          onPress={() => {
            setVerifyMsg("Confirmed by User");
            setVerifyStatus("SUCCESS");
            setBackendPush(true);
            navigation.navigate("Home", {
              screen: "Documents",
              params: {
                screen: "Drivers License",
              },
            });
          }}
        />
        <View style={bankform.padding}></View>
      </View>
    </View>
  );
};
