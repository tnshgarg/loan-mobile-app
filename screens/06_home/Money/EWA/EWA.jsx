import { STAGE } from "@env";
import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Ionicons } from "react-native-vector-icons";
import {
  BackHandler,
  SafeAreaView,
  View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { allAreNull } from "../../../../helpers/nullCheck";
import { styles } from "../../../../styles";
import PastDrawsCard from "../../../../components/molecules/PastDrawsCard";
import LiveOfferCard from "../../../../components/organisms/LiveOfferCard";
import KycCheckCard from "../../../../components/molecules/KycCheckCard";
import {
  addAccessible,
  addEligible,
  resetEwaLive,
} from "../../../../store/slices/ewaLiveSlice";
import { resetEwaHistorical } from "../../../../store/slices/ewaHistoricalSlice";
import { COLORS } from "../../../../constants/Theme";
import LogoHeader from "../../../../components/atoms/LogoHeader";
import { getNumberOfDays } from "../../../../helpers/DateFunctions";
import { getEwaOffers } from "../../../../queries/ewa/offers";

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
    aadhaarVerifyStatus != "SUCCESS"
      ? { label: "Verify AADHAAR", value: "AADHAAR" }
      : null,
    panVerifyStatus != "SUCCESS" ? { label: "Verify PAN", value: "PAN" } : null,
    bankVerifyStatus != "SUCCESS"
      ? { label: "Verify Bank Account", value: "BANK" }
      : null,
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
    isSuccess: getEwaOffersIsSuccess,
    isError: getEwaOffersIsError,
    error: getEwaOffersError,
    data: getEwaOffersData,
  } = getEwaOffers({ token, unipeEmployeeId });

  useEffect(() => {
    if (getEwaOffersIsSuccess) {
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
        console.log("Money ewaOffersFetch API error getEwaOffersData.data : ", getEwaOffersData.data);
        dispatch(resetEwaLive());
        dispatch(resetEwaHistorical());
      }
    } else if (getEwaOffersIsError) {
      console.log("Money ewaOffersFetch API error getEwaOffersError.message : ", getEwaOffersError.message);
      dispatch(resetEwaLive());
      dispatch(resetEwaHistorical());
    }
  }, [getEwaOffersIsSuccess, getEwaOffersData]);

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

        <View style={styles.container}>
          <LiveOfferCard
            eligible={eligible}
            accessible={accessible}
            ewaLiveSlice={ewaLiveSlice}
          />

          <PastDrawsCard data={ewaHistoricalSlice} />
        </View>
      ) : (
        <View style={[styles.container]}>
          <KycCheckCard
            title="Following pending steps need to be completed in order to receive advance salary."
            message={verifyStatuses}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default EWA;
