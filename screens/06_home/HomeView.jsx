import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Linking, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import HomeOfferCard from "../../components/molecules/HomeOfferCard";
import KycCheckCard from "../../components/molecules/KycCheckCard";
import { allAreNull } from "../../helpers/nullCheck";
import { addCampaignId } from "../../store/slices/authSlice";
import { styles } from "../../styles";

const HomeView = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const bankStatus = useSelector((state) => state.bank.verifyStatus);
  const panStatus = useSelector((state) => state.pan.verifyStatus);
  const aadhaarStatus = useSelector((state) => state.aadhaar.verifyStatus);
  const mandateStatus = useSelector((state) => state.mandate.verifyStatus);

  const message = [
    aadhaarStatus != "SUCCESS" ? "AADHAAR" : null,
    bankStatus != "SUCCESS" ? "BANK" : null,
    mandateStatus != "SUCCESS" ? "MANDATE" : null,
    panStatus != "SUCCESS" ? "PAN" : null,
  ];

  var [campaignId, setCampaignId] = useState(null);

  useEffect(() => {
    dispatch(addCampaignId(campaignId));
  }, [campaignId]);

  const getUrlAsync = async () => {
    const initialUrl = await Linking.getInitialURL();
    const breakpoint = "/";
    if (initialUrl) {
      const splitted = initialUrl.split(breakpoint);
      console.log("initialUrl", splitted);
      console.log("route", splitted[3]);
      switch (splitted[3].toLowerCase()) {
        case "ewa":
          navigation.navigate("Money");
          break;
        default:
          break;
      }
      switch (splitted[4].toLowerCase()) {
        case "campaign":
          console.log("campaignId", splitted[5]);
          setCampaignId(splitted[5]);
          break;
        default:
          break;
      }
    } else {
      console.log("No intent. User opened App.");
    }
  };

  useEffect(() => {
    getUrlAsync();
  }, []);

  return (
    <>
      <SafeAreaView style={[styles.container]}>
        <KycCheckCard />
        {allAreNull(message) ? <HomeOfferCard /> : null}
      </SafeAreaView>
    </>
  );
};

export default HomeView;
