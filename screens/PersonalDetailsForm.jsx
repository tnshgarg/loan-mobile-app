import React,{useEffect, useState,useRef} from 'react'
import {Text, View,SafeAreaView,TextInput} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useStateValue } from "../StateProvider";
import { useNavigation} from '@react-navigation/core';
import { AppBar,IconButton,Icon, Button} from "@react-native-material/core";
import {ProgressBar} from '@react-native-community/progress-bar-android';
import { form,progressBar, styles} from './styles';

export default PesonalDetailsForm = () => {
  const navigation = useNavigation();
  const [{user},dispatch] = useStateValue();
  const [gender,setGender] = useState('');
  const [maritalStatus,setMaritalStatus] = useState('');
  const [fullName,setFullName]=useState("");
  const [educationalQualification,setEducationallQualification] = useState("");
  const Educational_Qualification=[ "10th Pass", "12th Pass", "Graduate", "Post Graduate","None of the Above"];
  const genders=["Male","Female"];
  const maritalStatuslist=["Unmarried","Married"];

  useEffect(() => {
    dispatch({
      type: "SET_FULL_NAME",
      payload: fullName,
    })}, [fullName]);
  

  return (
    <>
    <SafeAreaView>
    <AppBar
    title="Setup Profile"
    color="#4E46F1"
    leading={
      <IconButton icon={<Icon name="arrow-back" size={20} color="white"/>} onPress={()=>navigation.navigate("Otp")} />
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
    
    <Text style={form.formHeader}>Welcome Let's Start your onboarding process</Text>
    {fullName ? <Text style={form.formLabel}>Full Name</Text>:null}
    <TextInput style={form.formTextInput} value={fullName} onChangeText={setFullName}  placeholder="Full Name"/>
    <Text style={form.formLabel}>Gender</Text>
    <View style={styles.flexrow}>
    {genders.map((item,index)=>{
      return(
        <Button key={index} uppercase={false} style={gender==item ? form.chosenButton :form.choiceButton} title={item} type="solid" color="#4E46F1" onPress={()=>setGender(item)}/>
      )
    })}
    </View>
    <Text style={form.formLabel}>Select Education</Text>
      <Picker
        selectedValue={educationalQualification}
        style={form.picker}
        onValueChange={(itemValue) => setEducationallQualification(itemValue)}
        prompt="Educational Qualification"
      >
        {Educational_Qualification.map((item,index) => {
          return(<Picker.Item label={item} value={item}/>)
        })}
        
      </Picker>
    <Text style={form.formLabel} >Marital Status</Text>
    <View style={styles.flexrow}>
    {maritalStatuslist.map((item,index)=>{
      return(
        <Button key={index} uppercase={false} style={maritalStatus==item ? form.chosenButton : form.choiceButton} title={item} type="solid" color="#4E46F1" onPress={()=>setMaritalStatus(item)}/>
      )
    })}
    </View>
    <Button title="Continue" type="solid"  uppercase={false} style={form.nextButton} color="#4E46F1" onPress={()=>{navigation.navigate("AadhaarForm")}}/>
    </SafeAreaView>
    </>
  )
}