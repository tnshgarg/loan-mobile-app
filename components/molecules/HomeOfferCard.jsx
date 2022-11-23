import { useIsFocused, useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { COLORS, FONTS } from "../../constants/Theme";
import { getBackendData } from "../../services/employees/employeeServices";
import { resetEwaHistorical } from "../../store/slices/ewaHistoricalSlice";
import { resetEwaLive } from "../../store/slices/ewaLiveSlice";
import PrimaryButton from "../atoms/PrimaryButton";

const HomeOfferCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const token = useSelector((state) => state.auth.token);
  const ewaLiveSlice = useSelector((state) => state.ewaLive);

  useEffect(() => {
    console.log("ewaOffersFetch unipeEmployeeId:", unipeEmployeeId);
    if (isFocused) {
      getBackendData({
        params: { unipeEmployeeId: unipeEmployeeId },
        xpath: "ewa/offers",
        token: token,
      })
        .then((response) => {
          if (response.data.status === 200) {
            console.log("ewaOffersFetch response.data: ", response.data);
            dispatch(resetEwaLive(response.data.body.live));
            dispatch(resetEwaHistorical(response.data.body.past));
          }
        })
        .catch((error) => {
          console.log("ewaOffersFetch error: ", error);
        });
    }
  }, [isFocused, unipeEmployeeId]);

  return (
    <SafeAreaView>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          backgroundColor: COLORS.primaryBackground,
          borderWidth: 1,
          borderColor: COLORS.primary,
          height: "auto",
          width: "100%",
          padding: 15,
          borderRadius: 5,
          alignSelf: "center",
        }}
        onPress={() => navigation.navigate("Money", {screen: "EWA"})}
      >
        <Text
          style={{
            color: COLORS.black,
            ...FONTS.body3,
            marginTop: "2%",
            alignSelf: "center",
          }}
        >
          Get your Salary now!
        </Text>
        <Text
          style={{
            color: COLORS.primary,
            ...FONTS.h1,
            marginVertical: "3%",
            alignSelf: "center",
          }}
        >
          upto ₹ {ewaLiveSlice.eligibleAmount}
        </Text>
        <Text
          style={{
            color: COLORS.black,
            ...FONTS.body3,
            alignSelf: "center",
          }}
        >
          Before {ewaLiveSlice.dueDate}
        </Text>
        <PrimaryButton
          title={"Withdraw Now"}
          onPress={() => navigation.navigate("Money", {screen: "EWA"})}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeOfferCard;
