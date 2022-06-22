import React ,{useEffect, useState} from 'react'
import { Image, Text, View,SafeAreaView,TextInput, ScrollView, Alert} from 'react-native';
import { Button,Icon,IconButton} from "@react-native-material/core";
import { useNavigation} from '@react-navigation/core';
import { useStateValue } from "../StateProvider";
import { styles } from './styles';

import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';
import awsconfig from '../src/aws-exports';
Amplify.configure(awsconfig);

import RNOtpVerify from 'react-native-otp-verify';
import CountDown from 'react-native-countdown-component';

export default OTPScreen = () => {
  const navigation = useNavigation();
  const [{phone_number,session},dispatch] = useStateValue();
  const [otp, setOtp] = useState('');
  const [next, setNext] = useState(false);
  const [user, setUser] = useState(null);
  const [back,setBack] = useState(false);

  // getHash = () =>
  //   RNOtpVerify.getHash()
  //   .then(console.log)
  //   .catch(console.log);

  // startListeningForOtp = () =>
  //     RNOtpVerify.getOtp()
  //     .then(p => RNOtpVerify.addListener(this.otpHandler))
  //     .catch(p => console.log(p));

  // otpHandler = (message) => {
  //     const otp = /(\d{6})/g.exec(message)[1];
  //     setOtp(otp);
  // }


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
        if(err = "[NotAuthorizedException: Incorrect username or password.]"){
          Alert.alert("Error","Entered verification code is incorrect, please check the verification code & enter it again.");
        }
      });
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps='handled'> 
      <View style={styles.container}>
        <View style={styles.otpback}>
      {back ? <IconButton icon={<Icon name="arrow-back" size={30} color="#4E46F1"/>} onPress={()=>navigation.goBack()} /> : <IconButton icon={<Icon name="arrow-back" size={30} color="#808080"/>} onPress={()=>Alert.alert("OTP Timer","You must wait for 30 seconds to resend otp")} />}
      </View>
      <Image style={styles.logo} source={require("../assets/unipe-Thumbnail.png")}/>
          <Text style={styles.headline} >   Please wait, we will auto verify the OTP {'\n'}             sent to {phone_number}
          {back ? <Icon name="edit" size={12} color="#4E46F1" onPress={() =>navigation.goBack()}/>:<Icon name="edit" size={12} color="#808080" onPress={()=>Alert.alert("OTP Timer","You must wait for 30 seconds to edit number")}/>}
          </Text>
          <TextInput style={styles.otpInput} letterSpacing={23} maxLength={6} numeric value={otp} onChangeText={setOtp} keyboardType="numeric"/>
          <CountDown
          until={30}
          onFinish={() => {setBack(true)}}
          size={20}
          style={{marginTop:20}}
          digitStyle={{backgroundColor: '#FFF'}}
          digitTxtStyle={{color: '#4E46F1'}}
          timeToShow={['M', 'S']}
          timeLabels={{m: 'MM', s: 'SS'}}
          />
          <Text style={styles.otpreadtxt}> Sit back & relax while we fetch the OTP & log {'\n'}                you inside the Unipe App</Text>
          {next ? <Button uppercase={false} title="Verify" type="solid"  color="#4E46F1" style={styles.ContinueButton} onPress={() => {verifyOtp()}}><Text>Verify</Text></Button> : <Button title="Verify" uppercase={false} type="solid"  style={styles.ContinueButton} disabled/>}
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}
