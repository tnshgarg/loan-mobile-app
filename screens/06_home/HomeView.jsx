import { useIsFocused, useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Linking, SafeAreaView, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import LiveOfferCard from "../../components/organisms/LiveOfferCard";
import PushNotification from "react-native-push-notification";
import MessageCard from "../../components/atoms/MessageCard";
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
import { Ionicons } from "react-native-vector-icons";
import { COLORS } from "../../constants/Theme";
import { getBackendData } from "../../services/employees/employeeServices";
import { resetEwaHistorical } from "../../store/slices/ewaHistoricalSlice";
import {
  addAccessible,
  addEligible,
  resetEwaLive,
} from "../../store/slices/ewaLiveSlice";
import { getNumberOfDays } from "../../helpers/DateFunctions";
import { STAGE } from "@env";
import VideoPlayer from "../../components/organisms/VideoPlayer";

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

  // const panMisMatch = useSelector((state) => state.pan.misMatch);
  // const bankMisMatch = useSelector((state) => state.bank.misMatch);

  const ewaLiveSlice = useSelector((state) => state.ewaLive);
  const [eligible, setEligible] = useState(ewaLiveSlice?.eligible);
  const [accessible, setAccessible] = useState(ewaLiveSlice?.accessible);

  const verifyStatuses = [
    aadhaarVerifyStatus != "SUCCESS" ? "AADHAAR" : null,
    bankVerifyStatus != "SUCCESS" ? "BANK" : null,
    panVerifyStatus != "SUCCESS" ? "PAN" : null,
  ];

  useEffect(() => {
    // PushNotification.deleteChannel("Onboarding");
    if (allAreNull(verifyStatuses)) {
      PushNotification.cancelAllLocalNotifications();
    }
  }, [aadhaarVerifyStatus, bankVerifyStatus, panVerifyStatus]);

  var [campaignId, setCampaignId] = useState(useSelector((state) => state.auth.campaignId));

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

  useEffect(() => {
    console.log("Home ewaLiveSlice: ", ewaLiveSlice);
    // console.log("ewaHistoricalSlice: ", ewaHistoricalSlice);
    // console.log("HomeView ewaOffersFetch unipeEmployeeId:", unipeEmployeeId);
    if (isFocused && unipeEmployeeId) {
      getBackendData({
        params: { unipeEmployeeId: unipeEmployeeId },
        xpath: "ewa/offers",
        token: token,
      })
        .then((response) => {
          if (response.data.status === 200) {
            // console.log("HomeView ewaOffersFetch response.data: ", response.data);
            const closureDays = getNumberOfDays({
              date: response.data.body.live.dueDate,
            });
            if (closureDays <= 3) {
              setAccessible(false);
            } else {
              setAccessible(true);
            }
            dispatch(resetEwaLive(response.data.body.live));
            dispatch(resetEwaHistorical(response.data.body.past));
            setFetched(true);
          } else {
            console.log("ewaOffersFetch error: ", response.data);
            dispatch(resetEwaLive());
            dispatch(resetEwaHistorical());
          }
        })
        .catch((error) => {
          console.log("ewaOffersFetch error: ", error.toString());
          dispatch(resetEwaLive());
          dispatch(resetEwaHistorical());
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
          switch (splitted[4]?.toLowerCase()) {
            case "campaign":
              console.log("campaignId", splitted[5]);
              setCampaignId(splitted[5]);
              break;
            default:
              break;
          }
          navigation.navigate("Money");
          break;
        default:
          break;
      }
    } else {
      console.log("No intent. User opened App.");
      console.log("campaignId", campaignId)
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {allAreNull(verifyStatuses) ? (
            <>
              <LiveOfferCard
                eligible={eligible}
                accessible={accessible}
                ewaLiveSlice={ewaLiveSlice}
              />
              <VideoPlayer />
            </>
          ) : (
            <MessageCard
              title="Following pending steps need to be completed in order to receive advance salary."
              message={verifyStatuses}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeView;
