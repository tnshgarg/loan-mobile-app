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
import { COLORS, FONTS } from "../../constants/Theme";
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
} from "../../store/slices/ewaLiveSlice";
import LogoHeaderBack from "../../components/molecules/LogoHeaderBack";
import HelpFooter from "../../components/atoms/HelpFooter";
import BannerCard from "../../components/atoms/BannerCard";
import CmsRoot from "../../components/cms/CmsRoot";
import remoteConfig from '@react-native-firebase/remote-config';

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
  const name = useSelector(
    (state) =>
      state.aadhaar.data?.name ||
      state.pan.data?.name ||
      state.auth.employeeName
  );

  // const panMisMatch = useSelector((state) => state.pan.misMatch);
  // const bankMisMatch = useSelector((state) => state.bank.misMatch);
  const ewaLiveSlice = useSelector((state) => state.ewaLive);
  const [eligible, setEligible] = useState(ewaLiveSlice?.eligible);
  const [accessible, setAccessible] = useState(ewaLiveSlice?.accessible);
  const [cmsHomeData, setCmsHomeData] = useState([]);
  const onboardingCampaignId = useSelector(
    (state) => state.campaign.onboardingCampaignId
  );
  console.log("HomeView onboardingCampaignId : ", onboardingCampaignId);
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
    remoteConfig()
      .setDefaults({
        awesome_new_feature: 'disabled',
        home: []
      })
      .then(() => remoteConfig().fetchAndActivate())
      .then(fetchedRemotely => {
        if (fetchedRemotely) {
          console.log('Configs were retrieved from the backend and activated.', fetchedRemotely);
        } else {
          console.log(
            'No configs were fetched from the backend, and the local configs were already activated',
          );
        }
      }).then(() => {
        try {
          const remote_home_fetch = remoteConfig().getValue('home')?._value
          setCmsHomeData(JSON.parse(remote_home_fetch))
        } catch (err) {
          setCmsHomeData([])
        }
      });
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
  });

  useEffect(() => {
    if (isFocused && getEwaOffersIsSuccess) {
      console.log(
        "HomeView ewaOffersFetch API getEwaOffersData : ",
        getEwaOffersData
      );
      if (getEwaOffersData?.status === 200) {
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <LogoHeaderBack
          title={`Good Afternoon \n${name}!`}
          onRightIconPress={() => {}}
          titleStyle={{ ...FONTS.body3, color: COLORS.gray }}
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
          <CmsRoot
            children={cmsHomeData}
          ></CmsRoot>

          {/* <BannerCard /> */}
        </View>
        <HelpFooter />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeView;
