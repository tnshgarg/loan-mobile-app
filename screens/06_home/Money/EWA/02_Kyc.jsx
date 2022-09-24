import { AppBar, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, Text } from "react-native";
import { getUniqueId } from "react-native-device-info";
import { NetworkInfo } from "react-native-network-info";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector, useDispatch } from "react-redux";
import PrimaryButton from "../../../../components/PrimaryButton";
import { ewaKycPush } from "../../../../helpers/BackendPush";
import { addStatus } from "../../../../store/slices/ewaSlice";
import { form, styles } from "../../../../styles";

const KYC = () => {
  let DeviceId = 0;
  getUniqueId().then((id) => {
    DeviceId = id;
  });
  let DeviceIp = 0;
  NetworkInfo.getIPV4Address().then((ipv4Address) => {
    DeviceIp = ipv4Address;
  });
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.aadhaar.data);
  const number = useSelector((state) => state.aadhaar.number);
  const [status, setStatus] = useState(
    useSelector((state) => state.ewa.status.kyc)
  );
  const employeeId = useSelector((state) => state.auth.id);
  useEffect(() => {
    status === "PENDING"
      ? ewaKycPush({
          offerId: employeeId, //change to offerID
          unipeEmployeeId: employeeId,
          status: "INPROGRESS",
          timestamp: Date.now(),
          ipAddress: DeviceIp,
          deviceId: DeviceId,
        })
      : null;
  }, []);

  function handleKyc() {
    dispatch(addStatus({ type: "kyc", data: "CONFIRMED" }));
    ewaKycPush({
      offerId: employeeId, //change to offerID
      unipeEmployeeId: employeeId,
      status: "CONFIRMED",
      timestamp: Date.now(),
      ipAddress: DeviceIp,
      deviceId: DeviceId,
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppBar
        title="KYC"
        color="#4E46F1"
        leading={
          <IconButton
            icon={<Icon name="arrow-left" size={20} color="white" />}
            onPress={() => {
              navigation.navigate("EWAOffer");
            }}
          />
        }
      />
      <Text style={form.OtpAwaitMsg}>
        Are these your AADHAAR details ?{"\n"}
      </Text>
      <Image
        source={{
          uri: `data:image/jpeg;base64,${data["photo_base64"]}`,
        }}
        style={form.aadharimg}
      />
      <Text style={form.userData}>Number: {number}</Text>
      <Text style={form.userData}>Name: {data.name}</Text>
      <Text style={form.userData}>Date of Birth: {data.date_of_birth}</Text>
      <Text style={form.userData}>Gender: {data.gender}</Text>
      <Text style={form.userData}>Address: {data.address}</Text>

      <PrimaryButton
        title="My Details are Correct"
        uppercase={false}
        onPress={() => {
          handleKyc();
          navigation.navigate("EWAAgreement");
        }}
      />
    </SafeAreaView>
  );
};

export default KYC;
