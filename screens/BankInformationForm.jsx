import React,{useEffect, useState} from 'react'
import { Text, View,ScrollView,TextInput, SafeAreaView,Alert,Linking} from 'react-native';
import { useNavigation} from '@react-navigation/core';
import { AppBar,IconButton,Icon, Button} from "@react-native-material/core";
import { progressBar,form,bankform,styles} from './styles';
import {CF_API_KEY} from '@env';
import { useStateValue } from "../StateProvider";
import { Popable } from 'react-native-popable';
import ProgressBarTop from '../components/ProgressBarTop';
import {GenerateDocument} from '../helpers/GenerateDocument';
import { putBankAccountData } from '../services/employees/employeeServices';

export default BankInformationForm = () => {
  const navigation = useNavigation();
  const [ifsc,setIfsc] = useState("");
  const [{id},dispatch] = useStateValue();
  const [accountNumber,setAccountNumber] = useState("");
  const [accountHolderName,setAccountHolderName] = useState("");
  const [upiID,setUpiId] = useState("");
  
  const fields = [
  {"title":"Account Holder Name*","value":accountHolderName,"setvalue":setAccountHolderName,"requiredStatus":true,"tooltip":"Refer to your Bank Passbook or Cheque book for the exact Name mentioned in your bank records"},
  {"title":"Bank Account Number*","value":accountNumber,"setvalue":setAccountNumber,"requiredStatus":true,"tooltip":"Refer to your Bank Passbook or Cheque book to get the Bank Account Number."}
  ,{"title":"IFSC Code*","value":ifsc,"setvalue":setIfsc,"requiredStatus":true,"tooltip":"You can find the IFSC code on the cheque book or bank passbook that is provided by the bank"},
  {"title":"UPI ID","value":upiID,"setvalue":setUpiId,"requiredStatus":false,"tooltip":"There are lots of UPI apps available like Phonepe, Amazon Pay, Paytm, Bhim, Mobikwik etc. from where you can fetch your UPI ID."}];

  const BankPush = () => {
    var bankPayload= GenerateDocument({"src":"Bank","type":"front","id":id,"ifsc":ifsc,"accountNumber":accountNumber,"upi":upiID});
    putBankAccountData(bankPayload).then(res=>{
      console.log(bankPayload);
      console.log(res.data);
      Alert.alert("Message",res.data["message"]);
    })
    .catch(err=>{
      console.log(err);
    })
  }
    // putBankAccountData()
  const VerifyBankAccount =() =>{
    const data=
    {
      "account_number": accountNumber,
      "ifsc": ifsc,
      "consent": "Y"
    };
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
              BankPush();
              Alert.alert("Your Bank Account Information",
            `Name: ${response["data"]["bank_account_data"]["name"]}\nBank Name: ${response["data"]["bank_account_data"]["bank_name"]}\nUTR no.: ${response["data"]["bank_account_data"]["utr"]}\nBranch: ${response["data"]["bank_account_data"]["branch"]}\nCity: ${response["data"]["bank_account_data"]["city"]}`,
            [
              {
                text: "Yes",
                onPress: () => navigation.navigate("PersonlInfoForm"),
              },
              { text: "No", 
                onPress: () => Alert.alert("Information Validation", "Please provide the correct bank account number and IFSC Code."),
                style: "cancel"
              }
            ])
              break;
            default:
              Alert.alert("Error",response["data"]["message"]);
              break;
        }}
        else{
          Alert.alert("Error",response["error"]["metadata"]["fields"].map((item,value)=>
          item["message"]).join('\n'));
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
      <IconButton icon={<Icon name="arrow-back" size={20} color="white"/>} onPress={()=>navigation.goBack()} />
    }
    />
    <ProgressBarTop step={3}/>
    <Text style={bankform.Maintitle} >Bank Details Verification</Text>

    <ScrollView keyboardShouldPersistTaps='handled'>
      <View style={bankform.infoCard}><Text style={bankform.infoText}><Icon name="info-outline" size={20} color="#4E46F1"/>We will use this bank account / UPI ID to deposit your salary every month, Please ensure the bank account belongs to you.{'\n'}We will also deposit INR 1 to your account for verification make sure you enter the correct account details.</Text></View>
    <Text style={bankform.subTitle} >Enter your Bank Details</Text>
    {fields.map((field,index)=>{
      return(
        <>
        <Text style={bankform.formtitle} key={index}>{field.title}  <Popable content={field.tooltip} position="right" caret={false}><Icon name="info-outline" size={20} color="grey" /></Popable></Text>
        {field.title === "IFSC Code*" ? <TextInput style={bankform.formInput}  value={field.value} onChangeText={field.setvalue} autoCapitalize="characters" required/> : <TextInput style={bankform.formInput}  value={field.value} onChangeText={field.setvalue} required/>}
        </>
      )
    }
    )}
    <Button title="Continue" type="solid" uppercase={false} style={bankform.nextButton} color="#4E46F1" onPress={()=>{VerifyBankAccount()}}/>
    <View style={bankform.padding}></View>
    </ScrollView>
    </SafeAreaView>
    </>
  )
}
