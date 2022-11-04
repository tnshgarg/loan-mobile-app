import { useEffect, useState } from "react";
import { BackHandler, SafeAreaView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "../../../../styles";
import PrimaryButton from "../../../../components/PrimaryButton";
import KycCheckCard from "../../../../components/KycCheckCard";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import Offers from "../../../../components/DataCard";
import { getBackendData } from "../../../../services/employees/employeeServices";
import { resetEwaLive } from "../../../../store/slices/ewaLiveSlice";
import { resetEwaHistorical } from "../../../../store/slices/ewaHistoricalSlice";
import { COLORS, FONTS } from "../../../../constants/Theme";
import { STAGE } from "@env";

const EWA = () => {

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [fetched, setFetched] = useState(false);
  const [eligible, setEligible] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const aadhaarName = useSelector((state) => state.aadhaar.data.name);
  const aadhaarVerifyStatus = useSelector(
    (state) => state.aadhaar.verifyStatus
  );
  const panVerifyStatus = useSelector((state) => state.pan.verifyStatus);
  const bankVerifyStatus = useSelector((state) => state.bank.verifyStatus);
  const mandateVerifyStatus = useSelector(
    (state) => state.mandate.verifyStatus
  );
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
    return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
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
      getBackendData({ params: { unipeEmployeeId: unipeEmployeeId }, xpath: "ewa/offers", token: token })
        .then((response) => {
          if (response.data.status === 200) {
            console.log("ewaOffersFetch response.data: ", response.data);
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
      bankVerifyStatus === "SUCCESS" &&
      mandateVerifyStatus === "SUCCESS" ? (
        // panMisMatch < 20 &&
        // bankMisMatch < 20
        <>
          <Text
            style={{
              fontSize: 20,
              marginTop: "5%",
              marginBottom: "5%",
              color: COLORS.gray,
              letterSpacing: 0.2,
              alignSelf: "center",
            }}
          >
            {aadhaarName} get on demand salary
          </Text>
          <Text
            style={{
              alignSelf: "center",
              color: COLORS.primary,
              ...FONTS.h2,
            }}
          >
            ₹ {ewaLiveSlice?.eligibleAmount}
          </Text>

          <View style={{ marginHorizontal: "10%" }}>
            <PrimaryButton
              title={!eligible ? "No Active Offer" : "Get Money Now"}
              disabled={!eligible}
              onPress={() => {
                navigation.navigate("EWA_OFFER");
              }}
            />
          </View>

          <View style={{ padding: "1.5%" }}>
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.gray,
                marginTop: "5%",
                fontWeight: "bold",
              }}
            >
              Your past draws
            </Text>
            <Offers data={ewaHistoricalSlice} />
          </View>
        </>
      ) : (
        <View style={[styles.container, { padding: 0 }]}>
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
