import { useEffect } from "react";
import TopTabNav from "../../../navigators/TopTabNav";

import { BackHandler, SafeAreaView } from "react-native";
import Header from "../../../components/atoms/Header";
import { styles } from "../../../styles";
import Aadhaar from "./Aadhaar";
import Bank from "./Bank";
import Pan from "./Pan";

import { useDispatch, useSelector } from "react-redux";
import { getBackendData } from "../../../services/employees/employeeServices";
import { resetAadhaar } from "../../../store/slices/aadhaarSlice";
import { resetBank } from "../../../store/slices/bankSlice";
import { resetPan } from "../../../store/slices/panSlice";

const KYCScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const tabs = [
    { name: "AADHAAR", component: Aadhaar },
    { name: "PAN", component: Pan },
    { name: "BANK", component: Bank },
    // { name: "MANDATE", component: Mandate },
  ];

  const backAction = () => {
    navigation.navigate("HomeStack", { screen: "Account" });
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  useEffect(() => {
    if (unipeEmployeeId) {
      getBackendData({
        params: { unipeEmployeeId: unipeEmployeeId },
        xpath: "aadhaar",
        token: token,
      })
        .then((response) => {
          console.log("aadhaarBackendFetch response.data", response.data);
          if (response.data.status === 200) {
            dispatch(resetAadhaar(response.data.body));
          }
        })
        .catch((error) => {
          console.log("aadhaarBackendFetch error: ", error);
        });
    }
  }, [unipeEmployeeId]);

  useEffect(() => {
    if (unipeEmployeeId) {
      getBackendData({
        params: { unipeEmployeeId: unipeEmployeeId },
        xpath: "bank",
        token: token,
      })
        .then((response) => {
          console.log("bankBackendFetch response.data", response.data);
          if (response.data.status === 200) {
            dispatch(resetBank(response.data.body));
          }
        })
        .catch((error) => {
          console.log("bankBackendFetch error: ", error);
        });
    }
  }, [unipeEmployeeId]);

  useEffect(() => {
    if (unipeEmployeeId) {
      getBackendData({
        params: { unipeEmployeeId: unipeEmployeeId },
        xpath: "pan",
        token: token,
      })
        .then((response) => {
          console.log("panBackendFetch response.data", response.data);
          if (response.data.status === 200) {
            dispatch(resetPan(response.data.body));
          }
        })
        .catch((error) => {
          console.log("panBackendFetch error: ", error);
        });
    }
  }, [unipeEmployeeId]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header title="KYC" onLeftIconPress={() => backAction()} />
      <TopTabNav tabs={tabs} hide={false} />
    </SafeAreaView>
  );
};

export default KYCScreen;
