import React,{useEffect, useState,useRef} from 'react'
import {Text, View,SafeAreaView,TextInput} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useStateValue } from "../StateProvider";
import { useNavigation} from '@react-navigation/core';
import { AppBar,IconButton,Icon, Button} from "@react-native-material/core";
import {ProgressBar} from '@react-native-community/progress-bar-android';
import { form,progressBar} from './styles';

export default PesonalDetailsForm = () => {
  const navigation = useNavigation();
  const [{user},dispatch] = useStateValue();
  const [male,setMale] = useState(false);
  const [female,setFemale] = useState(false);
  const [married,setMarried] = useState(false);
  const [unmarried,setUnmarried] =useState(false);
  const [users,setUsers]=useState("");
  const [selectedValue,setSelectedValue] = useState("");
  useEffect(() => {
    if(male){
      setFemale(false);
    }
  }, [male]);

  useEffect(() => {
    if(female){
      setMale(false);
    }
  }, [female]);


  useEffect(() => {
    if(married){
      setUnmarried(false);
    }
  }, [married]);

  useEffect(() => {
    if(unmarried){
      setMarried(false);
    }
  }, [unmarried]);

  useEffect(() => {
    dispatch({
      type: "SET_USER",
      payload: users,
    })}, [users]);
  

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
    {users ? <Text style={form.formLabel}>Full Name</Text>:null}
    <TextInput style={form.formTextInput} value={users} onChangeText={setUsers}  placeholder="Full Name"/>
    <Text style={form.formLabel}>Gender</Text>
    <View style={{flexDirection:'row'}}>
    {male ? <Button uppercase={false} style={form.chosenButton} title="Male" type="solid" color="#4E46F1" onPress={() => {setMale(false)}}>Male</Button> : <Button uppercase={false} style={form.choiceButton} type="solid" title="Male" onPress={() => {setMale(true)}}>Male</Button>}
    {female ? <Button uppercase={false} style={form.chosenButton} title="Female" type="solid" color="#4E46F1" onPress={() => {setFemale(false)}}>Female</Button> : <Button uppercase={false} style={form.choiceButton} type="solid" title="Female" onPress={() => {setFemale(true)}}>Female</Button>}
    </View>
    <Text style={form.formLabel}>Select Education</Text>
      <Picker
        selectedValue={selectedValue}
        style={form.picker}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Educational Qualification"/>
        <Picker.Item label="10th Pass" value="10th pass"/>
        <Picker.Item label="12th Pass" value="12th pass"/>
        <Picker.Item label="Graduate"  value="Graduate"/>
        <Picker.Item label="Diploma" value="Diploma"/>
        <Picker.Item label="Post-Graduate" value="Post-Graduate"/>
        <Picker.Item label="None of the Above" value="None of the Above"/>
      </Picker>
    <Text style={form.formLabel} >Marital Status</Text>
    <View style={{flexDirection:'row'}}>
    {married ? <Button  style={form.chosenButton}  uppercase={false} title="Married" type="solid" color="#4E46F1" onPress={() => {setMarried(false)}}>Married</Button> : <Button uppercase={false} style={form.choiceButton}  type="solid" title="Married" onPress={() => {setMarried(true)}}>Married</Button>}
    {unmarried ? <Button style={form.chosenButton}  uppercase={false} title="Unmarried" type="solid" color="#4E46F1" onPress={() => {setUnmarried(false)}}>Unmarried</Button> : <Button uppercase={false} style={form.choiceButton}  type="solid" title="Unmarried" onPress={() => {setUnmarried(true)}}>Unmarried</Button>}
    </View>
    <Button title="Continue" type="solid"  uppercase={false} style={form.nextButton} color="#4E46F1" onPress={()=>{navigation.navigate("AadharForm")}}/>
    </SafeAreaView>
    </>
  )
}