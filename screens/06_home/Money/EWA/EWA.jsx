import { STAGE } from "@env";
import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import {
  BackHandler,
  SafeAreaView,
  ScrollView,
  Text,
  View
} from "react-native";
import { Ionicons } from "react-native-vector-icons";
import { useDispatch, useSelector } from "react-redux";
import LogoHeader from "../../../../components/atoms/LogoHeader";
import MessageCard from "../../../../components/atoms/MessageCard";
import PastDrawsCard from "../../../../components/molecules/PastDrawsCard";
import LiveOfferCard from "../../../../components/organisms/LiveOfferCard";
import { COLORS, FONTS } from "../../../../constants/Theme";
import { getNumberOfDays } from "../../../../helpers/DateFunctions";
import { allAreNull } from "../../../../helpers/nullCheck";
import { fetchQuery } from "../../../../queries/offers";
import { resetEwaHistorical } from "../../../../store/slices/ewaHistoricalSlice";
import {
  addAccessible,
  addEligible,
  resetEwaLive
} from "../../../../store/slices/ewaLiveSlice";
import { styles } from "../../../../styles";

const EWA = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [fetched, setFetched] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const aadhaarVerifyStatus = useSelector(
    (state) => state.aadhaar.verifyStatus
  );
  const bankVerifyStatus = useSelector((state) => state.bank.verifyStatus);
  const panVerifyStatus = useSelector((state) => state.pan.verifyStatus);

  // const panMisMatch = useSelector((state) => state.pan.misMatch);
  // const bankMisMatch = useSelector((state) => state.bank.misMatch);

  const ewaLiveSlice = useSelector((state) => state.ewaLive);
  const ewaHistoricalSlice = useSelector((state) => state.ewaHistorical);

  const [eligible, setEligible] = useState(ewaLiveSlice?.eligible);
  const [accessible, setAccessible] = useState(ewaLiveSlice?.accessible);

  const verifyStatuses = [
    aadhaarVerifyStatus != "SUCCESS" ? "AADHAAR" : null,
    bankVerifyStatus != "SUCCESS" ? "BANK" : null,
    panVerifyStatus != "SUCCESS" ? "PAN" : null,
  ];

  const backAction = () => {
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
    isLoading,
    isError,
    error,
    data: response,
    isFetching,
  } = fetchQuery({ token, unipeEmployeeId });

  console.log("Money FetchQuery for Offers", isLoading, error, isFetching);
  useEffect(() => {
    if (response) {
      console.log("Money ewaOffersFetch response.data: ", response.data);
      if (response.data.status === 200) {
        if (Object.keys(response.data.body.live).length !== 0) {
          console.log(
            "Money ewaOffersFetch response.data.body.live: ",
            response.data.body.live,
            response.data.body.live != {}
          );
          const closureDays = getNumberOfDays({
            date: response.data.body.live.dueDate,
          });
          if (closureDays <= 3) {
            setAccessible(false);
          } else {
            setAccessible(true);
          }
        } else {
          setAccessible(false);
        }
        dispatch(resetEwaLive(response.data.body.live));
        dispatch(resetEwaHistorical(response.data.body.past));
        setFetched(true);
      } else {
        console.log("Money ewaOffersFetch API error: ", response.data);
        dispatch(resetEwaLive());
        dispatch(resetEwaHistorical());
      }
    } else if (isError) {
      console.log("Money ewaOffersFetch API error: ", error.message);
      dispatch(resetEwaLive());
      dispatch(resetEwaHistorical());
    }
  }, [response]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LogoHeader
        title={"Money"}
        rightIcon={
          <Ionicons
            name="help-circle-outline"
            size={28}
            color={COLORS.primary}
          />
        }
      />

      {allAreNull(verifyStatuses) ? (
        // panMisMatch < 20 &&
        // bankMisMatch < 20
        <ScrollView>
          <View style={styles.container}>
            <LiveOfferCard
              eligible={eligible}
              accessible={accessible}
              ewaLiveSlice={ewaLiveSlice}
            />

            <Text
              style={{
                ...FONTS.h4,
                color: COLORS.gray,
                marginTop: "5%",
              }}
            >
              Your past draws
            </Text>
            <PastDrawsCard data={ewaHistoricalSlice} />
          </View>
        </ScrollView>
      ) : (
        <View style={[styles.container]}>
          <Text
            style={{
              color: COLORS.warning,
              ...FONTS.h3,
              alignSelf: "center",
              marginTop: "5%",
            }}
          >
            You are not eligible for Advanced Salary.
          </Text>
          <MessageCard
            title="Following pending steps need to be completed in order to receive advance salary."
            message={verifyStatuses}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default EWA;
