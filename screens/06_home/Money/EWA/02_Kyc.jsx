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


const KYC = () => {

  let DeviceId = 0;
  let DeviceIp = 0;

  getUniqueId().then((id) => {
    DeviceId = id;
  });

  NetworkInfo.getIPV4Address().then((ipv4Address) => {
    DeviceIp = ipv4Address;
  });

  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  
  const data = useSelector((state) => state.aadhaar.data);
  const number = useSelector((state) => state.aadhaar.number);
  const unipeEmployeeId = useSelector((state) => state.auth.id);

  const ewaLiveSlice = useSelector((state) => state.ewaLive);
  
  useEffect(() => {
    ewaKycPush({
      offerId: ewaLiveSlice?.offerId, 
      unipeEmployeeId: unipeEmployeeId,
      status: "INPROGRESS",
      timestamp: Date.now(),
      ipAddress: DeviceIp,
      deviceId: DeviceId,
    })
    .then((response) => {
      console.log("ewaKycPush response.data: ", response.data);
    })
    .catch((error) => {
      console.log("ewaKycPush error: ", error);
      Alert.alert("An Error occured", error);
    });
  }, []);

  function handleKyc() {
    setLoading(true);
    ewaKycPush({
      offerId: ewaLiveSlice?.offerId,
      unipeEmployeeId: unipeEmployeeId,
      status: "CONFIRMED",
      timestamp: Date.now(),
      ipAddress: DeviceIp,
      deviceId: DeviceId,
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
    <SafeAreaView style={styles.container}>
      <AppBar
        title="KYC"
        color="#4E46F1"
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
