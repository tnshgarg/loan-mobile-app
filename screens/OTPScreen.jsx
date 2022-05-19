import React ,{useEffect, useState} from 'react'
import { Image, Text, View,SafeAreaView,TextInput, KeyboardAvoidingView} from 'react-native';
import { Button,Icon,Grid} from "@react-native-material/core";
import { useNavigation} from '@react-navigation/core';
import { useStateValue } from "../StateProvider";
import { styles } from './styles';

export default OTPScreen = () => {
  const navigation = useNavigation();
  const [{phone_number,auth,AuthConfirmation},dispatch] = useStateValue();
  const [otp, setOtp] = useState('');
  const [next, setNext] = useState(false);

  async function confirmVerificationCode(code) {
    console.log(AuthConfirmation,phone_number);
    try {
      navigation.navigate('PersonlInfoForm');
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
      <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/unipe-Thumbnail.png")}/>
          <Text style={styles.headline} >Please wait, we will auto verify the OTP {'\n'}             sent to {phone_number}
          <Icon name="edit" size={12} color="#4E46F1" onPress={() =>navigation.navigate('Login')}/>
          </Text>
          <TextInput style={styles.otpInput} letterSpacing={23} maxLength={6} numeric value={otp} onChangeText={setOtp} keyboardType="numeric"/>
          <Text style={styles.resendText} onPress={()=>{ResendOtp()}}>Resend OTP</Text>
          {next ? <Button uppercase={false} title="Verify" type="solid"  color="#4E46F1" style={styles.ContinueButton} onPress={() => {confirmVerificationCode(otp)}}><Text>Verify</Text></Button> : <Button title="Verify" uppercase={false} type="solid"  style={styles.ContinueButton} disabled/>}
      </View>
    </SafeAreaView>
  )
}
