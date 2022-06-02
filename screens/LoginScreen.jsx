import React ,{useEffect, useState} from 'react'
import { Image, Text, View,SafeAreaView,TextInput} from 'react-native';
import { useNavigation} from '@react-navigation/core';
import { useStateValue } from "../StateProvider";
import DeviceInfo from 'react-native-device-info';
import { Button } from "@react-native-material/core";
import {styles} from "./styles";

import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';
import awsconfig from '../src/aws-exports';
Amplify.configure(awsconfig);

import SplashScreen from 'react-native-splash-screen'

export default LoginScreen = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [user, setUser] = useState(null);
  const [next, setNext] = useState(false);
  const [{conf},dispatch] = useStateValue();
  const [session,setSession] = useState(null); 
  const [confirm, setConfirm] = useState(null);
  const password = Math.random().toString(8) + 'Abc#';
  SplashScreen.hide();
  useEffect(() => {
    console.log('Ready to auth');
    // Auth.currentCredentials();
    setTimeout(verifyAuth, 1500);
  }, []);

  const verifyAuth = () => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setUser(user);
        console.log(user);
        setSession(null);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const signIn = () => {
    Auth.signIn(phoneNumber)
      .then((result) => {
        setSession(result);
        console.log(result);
        navigation.navigate("Otp");
      })
      .catch((e) => {
        if (e.code === 'UserNotFoundException') {
          signUp(); // Note that this is a new function to be created later
          console.log('User not found');
        } else if (e.code === 'UsernameExistsException') {
          signIn();
          console.log('User already exists');
        } else {
          console.log(e.code);
          console.error(e);
        }
      });
  };
  const signUp = async () => {
    const result = await Auth.signUp({
      username: phoneNumber,
      password,
      attributes: {
        phone_number: phoneNumber,
      },
    }).then(() => signIn()); // After signUp, we are going to signIn() 
    return result;
  };

  useEffect(() => {
    dispatch({
      type: "SET_SESSION",
      payload: session,
    })}, [session]);

  useEffect(() => {
    dispatch({
      type: "SET_PHONE",
      payload: phoneNumber,
    })}, [phoneNumber]);

  useEffect(() => {
    if(phoneNumber.length === 13){
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
            {next ? <Button uppercase={false} title="Continue" type="solid" style={styles.ContinueButton} color="#4E46F1" onPress={() => {signIn()}}/>: <Button uppercase={false} title="Continue" type="solid" style={styles.ContinueButton} disabled/>}
        </View>
    </SafeAreaView>
  )
}

