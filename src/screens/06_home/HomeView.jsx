import { useIsFocused, useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
// import PushNotification from 'react-native-push-notification';
import { STAGE } from "@env";
import { useDispatch, useSelector } from "react-redux";
import CompleteKyc from "../../assets/CompleteKyc.svg";
import HelpFooter from "../../components/atoms/HelpFooter";
import CmsMiniPlacement from "../../components/cms/CmsMiniPlacement";
import CmsRoot from "../../components/cms/CmsRoot";
import BottomAlert from "../../components/molecules/BottomAlert";
import LogoHeaderBack from "../../components/molecules/LogoHeaderBack";
import HelpSection from "../../components/organisms/HelpSection";
import LiveOfferCard from "../../components/organisms/LiveOfferCard";
import { COLORS, FONTS } from "../../constants/Theme";
import { getNumberOfDays } from "../../helpers/DateFunctions";
import {
  notificationListener,
  requestUserPermission,
} from "../../services/notifications/notificationService";
import DUMMY_RES, { useGetCmsQuery } from "../../store/apiSlices/cmsApi";
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
import { navigationHelper } from "../../helpers/CmsNavigationHelper";

const HomeView = () => {
  const aadhaarData = {
    heading: "Customer Support",
    // headingImage: require("../../assets/AadhaarHeader.png"),
    // title: "How to verify Aadhaar?",
    // subtitle: "Follow this 3-step process",

    questions: [
      {
        title: "Q: What is Unipe?",
        subtitle:
          "A: Unipe is an interest-free solution that allows them to withdraw their salary advance whenever they need it.",
      },
      {
        title: "Q: How can I get advance salary from Unipe?",
        subtitle:
          "A: To get advance salary, follow these 5 simple steps: \n- Download and login to the Unipe App \n- Complete KYC verification by entering your Aadhar, Pan & Bank details \n- Enter the amount you want to withdraw \n- Set up repayment metho \nWithdraw your advance salary \n",
      },
      {
        title:
          "Q: Does Unipe charge me any fees or interest on advance salary?",
        subtitle:
          "A: The Unipe EWA program is interest free. However, we do charge a very small processing fee at the time of disbursement. If the Advance salary is paid back on time, there is no separate interest charged.",
      },
      {
        title: "Q: If I take Rs.1000 today, when will I have to pay it back?",
        subtitle:
          "A: The advance amount taken will be automatically deducted from your salary at the time of payroll processing.",
      },
      {
        title: "Q: Is my data protected?",
        subtitle:
          "A: Your data is 100% encrypted and stored securely and only shared with third parties post your consent.",
      },
    ],
  };

  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const { unipeEmployeeId, token, onboarded } = useSelector(
    (state) => state.auth
  );

  const { data: kycData } = useGetKycQuery(unipeEmployeeId, {
    pollingInterval: 1000 * 60 * 60 * 24,
  });
  const { aadhaar, pan, bank, kycCompleted } = kycData ?? {};

  const {
    data: cmsData,
    isLoading: cmsLoading,
    isError: cmsError,
  } = useGetCmsQuery(unipeEmployeeId, {
    pollingInterval: 1000,
  });

  const [fetched, setFetched] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

  const name = aadhaar?.data?.name || pan?.data?.name;
  // || auth?.employeeName;

  const ewaLiveSlice = useSelector((state) => state.ewaLive);
  console.log({ ewaLiveSlice });
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
    if (!kycCompleted) setAlertVisible(true);
  }, []);

  const data = {
    title: "Complete your KYC",
    subtitle:
      "Verify your identity to withdraw advance salary in our bank account",

    imageUri: <CompleteKyc />,
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

  console.log("CmsData ", cmsData?.home);

  return (
    <SafeAreaView
      style={[
        styles.safeContainer,
        cmsData?.miniPlacement ? { paddingBottom: 60 } : { paddingBottom: 0 },
      ]}
    >
      {cmsData?.miniPlacement ? <CmsMiniPlacement /> : <></>}

      <ScrollView showsVerticalScrollIndicator={false}>
        <LogoHeaderBack
          title={`Good Afternoon \n${name}!`}
          onRightIconPress={() => {
            // setVisible(true);

            navigationHelper({
              type: "cms",
              params: { blogKey: "CustomerSupport" },
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

          {!cmsLoading ? (
            <CmsRoot children={DUMMY_RES?.home || []}></CmsRoot>
          ) : (
            <></>
          )}

          {/* <BannerCard /> */}
        </View>
        <HelpFooter />
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
            RBI approved Lending Partners
          </Text>
        </View>
      </ScrollView>
      {alertVisible && (
        <BottomAlert
          visible={alertVisible}
          setVisible={setAlertVisible}
          data={data}
        />
      )}
      {visible && (
        <HelpSection
          visible={visible}
          setVisible={setVisible}
          data={aadhaarData}
        />
      )}
    </SafeAreaView>
  );
};

export default HomeView;
