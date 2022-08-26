import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { Text, View, Image } from "react-native";
import { Button } from "@react-native-material/core";
import { addVerifyMsg, addVerifyStatus ,addVerifyTimestamp} from "../../store/slices/aadhaarSlice";
import { bankform, form, styles } from "../../styles";
import { aadhaarBackendPush } from "../../helpers/BackendPush";

export default Confirm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [backendPush, setBackendPush] = useState(false);

  const id = useSelector((state) => state.auth.id);
  const data = useSelector((state) => state.aadhaar.data);
  const number = useSelector((state) => state.aadhaar.number);
  const verifyTimestamp = useSelector((state) => state.aadhaar.verifyTimestamp);

  const aadhaarSlice = useSelector((state) => state.aadhaar);
  const [verifyMsg, setVerifyMsg] = useState(aadhaarSlice?.verifyMsg);
  const [verifyStatus, setVerifyStatus] = useState(aadhaarSlice?.verifyStatus);

  useEffect(() => {
    dispatch(addVerifyMsg(verifyMsg));
  }, [verifyMsg]);

  useEffect(() => {
    dispatch(addVerifyStatus(verifyStatus));
  }, [verifyStatus]);

  useEffect(() => {
    dispatch(addVerifyTimestamp(verifyTimestamp))
  }, [verifyTimestamp]);

  useEffect(() => {
    console.log(backendPush);
    if (backendPush) {
      aadhaarBackendPush({
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
      <Text style={form.OtpAwaitMsg}>
        Are these your AADHAAR details ?{"\n"}
      </Text>

      <Image
        source={{
          uri: `data:image/jpeg;base64,${data["photo_base64"]}`,
        }}
        style={form.aadharimg}
      />
      <Text style={form.userData}>Number: {number}</Text>
      <Text style={form.userData}>Name: {data["name"]}</Text>
      <Text style={form.userData}>Date of Birth: {data["date_of_birth"]}</Text>
      <Text style={form.userData}>Gender: {data["gender"]}</Text>

      <View
        style={{
          alignSelf: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <Button
          title="No"
          type="solid"
          uppercase={false}
          style={form.noButton}
          color="#EB5757"
          onPress={() => {
            setVerifyMsg("Rejected by User");
            setVerifyStatus("ERROR");
            setBackendPush(true);
            navigation.navigate("AadhaarForm");
          }}
        />
        <Button
          title="Yes"
          type="solid"
          uppercase={false}
          style={form.yesButton}
          color="#4E46F1"
          onPress={() => {
            setVerifyMsg("Confirmed by User");
            setVerifyStatus("SUCCESS");
            setBackendPush(true);
            navigation.navigate("PanForm");
          }}
        />
        <View style={bankform.padding}></View>
      </View>
    </View>
  );
};
