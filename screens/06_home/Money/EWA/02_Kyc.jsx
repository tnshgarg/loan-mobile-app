import { useEffect, useState } from "react";
import { AppBar, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import { Image, SafeAreaView, Text } from "react-native";
import { getUniqueId } from "react-native-device-info";
import { NetworkInfo } from "react-native-network-info";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import PrimaryButton from "../../../../components/PrimaryButton";
import { ewaKycPush } from "../../../../helpers/BackendPush";
import { form, styles } from "../../../../styles";
import { COLORS } from "../../../../constants/Theme";

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
    if(deviceId!==0 && ipAddress!==0) {
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
        navigation.navigate("EWA_AGREEMENT");
        setLoading(false);
      })
      .catch((error) => {
        console.log("ewaKycPush error: ", error);
        Alert.alert("An Error occured", error);
      });
  }

  return (
    <SafeAreaView style={[styles.container, { padding: 0 }]}>
      <AppBar
        title="KYC"
        color={COLORS.primary}
        leading={
          <IconButton
            icon={<Icon name="arrow-left" size={20} color="white" />}
            onPress={() => {
              navigation.navigate("EWA_OFFER");
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
        title={loading ? "Verifying" : "Continue"}
        color={COLORS.primary}
        uppercase={false}
        disabled={loading}
        onPress={() => {
          handleKyc();
        }}
      />
    </SafeAreaView>
  );
};

export default KYC;
