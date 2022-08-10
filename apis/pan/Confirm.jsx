import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { Text, View } from "react-native";
import { Button } from "@react-native-material/core";
import {
    addVerifyMsg,
    addVerifyStatus
  } from "../../store/slices/panSlice";
import { panBackendPush } from "../../helpers/BackendPush";
import { bankform, form, styles } from "../../styles";

export default Confirm = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [backendPush, setBackendPush] = useState(false);

    const id = useSelector((state) => state.auth.id);
    const panSlice = useSelector((state) => state.pan);

    const dob = useSelector((state) => panSlice?.dob);
    const email = useSelector((state) =>  panSlice?.email);
    const gender = useSelector((state) =>  panSlice?.gender);
    const name = useSelector((state) =>  panSlice?.name);
    const number = useSelector((state) =>  panSlice?.number); 
    
    const [verifyMsg, setVerifyMsg] = useState(panSlice?.verifyMsg);
    const [verifyStatus, setVerifyStatus] = useState(panSlice?.verifyStatus);

    useEffect(() => {
      dispatch(addVerifyMsg(verifyMsg))
    }, [verifyMsg]);
  
    useEffect(() => {
        dispatch(addVerifyStatus(verifyStatus))
    }, [verifyStatus]);
  
    useEffect(() => {
      console.log(backendPush);
      if (backendPush) {
        panBackendPush({
          id: id,
          dob: dob,
          email: email,
          gender: gender,
          name: name,
          number: number,
          verifyMsg: verifyMsg,
          verifyStatus: verifyStatus,
        });
        setBackendPush(false);
      }
    }, [backendPush]);
    
    return (
        <View style={styles.container}>
          <Text style={form.OtpAwaitMsg}>
            Are these your PAN details ?
            {"\n"}
          </Text>
          <Text style={form.userData}>Number: {number}</Text>
          <Text style={form.userData}>Name: {name}</Text>
          <Text style={form.userData}>Date of Birth: {dob}</Text>
          <Text style={form.userData}>Gender: {gender}</Text>
          <Text style={form.userData}>Email: {email}</Text>
          <View style={{ flexDirection: "row" }}>
            <Button
              title="No"
              type="solid"
              uppercase={false}
              style={form.noButton}
              color="#EB5757"
              onPress={() => {
                setVerifyMsg("Rejected by User");
                navigation.navigate("PanForm");
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
                navigation.navigate("BankInfoForm");
              }}
            />
            <View style={bankform.padding}></View>
          </View>
        </View>
    );
};
