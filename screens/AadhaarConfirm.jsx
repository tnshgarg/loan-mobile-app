import React from 'react'
import { Image, Text, View,SafeAreaView,TextInput, KeyboardAvoidingView} from 'react-native';
import { AppBar,IconButton,Icon, Button} from "@react-native-material/core";
import { useNavigation} from '@react-navigation/core';
import { useStateValue } from "../StateProvider";
import {ProgressBar} from '@react-native-community/progress-bar-android';
import { form,progressBar, styles} from './styles';

export default AadhaarConfirm = () => {
    const navigation = useNavigation();
    const [{AadhaarData},dispatch] = useStateValue();

  return (
    <SafeAreaView style={styles.container}>
    <AppBar
    title="Setup Profile"
    color="#4E46F1"
    leading={
      <IconButton icon={<Icon name="arrow-back" size={20} color="white"/>} onPress={()=>navigation.navigate('AadhaarVerify')} />
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
      <View style={styles.container}>
        {console.log(AadhaarData)}
          <Text style={form.OtpAwaitMsg} >Please confirm if these are your details</Text>
          <Text style={form.OtpAwaitMsg}><Icon name="check-circle-outline" size={30} color="green"/>Aadhaar Verified Successfully</Text>
          <Image source={{uri: `data:image/jpeg;base64,${AadhaarData["aadhaar_data"]["photo_base64"]}`}} style={form.aadharimg} />
          {console.log(AadhaarData["aadhaar_data"])}
          <Text style={form.OtpAwaitMsg}>Name: {AadhaarData["aadhaar_data"]["name"]}</Text>
          <Text style={form.userData}>Date of Birth: {AadhaarData["aadhaar_data"]["date_of_birth"]}</Text>
          <Text style={form.userData}>Locality: {AadhaarData["aadhaar_data"]["locality"]}</Text>
          <View style={{flexDirection:"row"}}>
            <Button title="No" type="solid" uppercase={false}  style={form.noButton} color="#EB5757"  onPress={()=>{navigation.navigate("AadhaarForm")}}/>
            <Button title="Yes" type="solid" uppercase={false}  style={form.yesButton} color="#4E46F1" onPress={()=>{navigation.navigate("PanCardInfo")}}/>
          </View>
      </View>
    </SafeAreaView>
  )
}

