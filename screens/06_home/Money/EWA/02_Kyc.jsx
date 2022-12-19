import { useNavigation } from "@react-navigation/core";
import Analytics from "appcenter-analytics";
import { useEffect, useState } from "react";
import { Alert, BackHandler, SafeAreaView, Text, View } from "react-native";
import { getUniqueId } from "react-native-device-info";
import { NetworkInfo } from "react-native-network-info";
import { useSelector } from "react-redux";
import Header from "../../../../components/atoms/Header";
import PrimaryButton from "../../../../components/atoms/PrimaryButton";
import { ewaKycPush } from "../../../../helpers/BackendPush";
import { getBackendData } from "../../../../services/employees/employeeServices";
import { styles } from "../../../../styles";
import DetailsCard from "../../../../components/molecules/DetailsCard";

const KYC = () => {
  const navigation = useNavigation();

  const [fetched, setFetched] = useState(false);
  const [deviceId, setDeviceId] = useState(0);
  const [ipAddress, setIpAdress] = useState(0);

  const [creditPass, setCreditPass] = useState("PENDING");
  const [loading, setLoading] = useState(false);
  const campaignId = useSelector((state) => state.auth.campaignId);
  const mandateVerifyStatus = useSelector(
    (state) => state.mandate.verifyStatus
  );
  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const data = useSelector((state) => state.aadhaar.data);
  const aadharNumber = useSelector((state) => state.aadhaar.number);
  const panNumber = useSelector((state) => state.pan.number);
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

  const backAction = () => {
    navigation.navigate("EWA_OFFER");
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  useEffect(() => {
    if (unipeEmployeeId) {
      getBackendData({
        params: { unipeEmployeeId: unipeEmployeeId },
        xpath: "risk-profile",
        token: token,
      })
        .then((response) => {
          console.log("riskProfileBackendFetch response.data", response.data);
          if (response.data.status === 200) {
            setCreditPass(response.data.body.pass);
          }
        })
        .catch((error) => {
          console.log("riskProfileBackendFetch error: ", error);
        });
    }
  }, [unipeEmployeeId]);

  useEffect(() => {
    if (fetched) {
      ewaKycPush({
        data: {
          offerId: ewaLiveSlice?.offerId,
          unipeEmployeeId: unipeEmployeeId,
          status: "INPROGRESS",
          timestamp: Date.now(),
          ipAddress: ipAddress,
          deviceId: deviceId,
          campaignId: campaignId,
        },
        token: token,
      })
        .then((response) => {
          console.log("ewaKycPush response.data: ", response.data);
        })
        .catch((error) => {
          console.log("ewaKycPush error: ", error.toString());
          Alert.alert("An Error occured", error.toString());
        });
    }
  }, [fetched]);

  function handleKyc() {
    setLoading(true);
    ewaKycPush({
      data: {
        offerId: ewaLiveSlice?.offerId,
        unipeEmployeeId: unipeEmployeeId,
        status: "CONFIRMED",
        timestamp: Date.now(),
        ipAddress: ipAddress,
        deviceId: deviceId,
        campaignId: campaignId,
      },
      token: token,
    })
      .then((response) => {
        console.log("ewaKycPush response.data: ", response.data);
        setLoading(false);
        Analytics.trackEvent("Ewa|Kyc|Success", {
          unipeEmployeeId: unipeEmployeeId,
        });
        if (mandateVerifyStatus === "SUCCESS") {
          navigation.navigate("EWA_AGREEMENT");
        } else {
          navigation.navigate("EWA_MANDATE");
        }
      })
      .catch((error) => {
        console.log("ewaKycPush error: ", error.toString());
        setLoading(false);
        Alert.alert("An Error occured", error.toString());
        Analytics.trackEvent("Ewa|Kyc|Error", {
          unipeEmployeeId: unipeEmployeeId,
          error: error.toString(),
        });
      });
  }

  const cardData = () => {
    var res = [
      { subTitle: "Name", value: data?.name, fullWidth: true },
      { subTitle: "Date of Birth", value: data?.date_of_birth },
      { subTitle: "Gender", value: data?.gender },
      { subTitle: "Aadhaar Number", value: aadharNumber },
      { subTitle: "Pan Number", value: panNumber },
      { subTitle: "Address", value: data?.address, fullWidth: true },
    ];
    return res;
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header title="KYC" onLeftIconPress={() => backAction()} />
      <View style={styles.container}>
        <Text style={styles.headline}>Are these your Kyc details?</Text>
        <Text style={[styles.subHeadline, { marginBottom: 10 }]}>
          कृपया स्पष्ट करें की यहाँ दी गयी सारी जानकारी आपकी ही है?
        </Text>

        <DetailsCard
          data={cardData()}
          imageUri={{
            uri: `data:image/jpeg;base64,${data["photo_base64"]}`,
            cache: "only-if-cached",
          }}
        />

        <View style={{ flex: 1 }} />

        <PrimaryButton
          title={
            creditPass === "PENDING"
              ? "Checking Credit Bureau"
              : creditPass === "DECLINED"
              ? "Credit Declined"
              : loading
              ? "Verifying"
              : "Proceed"
          }
          disabled={creditPass !== "SUCCESS" || loading}
          loading={loading}
          onPress={() => {
            handleKyc();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default KYC;
