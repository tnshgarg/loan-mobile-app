import React ,{useEffect, useState} from 'react'
import { Image, Text, View,SafeAreaView,TextInput} from 'react-native';
import tw from "twrnc";
import { useNavigation} from '@react-navigation/core';
import { useStateValue } from "../StateProvider";
import DeviceInfo from 'react-native-device-info';
import { Button } from "@react-native-material/core";

const LoginScreen = () => {
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
    <SafeAreaView style={tw`bg-white h-full flex-1`}>
        <View >
            <Image style={tw`ml-20 mt-8 w-64 h-32`} source={require("../Unipe-Thumbnail.png")}/>
            <Text style={{fontSize:16,color:"#230C45",marginLeft:75,marginTop:40,fontFamily:"Roboto"}}>Enter Mobile Number for Verification</Text>
            <Text style={{fontSize:14,fontFamily:"Noto Sans",marginTop:60,marginLeft:40,color:"#020614"}}>Mobile Number</Text>
            {console.log(DeviceInfo.getPhoneNumber())}
            <TextInput style={tw`ml-10 w-80 h-12 border-b-2`} autoFocus={true} value={phoneNumber} onChangeText={setPhoneNumber} autoCompleteType="tel" keyboardType="phone-pad" textContentType="telephoneNumber"/>
            {next ? <Button uppercase={false} title="Continue" type="solid" style={tw`p-2 ml-10 mt-18 w-80 h-14 text-xl text-center content-center`} color="#4E46F1" onPress={() => {signIn(phoneNumber) }}/>: <Button uppercase={false} title="Continue" type="solid" style={tw` p-2 ml-10 mt-18 w-80 h-14 text-xl text-center`} disabled/>}
            {/* <Button uppercase={false} title="ESCAPE" type="solid" style={tw`p-2 ml-10 mt-5 w-80 h-14 text-xl`} color="#4E46F1" onPress={() => {navigation.navigate("PersonlInfoForm") }}/>
            <Button uppercase={false} title="ESCAPE home" type="solid" style={tw`ml-10 mt-5 w-80 h-14 text-xl`} onPress={() => {navigation.navigate("Home") }}/>   */}
        </View>
    </SafeAreaView>
  )
}

export default LoginScreen;