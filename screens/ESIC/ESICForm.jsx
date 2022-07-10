import React ,{useEffect, useState} from 'react'
import {Text, ScrollView,SafeAreaView,TextInput, View,Alert} from 'react-native';
import { useNavigation} from '@react-navigation/core';
import { useStateValue } from "../../StateProvider"
import { AppBar,IconButton,Icon, Button} from "@react-native-material/core";
import {styles,form} from "../styles";

export default ESICForm = () => {
    const navigation = useNavigation();
    const [{user}, dispatch] = useStateValue();
    const [esic, setEsic] =useState("");
    const fields = [{"title":"Do you have ESIC number?","value":esic,"setValue":setEsic}];
  return (
    <SafeAreaView style={styles.container}>
       <AppBar
    title="ESIC Information"
    color="#4E46F1"
    leading={
      <IconButton icon={<Icon name="arrow-back" size={20} color="white"/>} onPress={()=>{navigation.goBack()}} />
    }
    />
        <ScrollView keyboardShouldPersistTaps='handled'>
        {fields.map((field,index)=>{
            return(
                <View key={index}>
                    <Text style={form.formLabel} maxLength={17}>{field.title}</Text>
                    <TextInput style={form.formTextInput} onChangeText={field.setValue} value={field.value}/>
                </View>
            )
        })}
         <Button style={form.AadharLinkedStatus} uppercase={false} title="Click here if you do not have ESIC"/>
         <Button style={form.AadharLinkedStatus} uppercase={false} title="Click here if you forgot your ESIC"/>
         <Button uppercase={false} title="Continue" type="solid"  color="#4E46F1" style={form.nextButton} onPress={()=>{VerifyAadharOCR()}}/>
        </ScrollView>
    </SafeAreaView>
  )
}

