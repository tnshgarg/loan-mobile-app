import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { Text, View } from "react-native";
import { Button } from "@react-native-material/core";
import { addVerifyMsg, addVerifyStatus } from "../../store/slices/panSlice";
import { panBackendPush } from "../../helpers/BackendPush";
import { bankform, form, styles } from "../../styles";
import { COLORS } from "../../constants/Theme";
import FuzzyCheck from "../../components/FuzzyCheck";
import Analytics from 'appcenter-analytics';

const PanConfirmApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [backendPush, setBackendPush] = useState(false);

  const id = useSelector((state) => state.auth.id);
  const data = useSelector((state) => state.pan.data);
  const number = useSelector((state) => state.pan.number);
  const verifyTimestamp = useSelector((state) => state.pan.verifyTimestamp);

  const panSlice = useSelector((state) => state.pan);
  const [verifyMsg, setVerifyMsg] = useState(panSlice?.verifyMsg);
  const [verifyStatus, setVerifyStatus] = useState(panSlice?.verifyStatus);

  useEffect(() => {
    dispatch(addVerifyMsg(verifyMsg));
  }, [verifyMsg]);

  useEffect(() => {
    dispatch(addVerifyStatus(verifyStatus));
  }, [verifyStatus]);

  useEffect(() => {
    console.log(backendPush);
    if (backendPush) {
      panBackendPush({
        id: id,
        data: data,
        number: number,
        verifyMsg: verifyMsg,
        verifyStatus: verifyStatus,
        verifyTimestamp: verifyTimestamp,
      });
      setBackendPush(false);
    }
  }, [backendPush]);

  return (
    <View style={styles.container}>
      <Text style={form.OtpAwaitMsg}>Are these your PAN details ?{"\n"}</Text>
      <Text style={form.userData}>Number: {number}</Text>
      <Text style={form.userData}>Name: {data["name"]}</Text>
      <Text style={form.userData}>Date of Birth: {data["date_of_birth"]}</Text>
      <Text style={form.userData}>Gender: {data["gender"]}</Text>
      {data["email"] && (
        <Text style={form.userData}>Email: {data["email"]}</Text>
      )}

      <View
        style={{
          alignSelf: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <FuzzyCheck name={data["name"]} step="PAN" />
        <Button
          title="No"
          type="solid"
          uppercase={false}
          style={form.noButton}
          color={COLORS.warning}
          onPress={() => {
            setVerifyMsg("Rejected by User");
            setVerifyStatus("ERROR");
            Analytics.trackEvent('PanInfo unConfirmed', { Category: 'Onboarding', userId: id, error:"Rejected by User" });
            setBackendPush(true);
            {
              props?.route?.params?.type == "KYC"
                ? navigation.navigate("KYC", {
                    screen: "PAN",
                  })
                : navigation.navigate("PanForm");
            }
          }}
        />
        <Button
          title="Yes"
          type="solid"
          uppercase={false}
          style={form.yesButton}
          color={COLORS.primary}
          onPress={() => {
            setVerifyMsg("Confirmed by User");
            Analytics.trackEvent('PanInfo Confirmed', { Category: 'Onboarding', userId: id});
            setVerifyStatus("SUCCESS");
            setBackendPush(true);
            {
              props?.route?.params?.type == "KYC"
                ? navigation.navigate("KYC", {
                    screen: "PAN",
                    params: {
                      screen: "PAN Data",
                    },
                  })
                : navigation.navigate("BankForm");
            }
          }}
        />
        <View style={bankform.padding}></View>
      </View>
    </View>
  );
};

export default PanConfirmApi;
