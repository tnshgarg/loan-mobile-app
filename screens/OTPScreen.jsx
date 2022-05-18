import React ,{useEffect, useState} from 'react'
import { Image, Text, View,SafeAreaView,TextInput, KeyboardAvoidingView} from 'react-native';
import tw from 'twrnc';
import { Button,Icon,Grid} from "@react-native-material/core";
import { useNavigation} from '@react-navigation/core';
import { useStateValue } from "../StateProvider";

const OTPScreen = () => {
  const navigation = useNavigation();
  const [{phn,auth,conf},dispatch] = useStateValue();
  const [otp, setOtp] = useState('');
  const [next, setNext] = useState(false);

  async function confirmVerificationCode(code) {
    console.log(conf,phn);
    try {
      // navigation.navigate('PersonlInfoForm');
    } catch (error) {
      alert('Invalid code');
    }
  }
  
  async function ResendOtp() {
    try {
      console.log('resend');
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    if(otp.length === 6){
      setNext(true);
    }
    else{
      setNext(false);
    }
  }, [otp]);


  useEffect(() => {
    if(auth){
      navigation.navigate('PersonlInfoForm');
    }
  }, [auth]);


  return (
    <SafeAreaView>
      <View style={tw`bg-white h-full`}>
          <Image style={tw`ml-20 mt-8 w-64 h-32`} source={require("../Unipe-Thumbnail.png")}/>
          <Text style={{color:"#230C45",marginLeft:65,marginTop:30,fontSize:16,fontFamily:"Roboto"}} >Please wait, we will auto verify the OTP {'\n'}                 sent to {phn}
          <Icon name="edit" size={12} color="#4E46F1" onPress={() =>navigation.navigate('Login')}/>
          </Text>
          <TextInput style={tw`ml-28 mt-20 w-44 h-12 border-b-2`} autoFocus={true} letterSpacing={23} maxLength={6} numeric value={otp} onChangeText={setOtp} keyboardType="numeric"/>
          <Text style={{color:"#4E46F1",marginLeft:155,marginTop:30,fontSize:16,fontFamily:"Roboto"}} onPress={()=>{ResendOtp()}}>Resend OTP</Text>
          {next ? <Button uppercase={false} title="Verify" type="solid"  color="#4E46F1" style={tw` p-2 ml-10 mt-5 w-80 h-14 text-xl rounded`} onPress={() => {confirmVerificationCode(otp)}}><Text>Verify</Text></Button> : <Button title="Verify" uppercase={false} type="solid" style={tw`p-2 ml-10 mt-5 w-80 h-14 text-xl rounded`} disabled/>}
      </View>
    </SafeAreaView>
  )
}

export default OTPScreen