import { useIsFocused, useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getBackendData } from "../services/employees/employeeServices";
import { addOffers } from "../store/slices/ewaHistoricalSlice";
import { resetEwaLive } from "../store/slices/ewaLiveSlice";

const HomeOfferCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [id, setId] = useState(useSelector((state) => state.auth.id));
  const ewaLiveSlice = useSelector((state) => state.ewaLive);

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
    <SafeAreaView>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          backgroundColor: "rgba(0,200,0,0.3)",
          borderWidth: 1,
          borderColor: "green",
          height: "auto",
          width: "80%",
          padding: 10,
          borderRadius: 10,
          marginTop: "10%",
          alignSelf: "center",
        }}
        onPress={() => navigation.navigate("Money")}
      >
        <Text
          style={{
            color: "black",
            fontWeight: "bold",
            fontSize: 20,
            marginTop: "2%",
            alignSelf: "center",
          }}
        >
          Get your Salary now!
        </Text>
        <Text
          style={{
            color: "green",
            fontWeight: "bold",
            fontSize: 36,
            marginTop: "4%",
            alignSelf: "center",
          }}
        >
          upto ₹ {ewaLiveSlice.eligibleAmount}
        </Text>
        <Text
          style={{
            color: "purple",
            fontWeight: "bold",
            fontSize: 18,
            marginTop: "2%",
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