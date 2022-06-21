import React,{useEffect, useState} from 'react'
import { Text, View,ScrollView,TextInput, SafeAreaView,Alert} from 'react-native';
import { useNavigation} from '@react-navigation/core';
import { AppBar,IconButton,Icon, Button} from "@react-native-material/core";
import {ProgressBar} from '@react-native-community/progress-bar-android';
import { progressBar,form,bankform,styles} from './styles';
import {CF_API_KEY} from '@env';

export default BankInformationForm = () => {
  const navigation = useNavigation();
  const [ifsc,setIfsc] = useState("");
  const [accountNumber,setAccountNumber] = useState("");
  const [accountHolderName,setAccountHolderName] = useState("");
  const [upiID,setUpiId] = useState("");
  
  const fields = [{"title":"Account Holder Name*","value":accountHolderName,"setvalue":setAccountHolderName,"requiredStatus":true},{"title":"Bank Account Number*","value":accountNumber,"setvalue":setAccountNumber,"requiredStatus":true}
  ,{"title":"IFSC Code*","value":ifsc,"setvalue":setIfsc,"requiredStatus":true},{"title":"UPI ID*","value":upiID,"setvalue":setUpiId,"requiredStatus":false}];

  const data=
  {
    "account_number": accountNumber,
    "ifsc": ifsc,
    "consent": "Y"
  };

  const VerifyBankAccount =() =>{
    const options = {
      method: 'POST',
      headers: {
        'X-Auth-Type': 'API-Key',
        'X-API-Key': CF_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    };
    try{
    fetch(`https://api.gridlines.io/bank-api/verify`, options)
      .then(response => response.json())
      .then(response => {
        console.log(response)
        {if(response["status"]=="200"){
          switch(response["data"]["code"]){
            case "1000":
              navigation.navigate("PersonlInfoForm");
              break;
            default:
              Alert.alert("Error",response["data"]["message"]);
              break;
        }}
        else{
          Alert.alert("Error",response["error"]["message"]);
        } 
      };})
      .catch(err => Alert.alert("Error",err));
      
    }
    catch(err){
      console.log(err);
    }

  }

  return (
    <>
    <SafeAreaView style={styles.container}>
     <AppBar
    title="Setup Profile"
    color="#4E46F1"
    leading={
      <IconButton icon={<Icon name="arrow-back" size={20} color="white"/>} onPress={()=>navigation.navigate("PersonlInfoForm")} />
    }
    />
    <View style={progressBar.progressView}>
    <ProgressBar
          styleAttr="Horizontal"
          style={progressBar.progressBar}
          indeterminate={false}
          progress={1}
        />
    <Text style={progressBar.progressNos} >4/4</Text>
    </View>
    <Text style={form.formHeader} >Final step - we need your primary bank details</Text>
    <ScrollView keyboardShouldPersistTaps='handled'>
      <View style={bankform.infoCard}><Text style={bankform.infoText}><Icon name="info-outline" size={20} color="#4E46F1"/>We will use this bank account / UPI ID to deposit your salary every month, Please ensure the bank account belongs to you</Text></View>
    {fields.map((field,index)=>{
      return(
        <>
        <Text style={bankform.formtitle} key={index}>{field.title}<Icon name="info-outline" size={20} color="grey"/></Text>
         {field.requiredStatus ? <TextInput style={bankform.formInput}  value={field.value} onChangeText={field.setvalue} required/> :  <TextInput style={bankform.formInput}  value={field.value} onChangeText={field.setvalue}/>}
        </>
      )
    }
    )}
    <Button title="Finish" type="solid" uppercase={false} style={bankform.nextButton} color="#4E46F1" onPress={()=>{VerifyBankAccount()}}/>
    <View style={bankform.padding}></View>
    </ScrollView>
    </SafeAreaView>
    </>
  )
}
