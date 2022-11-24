import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Linking, SafeAreaView } from "react-native";
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

const HomeView = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const aadhaarStatus = useSelector((state) => state.aadhaar.verifyStatus);
  const bankStatus = useSelector((state) => state.bank.verifyStatus);
  const panStatus = useSelector((state) => state.pan.verifyStatus);

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
    <>
      <SafeAreaView style={[styles.container]}>
        {allAreNull(message) ? <HomeOfferCard /> : <KycCheckCard />}
      </SafeAreaView>
    </>
  );
};

export default HomeView;
