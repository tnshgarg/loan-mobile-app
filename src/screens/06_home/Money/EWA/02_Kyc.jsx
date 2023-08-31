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
  trackEvent,
} from "../../../../helpers/analytics/commonAnalytics";
import {
  EWA_POLLING_DURATION,
  KYC_POLLING_DURATION,
} from "../../../../services/constants";
import { useUpdateKycMutation } from "../../../../store/apiSlices/ewaApi";
import { useGetKycQuery } from "../../../../store/apiSlices/kycApi";
import { useGetMandateQuery } from "../../../../store/apiSlices/mandateApi";
import { addCurrentScreen } from "../../../../store/slices/navigationSlice";
import { styles } from "../../../../styles";

const KYC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [deviceId, setDeviceId] = useState(0);
  const [ipAddress, setIpAdress] = useState(0);

  const [loading, setLoading] = useState(false);
  const campaignId = useSelector(
    (state) =>
      state.campaign.ewaCampaignId || state.campaign.onboardingCampaignId
  );
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const token = useSelector((state) => state.auth.token);

  const { data: kycData } = useGetKycQuery(unipeEmployeeId, {
    pollingInterval: KYC_POLLING_DURATION,
  });
  const {
    data: mandateData,
    error,
    isLoading,
    refetch: fetchMandate,
  } = useGetMandateQuery(unipeEmployeeId, {
    pollingInterval: EWA_POLLING_DURATION,
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

  console.log("Mandate Error:", error?.status);
  useEffect(() => {
    fetchMandate().then(() => {
      if (mandateData?.verifyStatus == "SUCCESS") {
        updateKyc({
          offerId: ewaLiveSlice?.offerId,
          unipeEmployeeId: unipeEmployeeId,
          status: "INPROGRESS",
          timestamp: Date.now(),
          ipAddress: ipAddress,
          deviceId: deviceId,
          campaignId: campaignId,
        })
          .then((response) => {
            console.log("updateKycMutateAsync response.data: ", response.data);
          })
          .catch((error) => {
            console.log("updateKycMutateAsync error: ", error.message);
            Alert.alert("An Error occured", error.message);
          });
      }
    });
  }, []);

  useEffect(() => {
    trackEvent({
      interaction: InteractionTypes.BUTTON_PRESS,
      screen: "confirmKyc",
      action: "BACK",
    });
  }, []);

  const backAction = () => {
    trackEvent({
      interaction: InteractionTypes.BUTTON_PRESS,
      screen: "confirmKyc",
      action: "BACK",
    });
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
    let payload = {
      offerId: ewaLiveSlice?.offerId,
      unipeEmployeeId: unipeEmployeeId,
      status: "CONFIRMED",
      timestamp: Date.now(),
      ipAddress: ipAddress,
      deviceId: deviceId,
      campaignId: campaignId,
    };
    updateKyc(payload)
      .then((response) => {
        console.log(
          "updateKycMutateAsync response.data: ",
          response,
          mandateData
        );
        setLoading(false);
        Analytics.trackEvent({
          interaction: InteractionTypes.BUTTON_PRESS,
          screen: "confirmKyc",
          action: "SUCCESS",
        });
        if (mandateData?.verifyStatus === "SUCCESS") {
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
          screen: "confirmKyc",
          action: "ERROR",
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
          disabled={loading}
          onPress={() => {
            Analytics.trackEvent({
              interaction: InteractionTypes.BUTTON_PRESS,
              screen: "confirmKyc",
              action: "CONTINUE",
            });
            handleKyc();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default KYC;
