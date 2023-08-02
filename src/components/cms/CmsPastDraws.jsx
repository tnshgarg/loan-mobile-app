import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import {
  InteractionTypes,
  trackEvent
} from "../../helpers/analytics/commonAnalytics";
import { navigationRef } from "../../navigators/RootNavigation";
import LogoHeaderBack from "../molecules/LogoHeaderBack";
import PastDrawsCard from "../molecules/PastDrawsCard";

const CmsPastDraws = () => {
  const ewaHistoricalSlice = useSelector((state) => state.ewaHistorical);

  useEffect(() => {
    trackEvent({
      interaction: InteractionTypes.SCREEN_OPEN,
      screen: "pastWithdrawals",
      action: "START",
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <LogoHeaderBack
        title={"Past Draws"}
        onLeftIconPress={() => {
          trackEvent({
            interaction: InteractionTypes.BUTTON_PRESS,
            screen: "pastWithdrawals",
            action: "BACK",
          });
          navigationRef.goBack();
        }}
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
