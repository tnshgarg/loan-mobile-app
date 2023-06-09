import { useNavigation } from "@react-navigation/core";
import analytics from "@react-native-firebase/analytics";
import { useEffect, useState } from "react";
import { Alert, BackHandler, SafeAreaView, Text, View } from "react-native";
import { getUniqueId } from "react-native-device-info";
import { NetworkInfo } from "react-native-network-info";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../../components/atoms/Header";
import PrimaryButton from "../../../../components/atoms/PrimaryButton";
import DetailsCard from "../../../../components/molecules/DetailsCard";
import { useUpdateKycMutation } from "../../../../store/apiSlices/ewaApi";
import { useGetMandateQuery } from "../../../../store/apiSlices/mandateApi";
import {
  addVerifyStatus,
  resetMandate,
} from "../../../../store/slices/mandateSlice";
import { styles } from "../../../../styles";
import { addCurrentScreen } from "../../../../store/slices/navigationSlice";
import LogoHeaderBack from "../../../../components/molecules/LogoHeaderBack";
import { useGetKycQuery } from "../../../../store/apiSlices/kycApi";

const KYC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [fetched, setFetched] = useState(false);
  const [deviceId, setDeviceId] = useState(0);
  const [ipAddress, setIpAdress] = useState(0);

  const [loading, setLoading] = useState(false);
  const campaignId = useSelector(
    (state) =>
      state.campaign.ewaCampaignId || state.campaign.onboardingCampaignId
  );
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const token = useSelector((state) => state.auth.token);
  const [mandateVerifyStatus, setMandateVerifyStatus] = useState(
    useSelector((state) => state.mandate.verifyStatus)
  );

  const { data: kycData } = useGetKycQuery(unipeEmployeeId, {
    pollingInterval: 1000 * 60 * 60 * 24,
  });
  const { aadhaar, pan, bank, profile } = kycData ?? {};

  const ewaLiveSlice = useSelector((state) => state.ewaLive);
  const [updateKyc] = useUpdateKycMutation();

  useEffect(() => {
    getUniqueId().then((id) => {
      setDeviceId(id);
    });
    NetworkInfo.getIPV4Address().then((ipv4Address) => {
      setIpAdress(ipv4Address);
    });
    dispatch(addCurrentScreen("EWA_KYC"));
  }, []);
  const { data, error, isLoading } = useGetMandateQuery(unipeEmployeeId, {
    pollingInterval: 1000 * 60 * 2,
  });
  useEffect(() => {
    if (unipeEmployeeId && deviceId !== 0 && ipAddress !== 0) {
      if (data && !isLoading && !error) {
        console.log("Form mandateFetch response.data", data);
        dispatch(resetMandate(data?.body));
        dispatch(addVerifyStatus(data?.body?.verifyStatus));
        setMandateVerifyStatus(data?.body?.verifyStatus);
        setFetched(true);
      } else {
        console.log("mandateFetch error: ", error);
        Alert.alert("An Error occured", error.message);
      }
    }
  }, [deviceId, ipAddress]);

  useEffect(() => {
    if (fetched) {
      let data = {
        offerId: ewaLiveSlice?.offerId,
        unipeEmployeeId: unipeEmployeeId,
        status: "INPROGRESS",
        timestamp: Date.now(),
        ipAddress: ipAddress,
        deviceId: deviceId,
        campaignId: campaignId,
      };
      updateKyc(data)
        .then((response) => {
          console.log("updateKycMutateAsync response.data: ", response.data);
        })
        .catch((error) => {
          console.log("updateKycMutateAsync error: ", error.message);
          Alert.alert("An Error occured", error.message);
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
    let data = {
      offerId: ewaLiveSlice?.offerId,
      unipeEmployeeId: unipeEmployeeId,
      status: "CONFIRMED",
      timestamp: Date.now(),
      ipAddress: ipAddress,
      deviceId: deviceId,
      campaignId: campaignId,
    };
    updateKyc(data)
      .then((response) => {
        console.log("updateKycMutateAsync response.data: ", response.data);
        setLoading(false);
        analytics().logEvent("Ewa_Kyc_Success", {
          unipeEmployeeId: unipeEmployeeId,
        });
        if (mandateVerifyStatus === "SUCCESS") {
          navigation.navigate("EWA_AGREEMENT");
        } else {
          navigation.navigate("EWA_MANDATE");
        }
      })
      .catch((error) => {
        console.log("updateKycMutateAsync error: ", error.message);
        setLoading(false);
        Alert.alert("An Error occured", error.message);
        analytics().logEvent("Ewa_Kyc_Error", {
          unipeEmployeeId: unipeEmployeeId,
          error: error.message,
        });
      });
  }

  const cardData = () => {
    let res = [
      { subTitle: "Name", value: aadhaar?.data?.name, fullWidth: true },
      { subTitle: "Aadhaar Number", value: aadhaar?.number },
      { subTitle: "Pan Number", value: pan.number },
      { subTitle: "Date of Birth", value: aadhaar?.data?.date_of_birth },
      { subTitle: "Gender", value: aadhaar?.data?.gender },
      { subTitle: "Address", value: aadhaar?.data?.address, fullWidth: true },
    ];
    return res;
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LogoHeaderBack
        title={"Confirm KYC"}
        onLeftIconPress={() => backAction()}
        subHeadline={"Please confirm if these are your details"}
      />

      <View style={styles.container}>
        <DetailsCard
          data={cardData()}
          type={"Aadhaar"}
          imageUri={{
            uri: `data:image/jpeg;base64,${aadhaar?.data?.["photo_base64"]}`,
            cache: "only-if-cached",
          }}
        />

        <View style={{ flex: 1 }} />

        <PrimaryButton
          title={loading ? "Verifying" : "I confirm my KYC"}
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
