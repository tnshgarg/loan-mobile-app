import React ,{useEffect, useState} from 'react'
import { Image, Text, View,SafeAreaView,TextInput, ScrollView} from 'react-native';
import { AppBar,IconButton,Icon, Button} from "@react-native-material/core";
import { useNavigation} from '@react-navigation/core';
import { useStateValue } from "../StateProvider";
import {ProgressBar} from '@react-native-community/progress-bar-android';
import { styles,progressBar, form } from './styles';
import {CF_API_KEY} from '@env';
import CountDown from 'react-native-countdown-component';

export default AadhaarVerify = () => {
    const navigation = useNavigation();
    const [{AadhaarTransactionId},dispatch] = useStateValue();
    const [otp, setOtp] = useState('');
    const [next, setNext] = useState(false);
    const [aadharData,setAadharData] = useState({});
    const [back,setBack] = useState(false);

    useEffect(()=>{
      dispatch({
        type: "SET_AADHAAR_DATA",
        payload: aadharData
      })
    },[aadharData]);

    const data = {
      "otp": otp,
      "include_xml": false,
      "share_code": 1234,
      "transaction_id": AadhaarTransactionId,
    }

    async function confirmVerificationCode() {
      const options = {
        method: 'POST',
        headers: {
          'X-Auth-Type': 'API-Key',
          'X-API-Key': CF_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      };
        
        fetch(`https://api.gridlines.io/aadhaar-api/boson/submit-otp`, options)
          .then(response => response.json())
          .then(response => {console.log(response);setAadharData(response["data"]);navigation.navigate('AadhaarConfirm'); 
          {dispatch({
            type: "SET_AADHAAR_VERIFED_STATUS",
            payload: "OTP_VERIFIED"
          })};})
          .catch(err => console.error(err));
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
    <SafeAreaView style={styles.container}>
          <AppBar
    title="Setup Profile"
    color="#4E46F1"
    leading={
      <IconButton icon={<Icon name="arrow-back" size={20} color="white"/>} onPress={()=>navigation.goBack()} />
    }
    />
     <View style={progressBar.progressView}>
    <ProgressBar
          styleAttr="Horizontal"
          style={progressBar.progressBar}
          indeterminate={false}
          progress={0.25}
        />
    <Text style={progressBar.progressNos} >1/4</Text>
    </View>
    <ScrollView keyboardShouldPersistTaps='handled'>
      <View style={styles.container}>
          <Text style={form.OtpAwaitMsg} >OTP has been sent vis SMS to your Aadhaar {'\n'}          registered mobile number</Text>
          <TextInput style={styles.otpInput} letterSpacing={23} maxLength={6} numeric value={otp} onChangeText={setOtp} keyboardType="numeric"/>
          <CountDown
          until={60*10}
          onFinish={() => setBack(true)}
          size={20}
          style={{marginTop:20}}
          digitStyle={{backgroundColor: '#FFF'}}
          digitTxtStyle={{color: '#4E46F1'}}
          timeToShow={['M', 'S']}
          timeLabels={{m: 'MM', s: 'SS'}}
          />
          
          {next ? <Button uppercase={false} title="Continue" type="solid"  color="#4E46F1" style={form.nextButton} onPress={() => {confirmVerificationCode()}}/> : <Button title="Continue" uppercase={false} type="solid" style={form.nextButton} disabled/>}
      </View>
    </ScrollView>
    </SafeAreaView>
  )
}
