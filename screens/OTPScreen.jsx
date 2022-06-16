import React ,{useEffect, useState} from 'react'
import { Image, Text, View,SafeAreaView,TextInput, ScrollView} from 'react-native';
import { Button,Icon,Grid} from "@react-native-material/core";
import { useNavigation} from '@react-navigation/core';
import { useStateValue } from "../StateProvider";
import { styles } from './styles';

import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';
import awsconfig from '../src/aws-exports';
Amplify.configure(awsconfig);

export default OTPScreen = () => {
  const navigation = useNavigation();
  const [{phone_number,session},dispatch] = useStateValue();
  const [otp, setOtp] = useState('');
  const [next, setNext] = useState(false);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    dispatch({
      type: "SET_USER",
      payload: user,
    })}, [user]);
    
  useEffect(() => {
    console.log('Ready to auth');
    verifyAuth();
  }, []);

  const verifyAuth = () => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setUser(user);
        console.log('User is authenticated');
        console.log(user);
      })
      .catch((err) => {
        console.error(err);
      });
  };

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

  const verifyOtp = () => {
    Auth.sendCustomChallengeAnswer(session, otp)
      .then((user) => {
        setUser(user);
        console.log("THIS IS THE USER");
        console.log(user);
        navigation.navigate('AadhaarForm');
      })
      .catch((err) => {
        setOtp('');
        console.log(err);
      });
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/unipe-Thumbnail.png")}/>
          <Text style={styles.headline} >Please wait, we will auto verify the OTP {'\n'}             sent to {phone_number}
          <Icon name="edit" size={12} color="#4E46F1" onPress={() =>navigation.navigate('Login')}/>
          </Text>
          <TextInput style={styles.otpInput} letterSpacing={23} maxLength={6} numeric value={otp} onChangeText={setOtp} keyboardType="numeric"/>
          {next ? <Button uppercase={false} title="Verify" type="solid"  color="#4E46F1" style={styles.ContinueButton} onPress={() => {verifyOtp()}}><Text>Verify</Text></Button> : <Button title="Verify" uppercase={false} type="solid"  style={styles.ContinueButton} disabled/>}
         
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}
