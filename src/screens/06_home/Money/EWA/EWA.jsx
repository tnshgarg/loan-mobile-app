import { STAGE } from "@env";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { BackHandler, SafeAreaView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import LogoHeaderBack from "../../../../components/molecules/LogoHeaderBack";
import PastDrawsCard from "../../../../components/molecules/PastDrawsCard";
import VerifyMandateCard from "../../../../components/molecules/VerifyMandateCard";
import LiveOfferCard from "../../../../components/organisms/LiveOfferCard";
import { navigationHelper } from "../../../../helpers/CmsNavigationHelper";
import { getNumberOfDays } from "../../../../helpers/DateFunctions";
import {
  InteractionTypes,
  setSessionValue,
  trackEvent,
} from "../../../../helpers/analytics/commonAnalytics";
import { EWA_POLLING_DURATION } from "../../../../services/constants";
import { useGetOffersQuery } from "../../../../store/apiSlices/ewaApi";
import { useGetMandateQuery } from "../../../../store/apiSlices/mandateApi";
import { resetEwaHistorical } from "../../../../store/slices/ewaHistoricalSlice";
import {
  addAccessible,
  addEligible,
  resetEwaLive,
} from "../../../../store/slices/ewaLiveSlice";
import { styles } from "../../../../styles";

import { Text } from "react-native";
// import PushNotification from 'react-native-push-notification';
import { COLORS, FONTS } from "../../../../constants/Theme";
import { strings } from "../../../../helpers/Localization";

const EWA = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [fetched, setFetched] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);

  // const panMisMatch = useSelector((state) => state.pan.misMatch);
  // const bankMisMatch = useSelector((state) => state.bank.misMatch);

  const ewaLiveSlice = useSelector((state) => state.ewaLive);
  const ewaHistoricalSlice = useSelector((state) => state.ewaHistorical);

  const [eligible, setEligible] = useState(ewaLiveSlice?.eligible);
  const [accessible, setAccessible] = useState(ewaLiveSlice?.accessible);
  const {
    data: mandateData,
    error,
    isLoading,
  } = useGetMandateQuery(unipeEmployeeId);

  const backAction = () => {
    trackEvent({
      interaction: InteractionTypes.BUTTON_PRESS,
      screen: "money",
      action: "BACK",
    });
    navigation.navigate("EWA", { replace: true });
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  useEffect(() => {
    dispatch(addEligible(eligible));
  }, [eligible]);

  useEffect(() => {
    if (
      STAGE !== "prod" ||
      (STAGE === "prod" && parseInt(ewaLiveSlice?.eligibleAmount) >= 1000)
    ) {
      console.log("first");
      setEligible(true);
    } else {
      setEligible(false);
    }
  }, [ewaLiveSlice, fetched]);

  useEffect(() => {
    dispatch(addAccessible(accessible));
  }, [accessible]);

  const {
    isSuccess: getEwaOffersIsSuccess,
    isError: getEwaOffersIsError,
    error: getEwaOffersError,
    data: getEwaOffersData,
  } = useGetOffersQuery(unipeEmployeeId, {
    pollingInterval: EWA_POLLING_DURATION,
  });

  useEffect(() => {
    if (isFocused && getEwaOffersIsSuccess) {
      if (getEwaOffersData.status === 200) {
        if (Object.keys(getEwaOffersData.body.live).length !== 0) {
          const closureDays = getNumberOfDays({
            date: getEwaOffersData.body.live.dueDate,
          });
          if (closureDays <= 3) {
            setAccessible(false);
          } else {
            setAccessible(true);
          }
        } else {
          setAccessible(false);
        }
        dispatch(resetEwaLive(getEwaOffersData.body.live));
        dispatch(resetEwaHistorical(getEwaOffersData.body.past));
        setFetched(true);
      } else {
        console.log(
          "Money ewaOffersFetch API error getEwaOffersData.data : ",
          getEwaOffersData
        );
        dispatch(resetEwaLive());
        dispatch(resetEwaHistorical());
      }
    } else if (getEwaOffersIsError) {
      console.log(
        "Money ewaOffersFetch API error getEwaOffersError.message : ",
        getEwaOffersError.message
      );
      dispatch(resetEwaLive());
      dispatch(resetEwaHistorical());
    }
  }, [getEwaOffersIsSuccess, getEwaOffersData, isFocused]);

  useEffect(() => {
    setSessionValue("flow", "money");
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LogoHeaderBack
        title={`Money`}
        onRightIconPress={() => {
          trackEvent({
            interaction: InteractionTypes.BUTTON_PRESS,
            screen: "money",
            action: "HELP",
          });
          navigationHelper({
            type: "cms",
            params: { blogKey: "customer_support" },
          });
        }}
        containerStyle={{
          backgroundColor: null,
        }}
      />
      <View style={styles.container}>
        <LiveOfferCard
          eligible={eligible}
          accessible={accessible}
          ewaLiveSlice={ewaLiveSlice}
        />
        <VerifyMandateCard mandateVerifyStatus={mandateData?.verifyStatus} />
        <PastDrawsCard screenType="half" data={ewaHistoricalSlice} />
      </View>
      <View
          style={{
            width: "100%",
            backgroundColor: COLORS.primary,
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
          }}
        >
          <Text style={{ ...FONTS.body4, color: COLORS.white }}>
            {strings.rbiApprovedLendingPartners}
          </Text>
        </View>
    </SafeAreaView>
  );
};

export default EWA;
