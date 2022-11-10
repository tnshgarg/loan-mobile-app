import { useIsFocused, useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { COLORS, FONTS } from "../constants/Theme";
import { getBackendData } from "../services/employees/employeeServices";
import { resetEwaHistorical } from "../store/slices/ewaHistoricalSlice";
import { resetEwaLive } from "../store/slices/ewaLiveSlice";


const HomeOfferCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const ewaLiveSlice = useSelector((state) => state.ewaLive);

  useEffect(() => {
    console.log("ewaOffersFetch unipeEmployeeId:", unipeEmployeeId);
    if (isFocused && unipeEmployeeId) {
      getBackendData({ params: { unipeEmployeeId: unipeEmployeeId }, xpath: "ewa/offers" })
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
        onPress={() => navigation.navigate("Money")}
      >
        <Text
          style={{
            color: COLORS.black,
            ...FONTS.h3,
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
            ...FONTS.h3,
            alignSelf: "center",
          }}
        >
          Before {ewaLiveSlice.dueDate}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeOfferCard;
