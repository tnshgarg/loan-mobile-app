import React ,{useEffect, useState} from 'react'
import { Image, Text, View,SafeAreaView,TextInput, KeyboardAvoidingView} from 'react-native';
import { AppBar,IconButton,Icon, Button} from "@react-native-material/core";
import { useNavigation} from '@react-navigation/core';
import { useStateValue } from "../StateProvider";
import {ProgressBar} from '@react-native-community/progress-bar-android';
import { styles,progressBar, form } from './styles';

export default AadhaarVerify = () => {
    const navigation = useNavigation();
    const [{phn,auth,conf},dispatch] = useStateValue();
    const [otp, setOtp] = useState('');
    const [next, setNext] = useState(false);
  
    async function confirmVerificationCode(code) {
      console.log(conf,phn);
      try {
        navigation.navigate('AadhaarConfirm');
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
  
  return (
    <SafeAreaView>
          <AppBar
    title="Setup Profile"
    color="#4E46F1"
    leading={
      <IconButton icon={<Icon name="arrow-back" size={20} color="white"/>} onPress={()=>navigation.navigate('AadhaarForm')} />
    }
    />
    <View style={progressBar.progressView}>
    <ProgressBar
          styleAttr="Horizontal"
          style={progressBar.progressBar}
          indeterminate={false}
          progress={0.5}
        />
    <Text style={progressBar.progressNos} >2/4</Text>
    </View>
      <View style={styles.container}>
          <Text style={form.OtpAwaitMsg} >OTP has been sent vis SMS to your Aadhaar {'\n'}          registered mobile number
          </Text>
          <TextInput style={styles.otpInput} letterSpacing={23} maxLength={6} numeric value={otp} onChangeText={setOtp} keyboardType="numeric"/>
          <Text style={styles.resendText} onPress={()=>{ResendOtp()}}>Resend OTP</Text>
          {next ? <Button uppercase={false} title="Continue" type="solid"  color="#4E46F1" style={form.nextButton} onPress={() => {confirmVerificationCode(otp)}}/> : <Button title="Continue" uppercase={false} type="solid" style={form.nextButton} disabled/>}
      </View>
    </SafeAreaView>
  )
}