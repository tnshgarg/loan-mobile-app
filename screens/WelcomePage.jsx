import React from 'react'
import {Text, View, SafeAreaView,Image} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {AppBar, IconButton, Icon, Button} from "@react-native-material/core";
import {styles,welcome,form} from './styles';

import SplashScreen from 'react-native-splash-screen'

export default WelcomePage = () => {
    const navigation = useNavigation();
    SplashScreen.hide();
    const data=[
        "Mobile Number Verification",
        "Aadhar Card Verification",
        "PAN Card Verification",
        "Bank Details ( Account Number & UPI ID Verification)",
        "Employee basic details",
        "Upload Passport size photo or capture selfie photo"
        ]

  return (
    <>
      <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require("../assets/unipe-Thumbnail.png")}/>
      <Text style={welcome.mainTitle}>Hello,</Text>
      <Text style={welcome.subTitle}>Let’s verify the below documents & start the onboarding process.</Text>
      {data.map((datai,index)=>{
      return(
        <Text style={welcome.title} key={index}><Text>{'\u2B24'}</Text>  {datai}</Text>
      )
    })}
            <Button style={form.nextButton} title="Welcome! Let’s start onboarding process with Unipe" uppercase={false} onPress={()=>{navigation.navigate("Login")}}></Button>
      </SafeAreaView>
   
    </>
  )
}