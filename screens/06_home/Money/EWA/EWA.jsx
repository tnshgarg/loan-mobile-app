import { useEffect, useState } from "react";
import { BackHandler, SafeAreaView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "../../../../styles";
import PrimaryButton from "../../../../components/atoms/PrimaryButton";
import KycCheckCard from "../../../../components/molecules/KycCheckCard";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import PastDrawsCard from "../../../../components/molecules/PastDrawsCard";
import { getBackendData } from "../../../../services/employees/employeeServices";
import { resetEwaLive } from "../../../../store/slices/ewaLiveSlice";
import { resetEwaHistorical } from "../../../../store/slices/ewaHistoricalSlice";
import { COLORS, FONTS } from "../../../../constants/Theme";
import { STAGE } from "@env";
import { getNumberOfDays } from "../../../../helpers/DateFunctions";
import GetMoneyCard from "../../../../components/molecules/GetMoneyCard";
import PayMoneyCard from "../../../../components/molecules/PayMoneyCard";

const EWA = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [fetched, setFetched] = useState(false);
  const [eligible, setEligible] = useState(false);
  const [ewaAccessible, setEwaAccessible] = useState(true);

  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const aadhaarName = useSelector((state) => state.aadhaar.data.name);
  const aadhaarVerifyStatus = useSelector(
    (state) => state.aadhaar.verifyStatus
  );
  const panVerifyStatus = useSelector((state) => state.pan.verifyStatus);
  const bankVerifyStatus = useSelector((state) => state.bank.verifyStatus);
  // const panMisMatch = useSelector((state) => state.pan.misMatch);
  // const bankMisMatch = useSelector((state) => state.bank.misMatch);

  const ewaLiveSlice = useSelector((state) => state.ewaLive);
  const ewaHistoricalSlice = useSelector((state) => state.ewaHistorical);

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
    if (fetched) {
      if (
        STAGE !== "prod" ||
        (STAGE === "prod" && parseInt(ewaLiveSlice?.eligibleAmount) >= 1000)
      ) {
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
            if (getNumberOfDays(response.data.body.live.dueDate) <= 3) {
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

  return (
    <SafeAreaView style={[styles.container]}>
      {aadhaarVerifyStatus === "SUCCESS" &&
      panVerifyStatus === "SUCCESS" &&
      bankVerifyStatus === "SUCCESS" ? (
        // panMisMatch < 20 &&
        // bankMisMatch < 20
        <>
          <GetMoneyCard
            navigation={navigation}
            eligible={eligible}
            amount={"₹" + ewaLiveSlice?.eligibleAmount}
            progress={ewaLiveSlice?.loanAmount / ewaLiveSlice?.eligibleAmount}
          />

          <PayMoneyCard
            navigation={navigation}
            amount={"₹" + ewaLiveSlice?.loanAmount}
            dueDate={ewaLiveSlice?.dueDate}
          />

          <View style={{ padding: "1.5%" }}>
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
        </>
      ) : (
        <View style={[styles.safeContainer]}>
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
          <KycCheckCard />
        </View>
      )}
    </SafeAreaView>
  );
};

export default EWA;
