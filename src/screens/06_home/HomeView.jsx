import { useIsFocused } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import LiveOfferCard from "../../components/organisms/LiveOfferCard";
import {
  addCurrentStack,
} from "../../store/slices/navigationSlice";
import { styles } from "../../styles";

import { STAGE } from "@env";
import Ionicons from "react-native-vector-icons/Ionicons";
import LogoHeader from "../../components/atoms/LogoHeader";
import { COLORS } from "../../constants/Theme";
import { getNumberOfDays } from "../../helpers/DateFunctions";
import { useGetOffersQuery } from "../../store/apiSlices/ewaApi";
import {
  notificationListener,
  requestUserPermission,
} from "../../services/notifications/notificationService";
import { resetEwaHistorical } from "../../store/slices/ewaHistoricalSlice";
import { addOnboarded } from "../../store/slices/authSlice";
import {
  addAccessible,
  addEligible,
  resetEwaLive,
  addCampaignBanner,
} from "../../store/slices/ewaLiveSlice";
const HomeView = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [fetched, setFetched] = useState(false);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const onboarded = useSelector((state) => state.auth.onboarded);

  const ewaLiveSlice = useSelector((state) => state.ewaLive);
  console.log({ewaLiveSlice})
  const [eligible, setEligible] = useState(ewaLiveSlice?.eligible);
  const [accessible, setAccessible] = useState(ewaLiveSlice?.accessible);
    const onboardingCampaignId = useSelector((state)=>state.campaign.onboardingCampaignId);
    console.log("HomeView onboardingCampaignId : ", onboardingCampaignId);

  useEffect(() => {
    dispatch(addCurrentStack("HomeStack"));
    if (!onboarded) addOnboarded(true);
  }, []);

  useEffect(() => {
    requestUserPermission();
    notificationListener();
  }, []);

  useEffect(() => {
    dispatch(addEligible(eligible));
  }, [eligible]);

  useEffect(() => {
    if (
      STAGE !== "prod" ||
      (STAGE === "prod" && parseInt(ewaLiveSlice?.eligibleAmount) >= 1000)
    ) {
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
    pollingInterval: 1000 * 60 * 2,
  })

  useEffect(() => {
    if (isFocused && getEwaOffersIsSuccess) {
      console.log("HomeView ewaOffersFetch API getEwaOffersData : ", getEwaOffersData);
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
        if (getEwaOffersData.data.status == 404 && getEwaOffersData.data.campaignBanner) {
          console.log("dispatched campaignBanner", getEwaOffersData.data)
          dispatch(addCampaignBanner(getEwaOffersData.data.campaignBanner))
        }
        console.log(
          "HomeView ewaOffersFetch API error getEwaOffersData.data : ",
          getEwaOffersData.body
        );
        dispatch(resetEwaLive());
        dispatch(resetEwaHistorical());
      }
    } else if (getEwaOffersIsError) {
      console.log(
        "HomeView ewaOffersFetch API error getEwaOffersError.message : ",
        getEwaOffersError
      );
      dispatch(resetEwaLive());
      dispatch(resetEwaHistorical());
    }
  }, [getEwaOffersIsSuccess, getEwaOffersData, isFocused]);
  
  console.warn("No intent. User opened App.");

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LogoHeader
        title={"Home"}
        rightIcon={
          <Ionicons name="logo-whatsapp" size={28} color={COLORS.primary} />
        }
        rightOnPress={() => {
          whatsappLinking();
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <>
            <LiveOfferCard
              eligible={eligible}
              accessible={accessible}
              ewaLiveSlice={ewaLiveSlice}
            />
          </>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeView;
