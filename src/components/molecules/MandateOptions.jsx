import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { useSelector } from "react-redux";
import { useGetMandateOptionsQuery } from "../../store/apiSlices/mandateApi";
import CmsLoading from "../cms/CmsLoading";
import { Aadhaar, DebitCard, NA, NetBanking, Upi } from "./MandateItems";

const MandateOptions = ({ ProceedButton, disabled, authType }) => {
  console.log("MandateOptions", ProceedButton, disabled, authType);
  const isFocused = useIsFocused();
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const [mandateButtons, setMandateButtons] = useState([]);
  const {
    isLoading: getMandateOptionsLoading,
    error: getMandateOptionsError,
    data: getMandateOptionsData,
  } = useGetMandateOptionsQuery(unipeEmployeeId, {
    pollingInterval: isFocused ? 1000 * 10 : undefined,
  });

  let AllMandateOptions = {
    DebitCard: (
      <DebitCard
        ProceedButton={ProceedButton}
        disabled={disabled}
        authType={authType}
      />
    ),
    NetBanking: (
      <NetBanking
        ProceedButton={ProceedButton}
        disabled={disabled}
        authType={authType}
      />
    ),
    Aadhaar: (
      <Aadhaar
        ProceedButton={ProceedButton}
        disabled={disabled}
        authType={authType}
      />
    ),
    UPI: (
      <Upi
        ProceedButton={ProceedButton}
        disabled={disabled}
        authType={authType}
      />
    ),
    NA: <NA />,
  };

  useEffect(() => {
    if (!getMandateOptionsLoading) {
      let mandateOptions = [];
      const usermandateoptions = [];
      console.log("getMandateOptionsData", getMandateOptionsData);
      if (!getMandateOptionsError && getMandateOptionsData?.body?.methods) {
        mandateOptions = getMandateOptionsData?.body?.methods;
      }
      mandateOptions.map((item) => {
        usermandateoptions.push(AllMandateOptions[item]);
      });

      if (usermandateoptions.length > 1) {
        usermandateoptions[0].subtitle = "Recommended";
      }

      if (usermandateoptions.length > 0) {
        setMandateButtons(usermandateoptions);
      } else {
        setMandateButtons([AllMandateOptions["NA"]]);
      }
      console.log("mandateButtons", mandateButtons, usermandateoptions);
    }
  }, [unipeEmployeeId, getMandateOptionsLoading]);

  return (
    <View style={styles.ParentContainer}>
      {getMandateOptionsLoading ? (
        <CmsLoading />
      ) : (
        <>
          {mandateButtons.map((item, index) => {
            return <View key={index}>{item}</View>;
          })}
        </>
      )}
    </View>
  );
};

const styles = EStyleSheet.create({
  ParentContainer: { padding: 2 },
});
export default MandateOptions;
