import { useNavigation } from "@react-navigation/core";
import Analytics from "appcenter-analytics";
import { useEffect, useState } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import { getUniqueId } from "react-native-device-info";
import { NetworkInfo } from "react-native-network-info";
import { useSelector } from "react-redux";
import Header from "../../../../components/atoms/Header";
import PrimaryButton from "../../../../components/PrimaryButton";
import { ewaKycPush } from "../../../../helpers/BackendPush";
import { form, styles } from "../../../../styles";


const KYC = () => {
  const navigation = useNavigation();

  const [fetched, setFetched] = useState(false);
  const [deviceId, setDeviceId] = useState(0);
  const [ipAddress, setIpAdress] = useState(0);

  const [loading, setLoading] = useState(false);
  const data = useSelector((state) => state.aadhaar.data);
  const number = useSelector((state) => state.aadhaar.number);
  const unipeEmployeeId = useSelector((state) => state.auth.id);

  const ewaLiveSlice = useSelector((state) => state.ewaLive);

  useEffect(() => {
    getUniqueId().then((id) => {
      setDeviceId(id);
    });
    NetworkInfo.getIPV4Address().then((ipv4Address) => {
      setIpAdress(ipv4Address);
    });
  }, []);

  useEffect(() => {
    if (deviceId !== 0 && ipAddress !== 0) {
      setFetched(true);
    }
  }, [deviceId, ipAddress]);

  useEffect(() => {
    if (fetched) {
      ewaKycPush({
        offerId: ewaLiveSlice?.offerId,
        unipeEmployeeId: unipeEmployeeId,
        status: "INPROGRESS",
        timestamp: Date.now(),
        ipAddress: ipAddress,
        deviceId: deviceId,
      })
        .then((response) => {
          console.log("ewaKycPush response.data: ", response.data);
        })
        .catch((error) => {
          console.log("ewaKycPush error: ", error);
          Alert.alert("An Error occured", error);
        });
    }
  }, [fetched]);

  function handleKyc() {
    setLoading(true);
    ewaKycPush({
      offerId: ewaLiveSlice?.offerId,
      unipeEmployeeId: unipeEmployeeId,
      status: "CONFIRMED",
      timestamp: Date.now(),
      ipAddress: ipAddress,
      deviceId: deviceId,
    })
      .then((response) => {
        console.log("ewaKycPush response.data: ", response.data);
        Analytics.trackEvent("Ewa|Kyc|Success", {
          userId: unipeEmployeeId,
        });
        setLoading(false);
        navigation.navigate("EWA_AGREEMENT");
      })
      .catch((error) => {
        console.log("ewaKycPush error: ", error);
        Alert.alert("An Error occured", error);
        Analytics.trackEvent("Ewa|Kyc|Error", {
          userId: unipeEmployeeId,
          error: error,
        });
      });
  }

  return (
    <SafeAreaView style={[styles.container, { padding: 0 }]}>
      <Header
        title="KYC"
        onLeftIconPress={() => navigation.navigate("EWA_OFFER")}
      />
      <View style={styles.container}>
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
          title={loading ? "Verifying" : "Continue"}
          disabled={loading}
          onPress={() => {
            handleKyc();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default KYC;
