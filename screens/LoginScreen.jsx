import React ,{useEffect, useState} from 'react'
import { Image, Text, View,SafeAreaView,TextInput} from 'react-native';
import { useNavigation} from '@react-navigation/core';
import { useStateValue } from "../StateProvider";
import DeviceInfo from 'react-native-device-info';
import { Button } from "@react-native-material/core";
import {styles} from "./styles";

export default LoginScreen = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [next, setNext] = useState(false);
  const [{conf},dispatch] = useStateValue();
  const [confirm, setConfirm] = useState(null);

  async function signIn(phoneNumber) {
    try {
      navigation.navigate('Otp');
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    dispatch({
      type: "SET_CONF",
      payload: confirm,
    })}, [confirm]);

  useEffect(() => {
    dispatch({
      type: "SET_PHONE",
      payload: phoneNumber,
    })}, [phoneNumber]);

  useEffect(() => {
    if(phoneNumber.length === 10){
      setNext(true);
    }
    else{
      setNext(false);
    }
  }, [phoneNumber]);

  return (
    <SafeAreaView style={styles.container}>
        <View >
            <Image style={styles.logo} source={require("../assets/unipe-Thumbnail.png")}/>
            <Text style={styles.headline}>Enter Mobile Number for Verification</Text>
            <Text style={styles.fieldLabel}>Mobile Number</Text>
            {console.log(DeviceInfo.getPhoneNumber())}
            <TextInput style={styles.textInput} value={phoneNumber} onChangeText={setPhoneNumber} autoCompleteType="tel" keyboardType="phone-pad" textContentType="telephoneNumber"/>
            {next ? <Button uppercase={false} title="Continue" type="solid" style={styles.ContinueButton} color="#4E46F1" onPress={() => {signIn(phoneNumber) }}/>: <Button uppercase={false} title="Continue" type="solid" style={styles.ContinueButton} disabled/>}
        </View>
    </SafeAreaView>
  )
}

