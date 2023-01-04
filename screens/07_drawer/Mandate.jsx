import { useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MandateFormTemplate from "../../templates/mandate/Form";
import { styles } from "../../styles";
import TopTabNav from "../../navigators/TopTabNav";
import DetailsCard from "../../components/molecules/DetailsCard";
import { getBackendData } from "../../services/employees/employeeServices";
import {
  addVerifyStatus,
  resetMandate,
} from "../../store/slices/mandateSlice";

const Mandate = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth?.token);
  const unipeEmployeeId = useSelector((state) => state.auth?.unipeEmployeeId);
  const mandateSlice = useSelector((state) => state.mandate);
  const authType = mandateSlice.data?.authType?.toUpperCase();
  const [verifyStatus, setVerifyStatus] = useState(mandateSlice?.verifyStatus);

  useEffect(() => {
    dispatch(addVerifyStatus(verifyStatus));
  }, [verifyStatus]);

  useEffect(() => {
    if (unipeEmployeeId && verifyStatus !== "SUCCESS") {
      getBackendData({
        params: { unipeEmployeeId: unipeEmployeeId },
        xpath: "mandate",
        token: token,
      })
      .then((response) => {
        console.log("mandateFetch response.data", response.data);
        if (response.data.status === 200) {
          dispatch(resetMandate(response?.data?.body));
          setVerifyStatus(response?.data?.body?.verifyStatus);
        }
      })
      .catch((error) => {
        console.log("mandateFetch error: ", error);
      });
    }
  }, [unipeEmployeeId, verifyStatus]);

  const cardData = () => {
    var res = [
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

  const tabs = [
    {
      name: "Mandate",
      component: MandateFormTemplate,
      initialParams: { type: "KYC" },
      disable: true,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {authType && verifyStatus === "SUCCESS" ? (
        <View style={styles.container}>
          <DetailsCard data={cardData()} />
        </View>
      ) : (
        <TopTabNav tabs={tabs} hide={true} />
      )}
    </SafeAreaView>
  );
};

export default Mandate;
