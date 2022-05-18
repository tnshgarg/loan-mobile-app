import React ,{useEffect, useState} from 'react'
import { Image, Text, View,SafeAreaView,TextInput} from 'react-native';
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
    <SafeAreaView style={{flex:1,backgroundColor:"white",height:"100%"}}>
        <View >
            <Image style={{marginLeft:70,marginTop:30,width:250,height:87}} source={require("../Unipe-Thumbnail.png")}/>
            <Text style={{fontSize:16,color:"#230C45",marginLeft:75,marginTop:40,fontFamily:"Roboto"}}>Enter Mobile Number for Verification</Text>
            <Text style={{fontSize:14,fontFamily:"Noto Sans",marginTop:60,marginLeft:40,color:"#020614"}}>Mobile Number</Text>
            {console.log(DeviceInfo.getPhoneNumber())}
            <TextInput style={{marginLeft:40,width:320,height:50,borderBottomWidth:1}} value={phoneNumber} onChangeText={setPhoneNumber} autoCompleteType="tel" keyboardType="phone-pad" textContentType="telephoneNumber"/>
            {next ? <Button uppercase={false} title="Continue" type="solid" style={{padding:10,marginLeft:40,marginTop:50,width:320,height:60,fontSize:20}} color="#4E46F1" onPress={() => {signIn(phoneNumber) }}/>: <Button uppercase={false} title="Continue" type="solid" style={{padding:10,marginLeft:40,marginTop:50,width:320,height:60,fontSize:20}} disabled/>}
            <Button uppercase={false} title="ESCAPE" type="solid" style={{padding:10,marginLeft:40,marginTop:50,width:320,height:60,fontSize:20}} color="#4E46F1" onPress={() => {navigation.navigate("PersonlInfoForm") }}/>
            <Button uppercase={false} title="ESCAPE home" type="solid" style={{padding:10,marginLeft:40,marginTop:50,width:320,height:60,fontSize:20}} onPress={() => {navigation.navigate("Home") }}/>  
        </View>
    </SafeAreaView>
  )
}

export default LoginScreen;