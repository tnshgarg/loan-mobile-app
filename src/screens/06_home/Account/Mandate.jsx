import { useIsFocused } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DetailsCard from "../../../components/molecules/DetailsCard";
import {
  InteractionTypes,
  setSessionValue,
  trackEvent,
} from "../../../helpers/analytics/commonAnalytics";
import { EWA_POLLING_DURATION } from "../../../services/constants";
import { useGetMandateQuery } from "../../../store/apiSlices/mandateApi";
import {
  addVerifyStatus,
  resetMandate,
} from "../../../store/slices/mandateSlice";
import { styles } from "../../../styles";
import MandateFormTemplate from "../../../templates/mandate/Form";

const Mandate = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const unipeEmployeeId = useSelector((state) => state.auth?.unipeEmployeeId);
  const {
    data: mandateData,
    isLoading: mandateLoading,
    isError: mandateError,
  } = useGetMandateQuery(unipeEmployeeId, {
    pollingInterval: EWA_POLLING_DURATION,
  });

  console.log("Mandate Log: ", mandateData?.body);

  const authType = mandateData?.body?.data?.authType?.toUpperCase();
  const [verifyStatus, setVerifyStatus] = useState(
    mandateData?.body?.verifyStatus
  );
  console.log({ verifyStatus });
  useEffect(() => {
    setSessionValue("flow", "mandate");
  }, []);

  useEffect(() => {
    trackEvent({
      interaction: InteractionTypes.SCREEN_OPEN,
      screen: "mandate",
      action: "START",
    });
  }, []);

  useEffect(() => {
    if (isFocused && unipeEmployeeId) {
      if (mandateData && !mandateLoading && !mandateError) {
        console.log("Form mandateFetch response.data", mandateData?.body?.data);
        if (mandateData?.body?.status === 200) {
          dispatch(resetMandate(mandateData?.body));
          dispatch(addVerifyStatus(mandateData?.body?.verifyStatus));
          setVerifyStatus(mandateData?.body?.verifyStatus);
        }
      } else {
        console.log("mandateFetch error: ", mandateError);
      }
    }
  }, [isFocused]);

  const cardData = () => {
    let res = [
      {
        subTitle: "Mandate Type",
        value: authType,
        fullWidth: true,
      },
      {
        subTitle: "Verify Status",
        value: verifyStatus,
      },
    ];
    return res;
  };

  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {authType && verifyStatus === "SUCCESS" ? (
        <View style={styles.container}>
          <DetailsCard data={cardData()} variant={"light"} />
        </View>
      ) : (
        <MandateFormTemplate type="KYC" />
      )}
    </SafeAreaView>
  );
};

export default Mandate;
