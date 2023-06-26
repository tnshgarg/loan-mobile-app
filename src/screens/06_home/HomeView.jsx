import { useIsFocused, useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
// import PushNotification from 'react-native-push-notification';
import { STAGE } from "@env";
import { useDispatch, useSelector } from "react-redux";
import CmsLoading from "../../components/cms/CmsLoading";
import CmsRoot from "../../components/cms/CmsRoot";
import LogoHeaderBack from "../../components/molecules/LogoHeaderBack";
import LiveOfferCard from "../../components/organisms/LiveOfferCard";
import { COLORS, FONTS } from "../../constants/Theme";
import { navigationHelper } from "../../helpers/CmsNavigationHelper";
import { getNumberOfDays } from "../../helpers/DateFunctions";
import { strings } from "../../helpers/Localization";
import {
  CMS_POLLING_DURATION,
  EWA_POLLING_DURATION,
  KYC_POLLING_DURATION,
} from "../../services/constants";
import {
  notificationListener,
  requestUserPermission,
} from "../../services/notifications/notificationService";
import { useGetCmsQuery } from "../../store/apiSlices/cmsApi";
import { useGetOffersQuery } from "../../store/apiSlices/ewaApi";
import { useGetKycQuery } from "../../store/apiSlices/kycApi";
import { addOnboarded } from "../../store/slices/authSlice";
import { resetEwaHistorical } from "../../store/slices/ewaHistoricalSlice";
import {
  addAccessible,
  addCampaignBanner,
  addEligible,
  resetEwaLive,
} from "../../store/slices/ewaLiveSlice";
import { addCurrentStack } from "../../store/slices/navigationSlice";
import { styles } from "../../styles";

const HomeView = () => {
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const { unipeEmployeeId, token, onboarded } = useSelector(
    (state) => state.auth
  );
  const { data: kycData, isLoading: kycLoading } = useGetKycQuery(
    unipeEmployeeId,
    {
      pollingInterval: KYC_POLLING_DURATION,
    }
  );
  const { aadhaar, pan, bank, kycCompleted } = kycData ?? {};

  const {
    data: cmsData,
    isLoading: cmsLoading,
    isError: cmsError,
  } = useGetCmsQuery(unipeEmployeeId, {
    pollingInterval: CMS_POLLING_DURATION,
  });

  const [fetched, setFetched] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

  const name = aadhaar?.data?.name || pan?.data?.name;
  // || auth?.employeeName;

  const ewaLiveSlice = useSelector((state) => state.ewaLive);

  const [eligible, setEligible] = useState(ewaLiveSlice?.eligible);
  const [accessible, setAccessible] = useState(ewaLiveSlice?.accessible);
  const onboardingCampaignId = useSelector(
    (state) => state.campaign.onboardingCampaignId
  );

  // console.log(cmsData.home);
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
  console.log({ cmsData, cmsError });
  console.log({ ewaLiveSlice });
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
    pollingInterval: EWA_POLLING_DURATION,
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
        if (
          getEwaOffersData.data.status == 404 &&
          getEwaOffersData.data.campaignBanner
        ) {
          console.log("dispatched campaignBanner", getEwaOffersData.data);
          dispatch(addCampaignBanner(getEwaOffersData.data.campaignBanner));
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

  useEffect(() => {
    if (!kycCompleted && !kycLoading) setAlertVisible(true);
    // if (true) setAlertVisible(true);
  }, []);

  const data = {
    title: "Complete your KYC",
    subtitle:
      "Verify your identity to withdraw advance salary in our bank account",

    imageUri:
      "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Help/Aadhaar/step3.png",
    primaryBtnText: "Start KYC",
    primaryBtnIcon: "arrow-right",
    onPressPrimaryBtn: () => {
      navigation.navigate("KycProgress");
    },
    secondaryBtnText: "I will do it later",
    infoText: "",
    contentContainerStyle: { flexDirection: "column-reverse" },
    onPressSecondaryBtn: () => {
      setAlertVisible(false);
    },
  };
  console.log({ bottomAlert: cmsData?.bottom_alert });
  return (
    <SafeAreaView style={[styles.safeContainer]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LogoHeaderBack
          notificationIconPresent={true}
          title={`${strings.goodAfternoon} \n${name}!`}
          onRightIconPress={() => {
            navigationHelper({
              type: "cms",
              params: { blogKey: "customer_support" },
            });
          }}
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
        </View>
        {!cmsLoading ? (
          <CmsRoot children={cmsData?.home || []}></CmsRoot>
        ) : (
          <CmsLoading />
        )}
        {/* <CmsRoot children={DUMMY_RES?.home || []}></CmsRoot> */}

        {!cmsLoading ? (
          <CmsRoot children={cmsData?.bottom_alert || []}></CmsRoot>
        ) : (
          <></>
        )}
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
      </ScrollView>
      {/* {alertVisible && (
        <BottomAlert
          visible={alertVisible}
          setVisible={setAlertVisible}
          data={data}
        />
      )} */}
      {!cmsLoading ? (
        <CmsRoot children={cmsData?.mini_placement || []} />
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};

export default HomeView;
