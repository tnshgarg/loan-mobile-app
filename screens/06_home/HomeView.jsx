import { useIsFocused, useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Linking, SafeAreaView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import HomeOfferCard from "../../components/molecules/HomeOfferCard";
import PushNotification from "react-native-push-notification";
import KycCheckCard from "../../components/molecules/KycCheckCard";
import { allAreNull } from "../../helpers/nullCheck";
import { addCampaignId } from "../../store/slices/authSlice";
import {
  addCurrentScreen,
  addCurrentStack,
} from "../../store/slices/navigationSlice";
import { styles } from "../../styles";

import {
  notificationListener,
  requestUserPermission,
} from "../../services/notifications/notificationService";
import LogoHeader from "../../components/atoms/LogoHeader";
import { MaterialCommunityIcons, Ionicons } from "react-native-vector-icons";
import { COLORS } from "../../constants/Theme";
import { getBackendData } from "../../services/employees/employeeServices";
import { resetEwaHistorical } from "../../store/slices/ewaHistoricalSlice";
import { resetEwaLive } from "../../store/slices/ewaLiveSlice";

const HomeView = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const aadhaarStatus = useSelector((state) => state.aadhaar.verifyStatus);
  const bankStatus = useSelector((state) => state.bank.verifyStatus);
  const panStatus = useSelector((state) => state.pan.verifyStatus);

  const [fetched, setFetched] = useState(false);
  const [eligible, setEligible] = useState(false);
  const [ewaAccessible, setEwaAccessible] = useState(true);

  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const aadhaarName = useSelector((state) => state.aadhaar.data.name);

  // const panMisMatch = useSelector((state) => state.pan.misMatch);
  // const bankMisMatch = useSelector((state) => state.bank.misMatch);

  const ewaLiveSlice = useSelector((state) => state.ewaLive);
  const ewaHistoricalSlice = useSelector((state) => state.ewaHistorical);

  const message = [
    aadhaarStatus != "SUCCESS" ? "AADHAAR" : null,
    bankStatus != "SUCCESS" ? "BANK" : null,
    panStatus != "SUCCESS" ? "PAN" : null,
  ];

  useEffect(() => {
    // PushNotification.deleteChannel("Onboarding");
    if (allAreNull(message)) {
      PushNotification.cancelAllLocalNotifications();
    }
  }, [aadhaarStatus, bankStatus, panStatus]);

  var [campaignId, setCampaignId] = useState(null);

  useEffect(() => {
    dispatch(addCurrentScreen("Home"));
    dispatch(addCurrentStack("HomeStack"));
  }, []);

  useEffect(() => {
    requestUserPermission();
    notificationListener();
  }, []);

  useEffect(() => {
    dispatch(addCampaignId(campaignId));
  }, [campaignId]);

  useEffect(() => {
    if (fetched) {
      if (
        STAGE !== "prod" ||
        (STAGE === "prod" && parseInt(ewaLiveSlice?.eligibleAmount) >= 1000)
      ) {
        console.log("first");
        setEligible(true);
      } else {
        setEligible(false);
      }
    } else {
      setEligible(false);
    }
  }, [ewaLiveSlice, fetched]);

  useEffect(() => {
    console.log("ewaLiveSlice: ", ewaLiveSlice);
    console.log("ewaHistoricalSlice: ", ewaHistoricalSlice);
    console.log("ewaOffersFetch unipeEmployeeId:", unipeEmployeeId);
    if (isFocused && unipeEmployeeId) {
      getBackendData({
        params: { unipeEmployeeId: unipeEmployeeId },
        xpath: "ewa/offers",
        token: token,
      })
        .then((response) => {
          if (response.data.status === 200) {
            console.log("ewaOffersFetch response.data: ", response.data);
            if (
              getNumberOfDays({ date: response.data.body.live.dueDate }) <= 3
            ) {
              setEwaAccessible(false);
            } else {
              setEwaAccessible(true);
            }
            dispatch(resetEwaLive(response.data.body.live));
            dispatch(resetEwaHistorical(response.data.body.past));
            setFetched(true);
          } else {
            dispatch(resetEwaLive());
            dispatch(resetEwaHistorical());
            console.log("ewaOffersFetch error: ", response.data);
          }
        })
        .catch((error) => {
          dispatch(resetEwaLive());
          dispatch(resetEwaHistorical());
          console.log("ewaOffersFetch error: ", error.toString());
        });
    }
  }, [isFocused, unipeEmployeeId]);

  const getUrlAsync = async () => {
    const initialUrl = await Linking.getInitialURL();
    const breakpoint = "/";
    if (initialUrl) {
      const splitted = initialUrl.split(breakpoint);
      console.log("initialUrl", splitted);
      console.log("route", splitted[3]);
      switch (splitted[3].toLowerCase()) {
        case "ewa":
          navigation.navigate("Money");
          break;
        default:
          break;
      }
      switch (splitted[4].toLowerCase()) {
        case "campaign":
          console.log("campaignId", splitted[5]);
          setCampaignId(splitted[5]);
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
          <Ionicons
            name="help-circle-outline"
            size={28}
            color={COLORS.primary}
          />
        }
      />
      <View style={styles.container}>
        {allAreNull(message) ? (
          <HomeOfferCard eligible={eligible} ewaAccessible={ewaAccessible} />
        ) : (
          <KycCheckCard />
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeView;
