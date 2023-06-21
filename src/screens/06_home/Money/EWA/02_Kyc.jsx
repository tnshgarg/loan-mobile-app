import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Alert, BackHandler, SafeAreaView, View } from "react-native";
import { getUniqueId } from "react-native-device-info";
import { NetworkInfo } from "react-native-network-info";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../../../../components/atoms/PrimaryButton";
import DetailsCard from "../../../../components/molecules/DetailsCard";
import LogoHeaderBack from "../../../../components/molecules/LogoHeaderBack";
import { strings } from "../../../../helpers/Localization";
import Analytics, {
  InteractionTypes,
} from "../../../../helpers/analytics/commonAnalytics";
import { useUpdateKycMutation } from "../../../../store/apiSlices/ewaApi";
import { useGetKycQuery } from "../../../../store/apiSlices/kycApi";
import { useGetMandateQuery } from "../../../../store/apiSlices/mandateApi";
import {
  addVerifyStatus,
  resetMandate,
} from "../../../../store/slices/mandateSlice";
import { addCurrentScreen } from "../../../../store/slices/navigationSlice";
import { styles } from "../../../../styles";

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
        Analytics.trackEvent({
          component: "Ewa",
          action: "Kyc",
          status: "Success",
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
        Analytics.trackEvent({
          interaction: InteractionTypes.BUTTON_PRESS,
          component: "Ewa",
          action: "Kyc",
          status: "Error",
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
        title={strings.confirmKyc}
        onLeftIconPress={() => backAction()}
        subHeadline={strings.confirmIfTheseDetails}
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
          title={loading ? strings.verifying : strings.confirmMyKyc}
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
