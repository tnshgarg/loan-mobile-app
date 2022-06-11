import React,{useEffect, useState} from 'react'
import { Text, View,ScrollView,TextInput, SafeAreaView} from 'react-native';
import { useStateValue } from "../StateProvider";
import { useNavigation} from '@react-navigation/core';
import {Picker} from '@react-native-picker/picker';
import { AppBar,IconButton,Icon, Button} from "@react-native-material/core";
import {ProgressBar} from '@react-native-community/progress-bar-android';
import { progressBar,form,bankform,styles} from './styles';

export default BankInformationForm = () => {
  const navigation = useNavigation();
  const [{fullName}] = useStateValue();
  const [bank,setBank] = useState("");
  const fields = ["Account Holder Name*","Bank Account Number*","IFSC Code*","UPI ID*"];
  const banks = ["HDFC Bank","ICICI Bank"]

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
      <View style={bankform.infoCard}><Text style={bankform.infoText}><Icon name="info-outline" size={20} color="#4E46F1"/>We will use this bank account / UPI ID to deposit your salary evey month, Please ensure the bank account belongs to you</Text></View>
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
        <Text style={bankform.formtitle} key={index}>{field}<Icon name="info-outline" size={20} color="grey"/></Text>
        <TextInput style={bankform.formInput}/>
        </>
      )
    }
    )}
    <Button title="Finish" type="solid" uppercase={false} style={bankform.nextButton} color="#4E46F1" onPress={()=>{navigation.navigate("Home")}}/>
    <View style={bankform.padding}></View>
    </ScrollView>
    </SafeAreaView>
    </>
  )
}
