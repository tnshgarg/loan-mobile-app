import React,{useEffect, useState} from 'react'
import { Text, View,ScrollView,TextInput, SafeAreaView} from 'react-native';
import { useStateValue } from "../StateProvider";
import { useNavigation} from '@react-navigation/core';
import {Picker} from '@react-native-picker/picker';
import { AppBar,IconButton,Icon, Button} from "@react-native-material/core";
import {ProgressBar} from '@react-native-community/progress-bar-android';
import { progressBar,form,bankform,styles} from './styles';
import {CF_API_KEY} from '@env';

export default BankInformationForm = () => {
  const navigation = useNavigation();
  const [bank,setBank] = useState("");
  const [ifsc,setIfsc] = useState("");
  const [accountNumber,setAccountNumber] = useState("");
  const [accountHolderName,setAccountHolderName] = useState("");
  const [upiID,setUpiId] = useState("");
  const [respCode,setRespCode] = useState("");
  
  const fields = [{"title":"Account Holder Name*","value":accountHolderName,"setvalue":setAccountHolderName},{"title":"Bank Account Number*","value":accountNumber,"setvalue":setAccountNumber}
  ,{"title":"IFSC Code*","value":ifsc,"setvalue":setIfsc},{"title":"UPI ID*","value":upiID,"setvalue":setUpiId}];

  const banks = ["HDFC Bank","ICICI Bank"];

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
      .then(response => {console.log(response);setRespCode(response["data"]["code"]);navigation.navigate("Home");})
      .catch(err => console.error(err));
      if (respCode) {
        respCode!="1000" ? alert("Invalid Account Number or IFSC Code") :null;
      }
      
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
    <ScrollView>
      <View style={bankform.infoCard}><Text style={bankform.infoText}><Icon name="info-outline" size={20} color="#4E46F1"/>We will use this bank account / UPI ID to deposit your salary every month, Please ensure the bank account belongs to you</Text></View>
    <Text style={form.formLabel} >Bank Name</Text>
      <Picker
        selectedValue={bank}
        style={form.picker}
        onValueChange={(itemValue) => setBank(itemValue)}
      >
        {banks.map((bank,index)=>{
          return <Picker.Item label={bank} value={bank} key={index}/>
        }
        )}
      </Picker>
      
    {fields.map((field,index)=>{
      return(
        <>
        <Text style={bankform.formtitle} key={index}>{field.title}<Icon name="info-outline" size={20} color="grey"/></Text>
        <TextInput style={bankform.formInput}  value={field.value} onChangeText={field.setvalue}/>
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
