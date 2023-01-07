import { useNavigation } from "@react-navigation/core";
import Analytics from "appcenter-analytics";
import { useEffect, useState } from "react";
import { Alert, BackHandler, SafeAreaView, Text, View } from "react-native";
import { getUniqueId } from "react-native-device-info";
import { NetworkInfo } from "react-native-network-info";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../../components/atoms/Header";
import PrimaryButton from "../../../../components/atoms/PrimaryButton";
import { styles } from "../../../../styles";
import DetailsCard from "../../../../components/molecules/DetailsCard";
import { updateKyc } from "../../../../queries/ewa/kyc";
import { getBackendData } from "../../../../services/employees/employeeServices";
import { resetMandate } from "../../../../store/slices/mandateSlice";

const KYC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [fetched, setFetched] = useState(false);
  const [deviceId, setDeviceId] = useState(0);
  const [ipAddress, setIpAdress] = useState(0);

  const [loading, setLoading] = useState(false);
  const campaignId = useSelector((state) => state.campaign.ewaCampaignId || state.campaign.onboardingCampaignId);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const token = useSelector((state) => state.auth.token);
  const [mandateVerifyStatus, setMandateVerifyStatus] = useState(useSelector(
    (state) => state.mandate.verifyStatus
  ));
  const aadhaarData = useSelector((state) => state.aadhaar.data);
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
    if (unipeEmployeeId && deviceId !== 0 && ipAddress !== 0) {
      getBackendData({
        params: { unipeEmployeeId: unipeEmployeeId },
        xpath: "mandate",
        token: token,
      })
      .then((response) => {
        console.log("Form mandateFetch response.data", response.data);
        if (response.data.status === 200) {
          dispatch(resetMandate(response?.data?.body));
          setMandateVerifyStatus(response?.data?.body?.verifyStatus);
        }
        setFetched(true);
      })
      .catch((error) => {
        console.log("mandateFetch error: ", error);
      });
    }
  }, [unipeEmployeeId, deviceId, ipAddress]);

  const { mutateAsync: updateKycMutateAsync } = updateKyc();

  useEffect(() => {
    if (fetched) {
      updateKycMutateAsync({
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
          console.log("updateKycMutateAsync response.data: ", response.data);
        })
        .catch((error) => {
          console.log("updateKycMutateAsync error: ", error.toString());
          Alert.alert("An Error occured", error.toString());
        });
    }
  }, [fetched]);

  const backAction = () => {
    navigation.navigate("EWA_OFFER");
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  function handleKyc() {
    setLoading(true);
    updateKycMutateAsync({
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
        console.log("updateKycMutateAsync response.data: ", response.data);
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
        console.log("updateKycMutateAsync error: ", error.toString());
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
      { subTitle: "Name", value: aadhaarData?.name, fullWidth: true },
      { subTitle: "Date of Birth", value: aadhaarData?.date_of_birth },
      { subTitle: "Gender", value: aadhaarData?.gender },
      { subTitle: "Aadhaar Number", value: aadharNumber },
      { subTitle: "Pan Number", value: panNumber },
      { subTitle: "Address", value: aadhaarData?.address, fullWidth: true },
    ];
    return res;
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header title="KYC" onLeftIconPress={() => backAction()} progress={40} />
      <View style={styles.container}>
        <Text style={styles.headline}>Are these your Kyc details?</Text>
        <Text style={[styles.subHeadline, { marginBottom: 10 }]}>
          कृपया स्पष्ट करें की यहाँ दी गयी सारी जानकारी आपकी ही है?
        </Text>

        <DetailsCard
          data={cardData()}
          imageUri={{
            uri: `data:image/jpeg;base64,${aadhaarData["photo_base64"]}`,
            cache: "only-if-cached",
          }}
        />

        <View style={{ flex: 1 }} />

        <PrimaryButton
          title={loading ? "Verifying" : "Proceed"}
          disabled={loading || !fetched}
          onPress={() => {
            handleKyc();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default KYC;
