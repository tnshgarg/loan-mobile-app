import { useEffect, useState } from "react";
import { SafeAreaView, Text, View, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { checkBox, styles } from "../../../../styles";
import PrimaryButton from "../../../../components/PrimaryButton";
import HomeMain from "../../HomeMain";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import Offers from "../../../../components/DataCard";
import { getBackendData } from "../../../../services/employees/employeeServices";
import { resetEwaLive } from "../../../../store/slices/ewaLiveSlice";
import { addOffers } from "../../../../store/slices/ewaHistoricalSlice";

const EWA = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [id, setId] = useState(useSelector((state) => state.auth.id));

  const name = useSelector((state) => state.aadhaar.data.name);
  const aadhaarVerifyStatus = useSelector(
    (state) => state.aadhaar.verifyStatus
  );
  const panVerifyStatus = useSelector((state) => state.pan.verifyStatus);
  const bankVerifyStatus = useSelector((state) => state.bank.verifyStatus);
  const panMisMatch = useSelector((state) => state.pan.misMatch);
  const bankMisMatch = useSelector((state) => state.bank.misMatch);

  const ewaLiveSlice = useSelector((state) => state.ewaLive);
  const ewaHistoricalSlice = useSelector((state) => state.ewaHistorical);
  useEffect(() => {
    console.log("ewaOffersFetch unipeEmployeeId:", id);
    if (isFocused && id) {
      getBackendData({ params: { unipeEmployeeId: id }, xpath: "ewa/offers" })
        .then((response) => {
          if (response.data.status === 200) {
            dispatch(resetEwaLive(response.data.body.live));
            dispatch(addOffers(response.data.body.past));
            console.log("ewaOffersFetch response.data: ", response.data);
          }
        })
        .catch((error) => {
          console.log("ewaOffersFetch error: ", error);
        });
    }
  }, [isFocused, id]);

  return (
    <SafeAreaView style={styles.container}>
      {aadhaarVerifyStatus === "SUCCESS" &&
      panVerifyStatus === "SUCCESS" &&
      bankVerifyStatus === "SUCCESS" ? (
        // panMisMatch < 20 &&
        // bankMisMatch < 20 ? (

        <ScrollView>
          <View
            style={{
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                marginTop: "8%",
                marginBottom: "8%",
                color: "#597E8D",
                letterSpacing: 0.5,
              }}
            >
              {name} get on demand salary
            </Text>
            <Text style={{ 
              alignSelf: "center",
              color: "green",
              fontWeight: "bold", 
              fontSize: 36,
            }}>
              ₹ {ewaLiveSlice?.eligibleAmount}
            </Text>
          </View>
          <PrimaryButton
            title="Get money now"
            uppercase={false}
            // disabled={parseInt(ewaLiveSlice?.eligibleAmount)<1000}
            onPress={() => {
              navigation.navigate("EWA_OFFER");
            }}
          />
          <View
            style={{
              marginHorizontal: 20,
            }}
          >
            <Text style={{ fontSize: 16, color: "#597E8D", marginTop: "10%" }}>
              Your past draws
            </Text>
            <Offers data={ewaHistoricalSlice} />
          </View>
          <DataCard data={ewaHistoricalSlice} />
          <View style={checkBox.padding}></View>
        </ScrollView>
      ) : (
        <>
          <Text
            style={{
              color: "red",
              fontWeight: "bold",
              alignSelf: "center",
              marginTop: 20,
            }}
          >
            You are not eligible for Advanced Salary.
          </Text>
          <HomeMain />
        </>
      )}
    </SafeAreaView>
  );
};

export default EWA;
