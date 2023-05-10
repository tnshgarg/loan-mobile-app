import { useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { useIsFocused } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "../../../styles";
import DetailsCard from "../../../components/molecules/DetailsCard";
import Header from "../../../components/atoms/Header";
import {
  addVerifyStatus,
  resetMandate,
} from "../../../store/slices/mandateSlice";
import MandateFormTemplate from "../../../templates/mandate/Form";
import { getBackendData } from "../../../services/employees/employeeServices";

const Mandate = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const token = useSelector((state) => state.auth?.token);
  const unipeEmployeeId = useSelector((state) => state.auth?.unipeEmployeeId);
  const mandateSlice = useSelector((state) => state.mandate);
  const authType = mandateSlice.data?.authType?.toUpperCase();
  const [verifyStatus, setVerifyStatus] = useState(mandateSlice?.verifyStatus);

  useEffect(() => {
    if (isFocused && unipeEmployeeId) {
      getBackendData({
        params: { unipeEmployeeId: unipeEmployeeId },
        xpath: "mandate",
        token: token,
      })
        .then((response) => {
          console.log("Form mandateFetch response.data", response.data);
          if (response.data.status === 200) {
            dispatch(resetMandate(response?.data?.body));
            dispatch(addVerifyStatus(response?.data?.body?.verifyStatus));
            setVerifyStatus(response?.data?.body?.verifyStatus);
          }
        })
        .catch((error) => {
          console.log("mandateFetch error: ", error);
        });
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
