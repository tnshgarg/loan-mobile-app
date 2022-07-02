import React ,{useEffect, useState} from 'react'
import { Image, Text, ScrollView,SafeAreaView,TextInput, Linking, View,ActivityIndicator,TouchableOpacity,Alert} from 'react-native';
import { useNavigation} from '@react-navigation/core';
import { useStateValue } from "../StateProvider";
import { Button } from "@react-native-material/core";
import {styles} from "./styles";

import SmsRetriever from 'react-native-sms-retriever';
import {sendSmsVerification} from "../services/otp/Twilio/verify"
import {GenerateDocument} from "../helpers/GenerateDocument";
import { putMobileData } from '../services/employees/employeeServices';

export default LoginScreen = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('+91');
  const [next, setNext] = useState(false);
  const [{user},dispatch] = useStateValue();
  const [session,setSession] = useState(null); 
  const password = Math.random().toString(8) + 'Abc#';
  const [isLoading,setIsLoading]=useState(false);
  const [id,setId] = useState(null);

  const onPhoneNumberPressed = async () => {
    try {
      const phn = await SmsRetriever.requestPhoneNumber();
      console.log(phn);
      setPhoneNumber(phn);
    } catch (error) {
      console.log(JSON.stringify(error));
    }
   };

  // const signIn = () => {
  //   Auth.signIn(phoneNumber)
  //     .then((result) => {
  //       setSession(result);
  //       console.log(result);
  //       navigation.navigate("Otp");
  //     })
  //     .catch((e) => {
  //       if (e.code === 'UserNotFoundException') {
  //         signUp();
  //         console.log('User not found');
  //       } else if (e.code === 'UsernameExistsException') {
  //         signIn();
  //         console.log('User already exists');
  //       } else {
  //         console.log(e.code);
  //         console.error(e);
  //       }
  //     });
  // };
  // const signUp = async () => {
  //   const result = await Auth.signUp({
  //     username: phoneNumber,
  //     password,
  //     attributes: {
  //       phone_number: phoneNumber,
  //     },
  //   }).then(() => signIn());
  //   return result;
  // };
  // useEffect(() => {
  //   dispatch({
  //     type: "SET_SESSION",
  //     payload: session,
  //   })}, [session]);

  const signIn =() => {
    sendSmsVerification(phoneNumber)
    .then((sent) => {
      console.log("Sent!");
      setIsLoading(true);
      var phonePayload = GenerateDocument({"src":"otp","number":phoneNumber});
      putMobileData(phonePayload).then(res=>{
        console.log(phonePayload);
        console.log(res.data);
        if(res.data["message"]){
          Alert.alert("Error",res.data["message"]);
        }
        else{
          setId(res.data["id"]);
        }
      })
      .catch(err=>{
        console.log(err);
      })
      navigation.navigate("Otp");
    })
    .catch((err) => {
      console.log(err);
    });
  }
  
  useEffect(() => {
    dispatch({
      type: "SET_USERID",
      payload: id,
    })}, [id]);

  useEffect(() => {
    dispatch({
      type: "SET_PHONE",
      payload: phoneNumber,
    })}, [phoneNumber]);

  useEffect(() => {
    var phoneno = /^(\+91)? ?[0-9]{10}$/gm;
    if(phoneno.test(phoneNumber) && phoneNumber.length === 12 || phoneNumber.length === 13){
      setNext(true);
      console.log("true");
    }
    else{
      setNext(false);
      console.log("false");
    }
  }, [phoneNumber]);

  useEffect(() => {
      onPhoneNumberPressed();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView keyboardShouldPersistTaps='handled'>
            <Image style={styles.logo} source={require("../assets/unipe-Thumbnail.png")}/>
            <Text style={styles.headline}>Please enter your mobile number to login:</Text>
            <Text style={styles.fieldLabel}>Mobile Number</Text>
            <TextInput style={styles.textInput} value={phoneNumber} onChangeText={setPhoneNumber} autoCompleteType="tel" keyboardType="phone-pad" textContentType="telephoneNumber" maxLength={13} placeholder='XXXXXXXXXX'/>
            <Text style={styles.dataUseText}>This number will be used for all communication.         You shall receive an SMS with code for verification.        By continuing, you agree to our <Text onPress={() => Linking.openURL('https://policies.google.com/terms?hl=en-US')} style={styles.termsText}>Terms of Service</Text> &   <Text onPress={() => Linking.openURL('https://policies.google.com/privacy?hl=en-US')} style={styles.termsText}>Privacy Policy</Text></Text>
            {!isLoading ? <>{next ? <Button uppercase={false} title="Continue" type="solid" style={styles.ContinueButton} color="#4E46F1" onPress={()=>signIn()}/>: <Button uppercase={false} title="Continue" type="solid" style={styles.ContinueButton} disabled/>}</>
            :
            <TouchableOpacity>
            <View style={styles.LoadingButton}>
              <ActivityIndicator size="large" color="white" />
            </View>
            </TouchableOpacity>
            }
        </ScrollView>
    </SafeAreaView>
  )
}

