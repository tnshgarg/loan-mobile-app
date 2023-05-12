import { STAGE } from "@env";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BackHandler, SafeAreaView, View, Linking } from "react-native";
import { Ionicons } from "react-native-vector-icons";
import { useDispatch, useSelector } from "react-redux";
import LogoHeader from "../../../../components/atoms/LogoHeader";
import PastDrawsCard from "../../../../components/molecules/PastDrawsCard";
import VerifyMandateCard from "../../../../components/molecules/VerifyMandateCard";
import LiveOfferCard from "../../../../components/organisms/LiveOfferCard";
import { COLORS } from "../../../../constants/Theme";
import { getNumberOfDays } from "../../../../helpers/DateFunctions";
import { getEwaOffers } from "../../../../queries/ewa/offers";
import { getBackendData } from "../../../../services/employees/employeeServices";
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

  const backAction = () => {
    navigation.navigate("EWA", { replace: true });
    return true;
  };

  useEffect(() => {
    if (isFocused) {
      getBackendData({
        params: { unipeEmployeeId: unipeEmployeeId },
        xpath: "mandate",
        token: token,
      })
        .then((response) => {
          dispatch(resetMandate(response?.data?.body));
          dispatch(addVerifyStatus(response?.data?.body?.verifyStatus));
          setMandateVerifyStatus(response?.data?.body?.verifyStatus);
        })
        .catch((error) => {
          console.log("mandateFetch error: ", error);
        });
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
          "Money ewaOffersFetch API error getEwaOffersData.data : ",
          getEwaOffersData.data
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
