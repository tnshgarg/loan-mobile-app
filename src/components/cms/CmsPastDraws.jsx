import React from "react";
import { ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import { navigationRef } from "../../navigators/RootNavigation";
import LogoHeaderBack from "../molecules/LogoHeaderBack";
import PastDrawsCard from "../molecules/PastDrawsCard";

const CmsPastDraws = () => {
  const ewaHistoricalSlice = useSelector((state) => state.ewaHistorical);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <LogoHeaderBack
        title={"Past Draws"}
        onLeftIconPress={() => navigationRef.goBack()}
      />
      <ScrollView
        style={{ paddingHorizontal: 15 }}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <PastDrawsCard screenType="full" data={ewaHistoricalSlice} />
      </ScrollView>
    </View>
  );
};

export default CmsPastDraws;
