import { useQuery } from "@tanstack/react-query";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Linking, SafeAreaView, ScrollView, Text, View } from "react-native";
// import PushNotification from 'react-native-push-notification';
import { useDispatch, useSelector } from "react-redux";
import LiveOfferCard from "../../components/organisms/LiveOfferCard";
import { allAreNull } from "../../helpers/nullCheck";
import {
  addEkycCampaignId,
  addEwaCampaignId,
  addRepaymentCampaignId,
} from "../../store/slices/campaignSlice";
import {
  addCurrentScreen,
  addCurrentStack,
} from "../../store/slices/navigationSlice";
import { styles } from "../../styles";

import { STAGE } from "@env";
import Ionicons from "react-native-vector-icons/Ionicons";
import LogoHeader from "../../components/atoms/LogoHeader";
import { COLORS } from "../../constants/Theme";
import { getNumberOfDays } from "../../helpers/DateFunctions";
import { getEwaOffers } from "../../queries/ewa/offers";
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
} from "../../store/slices/ewaLiveSlice";
import CompleteKycCard from "../../components/molecules/CompleteKycCard";
import ExploreCards from "../../components/molecules/ExploreCards";
const HomeView = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const aadhaarVerifyStatus = useSelector(
    (state) => state.aadhaar.verifyStatus
  );
  const bankVerifyStatus = useSelector((state) => state.bank.verifyStatus);
  const panVerifyStatus = useSelector((state) => state.pan.verifyStatus);

  const [fetched, setFetched] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const onboarded = useSelector((state) => state.auth.onboarded);

  // const panMisMatch = useSelector((state) => state.pan.misMatch);
  // const bankMisMatch = useSelector((state) => state.bank.misMatch);
  const ewaLiveSlice = useSelector((state) => state.ewaLive);
  const [eligible, setEligible] = useState(ewaLiveSlice?.eligible);
  const [accessible, setAccessible] = useState(ewaLiveSlice?.accessible);

  const verifyStatuses = [
    aadhaarVerifyStatus != "SUCCESS"
      ? { label: "Verify AADHAAR", value: "AADHAAR" }
      : null,
    panVerifyStatus != "SUCCESS" ? { label: "Verify PAN", value: "PAN" } : null,
    bankVerifyStatus != "SUCCESS"
      ? { label: "Verify Bank Account", value: "BANK" }
      : null,
  ];

  // useEffect(() => {
  //   // PushNotification.deleteChannel("Onboarding");
  //   if (allAreNull(verifyStatuses)) {
  //     PushNotification.cancelAllLocalNotifications();
  //   }
  // }, [aadhaarVerifyStatus, bankVerifyStatus, panVerifyStatus]);

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
  } = useQuery(["getEwaOffers", unipeEmployeeId, token], getEwaOffers, {
    staleTime: 1000 * 60 * 2,
    cacheTime: 1000 * 60 * 10,
    refetchInterval: 1000 * 60 * 2,
  });

  useEffect(() => {
    if (isFocused && getEwaOffersIsSuccess) {
      if (getEwaOffersData.data.status === 200) {
        if (Object.keys(getEwaOffersData.data.body.live).length !== 0) {
          const closureDays = getNumberOfDays({
            date: getEwaOffersData.data.body.live.dueDate,
          });
          if (closureDays <= 3) {
            setAccessible(false);
          } else {
            setAccessible(true);
          }
        } else {
          setAccessible(false);
        }
        dispatch(resetEwaLive(getEwaOffersData.data.body.live));
        dispatch(resetEwaHistorical(getEwaOffersData.data.body.past));
        setFetched(true);
      } else {
        console.log(
          "HomeView ewaOffersFetch API error getEwaOffersData.data : ",
          getEwaOffersData.data
        );
        dispatch(resetEwaLive());
        dispatch(resetEwaHistorical());
      }
    } else if (getEwaOffersIsError) {
      console.log(
        "HomeView ewaOffersFetch API error getEwaOffersError.message : ",
        getEwaOffersError.message
      );
      dispatch(resetEwaLive());
      dispatch(resetEwaHistorical());
    }
  }, [getEwaOffersIsSuccess, getEwaOffersData, isFocused]);

  const getUrlAsync = async () => {
    const initialUrl = await Linking.getInitialURL();
    const breakpoint = "/";
    if (initialUrl) {
      const splitted = initialUrl.split(breakpoint);
      console.log("initialUrl", splitted);
      console.log("route", splitted[3]);
      switch (splitted[3].toLowerCase()) {
        case "ewa":
          switch (splitted[4]?.toLowerCase()) {
            case "campaign":
              dispatch(addEwaCampaignId(splitted[5]));
              break;
            default:
              break;
          }
          break;
        case "repayment":
          switch (splitted[4]?.toLowerCase()) {
            case "campaign":
              dispatch(addRepaymentCampaignId(splitted[5]));
              break;
            default:
              break;
          }
          break;
        case "ekyc":
          navigation.navigate("AccountStack", {
            screen: "KYC",
          });
          switch (splitted[4]?.toLowerCase()) {
            case "campaign":
              dispatch(addEkycCampaignId(splitted[5]));
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
    } else {
      console.log("No intent. User opened App.");
    }
  };

  useEffect(() => {
    getUrlAsync();
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LogoHeader
        title={"Home"}
        rightIcon={
          <Ionicons name="logo-whatsapp" size={28} color={COLORS.primary} />
        }
        rightOnPress={() => {
          Linking.openURL(`whatsapp://send?text=&phone=7483447528`);
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
            <CompleteKycCard />
            <ExploreCards />
          </>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeView;
