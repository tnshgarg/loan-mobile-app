import { useEffect, useState } from "react";
import { SafeAreaView, Text, View, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { checkBox, styles } from "../../../../styles";
import PrimaryButton from "../../../../components/PrimaryButton";
import KycCheckCard from "../../../../components/KycCheckCard";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import Offers from "../../../../components/DataCard";
import { getBackendData } from "../../../../services/employees/employeeServices";
import { resetEwaLive } from "../../../../store/slices/ewaLiveSlice";
import { resetEwaHistorical } from "../../../../store/slices/ewaHistoricalSlice";
import { COLORS, FONTS } from "../../../../constants/Theme";

const EWA = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [fetched, setFetched] = useState(false);

  const id = useSelector((state) => state.auth.id);
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

  useEffect(() => {
    console.log("ewaLiveSlice: ", ewaLiveSlice);
    console.log("ewaHistoricalSlice: ", ewaHistoricalSlice);
    console.log("ewaOffersFetch unipeEmployeeId:", id);
    if (isFocused && id) {
      getBackendData({ params: { unipeEmployeeId: id }, xpath: "ewa/offers" })
        .then((response) => {
          if (response.data.status === 200) {
            console.log("ewaOffersFetch response.data: ", response.data);
            dispatch(resetEwaLive(response.data.body.live));
            dispatch(resetEwaHistorical(response.data.body.past));
            setFetched(true);
          } else {
            dispatch(resetEwaLive());
            dispatch(resetEwaHistorical());
          }
        })
        .catch((error) => {
          dispatch(resetEwaLive());
          dispatch(resetEwaHistorical());
          console.log("ewaOffersFetch error: ", error);
        });
    }
  }, [isFocused, id]);

  return (
    <SafeAreaView style={[styles.container, { padding: 0 }]}>
      {aadhaarVerifyStatus === "SUCCESS" &&
      panVerifyStatus === "SUCCESS" &&
      bankVerifyStatus === "SUCCESS" &&
      mandateVerifyStatus === "SUCCESS" ? (
        // panMisMatch < 20 &&
        // bankMisMatch < 20 ? (

        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                marginTop: "5%",
                marginBottom: "5%",
                color: COLORS.gray,
                letterSpacing: 0.5,
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
          </View>
          <PrimaryButton
            title={
              !fetched || parseInt(ewaLiveSlice?.eligibleAmount) < 1000
                ? "No Active Offer"
                : "Get Money Now"
            }
            disabled={!fetched || parseInt(ewaLiveSlice?.eligibleAmount) < 1000}
            onPress={() => {
              navigation.navigate("EWA_OFFER");
            }}
          />
          <View
            style={{
              marginHorizontal: 20,
            }}
          >
            <Text style={{ color: COLORS.gray, ...FONTS.h3, marginTop: "10%" }}>
              Your past draws
            </Text>
            <Offers data={ewaHistoricalSlice} />
          </View>
        </ScrollView>
      ) : (
        <>
          <Text
            style={{
              color: COLORS.warning,
              ...FONTS.h3,
              alignSelf: "center",
              marginTop: 20,
            }}
          >
            You are not eligible for Advanced Salary.
          </Text>
          <KycCheckCard />
        </>
      )}
    </SafeAreaView>
  );
};

export default EWA;
