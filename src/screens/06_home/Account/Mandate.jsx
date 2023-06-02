import { useIsFocused } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../components/atoms/Header";
import DetailsCard from "../../../components/molecules/DetailsCard";
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

  const token = useSelector((state) => state.auth?.token);
  const unipeEmployeeId = useSelector((state) => state.auth?.unipeEmployeeId);
  const mandateSlice = useSelector((state) => state.mandate);
  const authType = mandateSlice.data?.authType?.toUpperCase();
  const [verifyStatus, setVerifyStatus] = useState(mandateSlice?.verifyStatus);
  const { data, error, isLoading } = useGetMandateQuery(unipeEmployeeId, {
    pollingInterval: 1000 * 60 * 2,
  });
  useEffect(() => {
    if (isFocused && unipeEmployeeId) {
      if (data && !isLoading && !error) {
        console.log("Form mandateFetch response.data", response.data);
        if (response.data.status === 200) {
          dispatch(resetMandate(response?.data?.body));
          dispatch(addVerifyStatus(response?.data?.body?.verifyStatus));
          setVerifyStatus(response?.data?.body?.verifyStatus);
        }
      } else {
        console.log("mandateFetch error: ", error);
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

  const backAction = () => {
    navigation.replace("HomeStack", {
      screen: "Account",
    });
    return true;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Header title="Mandate" onLeftIconPress={() => backAction()} />
      {authType && verifyStatus === "SUCCESS" ? (
        <View style={styles.container}>
          <DetailsCard data={cardData()} />
        </View>
      ) : (
        <MandateFormTemplate type="KYC" />
      )}
    </SafeAreaView>
  );
};

export default Mandate;
