import { STAGE } from "@env";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { BackHandler, Linking, SafeAreaView, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import LogoHeader from "../../../../components/atoms/LogoHeader";
import PastDrawsCard from "../../../../components/molecules/PastDrawsCard";
import VerifyMandateCard from "../../../../components/molecules/VerifyMandateCard";
import LiveOfferCard from "../../../../components/organisms/LiveOfferCard";
import { COLORS } from "../../../../constants/Theme";
import { getNumberOfDays } from "../../../../helpers/DateFunctions";
import { useGetOffersQuery } from "../../../../store/apiSlices/ewaApi";
import { useGetMandateQuery } from "../../../../store/apiSlices/mandateApi";
import { resetEwaHistorical } from "../../../../store/slices/ewaHistoricalSlice";
import {
  addAccessible,
  addEligible,
  resetEwaLive,
} from "../../../../store/slices/ewaLiveSlice";
import {
  addVerifyStatus,
  resetMandate,
} from "../../../../store/slices/mandateSlice";
import { styles } from "../../../../styles";
const EWA = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [fetched, setFetched] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const [mandateVerifyStatus, setMandateVerifyStatus] = useState(
    useSelector((state) => state.mandate.verifyStatus)
  );

  // const panMisMatch = useSelector((state) => state.pan.misMatch);
  // const bankMisMatch = useSelector((state) => state.bank.misMatch);

  const ewaLiveSlice = useSelector((state) => state.ewaLive);
  const ewaHistoricalSlice = useSelector((state) => state.ewaHistorical);

  const [eligible, setEligible] = useState(ewaLiveSlice?.eligible);
  const [accessible, setAccessible] = useState(ewaLiveSlice?.accessible);
  const { data, error, isLoading } = useGetMandateQuery(unipeEmployeeId);

  const backAction = () => {
    navigation.navigate("EWA", { replace: true });
    return true;
  };

  useEffect(() => {
    if (isFocused) {
      if (data && !isLoading && !error) {
        console.log("ewa mandate data", data?.body);
        dispatch(resetMandate(data?.data?.body));
        dispatch(addVerifyStatus(data?.data?.body?.verifyStatus));
        setMandateVerifyStatus(data?.data?.body?.verifyStatus);
      } else {
        console.log("mandateFetch error: ", error);
        console.log("mandateFetch error: ", data);
      }
    }
  }, [unipeEmployeeId, mandateVerifyStatus, isFocused]);

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
  } = useGetOffersQuery(unipeEmployeeId);

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

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LogoHeader
        title={"Money"}
        rightIcon={
          <Ionicons name="logo-whatsapp" size={28} color={COLORS.primary} />
        }
        rightOnPress={() => {
          Linking.openURL(`whatsapp://send?text=&phone=7483447528`);
        }}
      />
      <View style={styles.container}>
        <LiveOfferCard
          eligible={eligible}
          accessible={accessible}
          ewaLiveSlice={ewaLiveSlice}
        />
        <VerifyMandateCard mandateVerifyStatus={mandateVerifyStatus} />
        <PastDrawsCard data={ewaHistoricalSlice} />
      </View>
    </SafeAreaView>
  );
};

export default EWA;
