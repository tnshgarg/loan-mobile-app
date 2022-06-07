import React ,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,SafeAreaView,TextInput} from 'react-native';
import { AppBar,IconButton,Icon, Button} from "@react-native-material/core";
import { useNavigation} from '@react-navigation/core';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import { styles,form,progressBar,Camera} from './styles';
import { useStateValue } from "../StateProvider";

export default PanCardInfo = () => {
    const navigation = useNavigation();
    const [pan,setPan]=useState("");
    const [next,setNext] = useState();
    const [{IDCapture},dispatch] = useStateValue();
    // const [panName, setPanName]=useState('');

    useEffect(() => {
      if(pan.length === 10){
        setNext(true);
      }
      else{
        setNext(false);
      }
    }, [pan]);

  return (
    <>
    <SafeAreaView >
    <AppBar
  title="Setup Profile"
  color="#4E46F1"
  leading={
    <IconButton icon={<Icon name="arrow-back" size={20} color="white"/>} onPress={()=>navigation.navigate('AadhaarConfirm')} />
  }
  />
   <View style={progressBar.progressView}>
    <ProgressBar
          styleAttr="Horizontal"
          style={progressBar.progressBar}
          indeterminate={false}
          progress={0.5}
        />
    <Text style={progressBar.progressNos} >2/4</Text>
    </View>
  <Text style={form.formHeader} >You are almost there, we just need to verify {'\n'}                       your Pan Card</Text>

  {pan? <Text style={form.formLabel} >Enter PAN Number</Text>:null}
  <TextInput style={form.formTextInput} value={pan} onChangeText={setPan}  placeholder="Enter PAN Number"/>
  <Text style={form.formLabel} >Scan PAN Front</Text>
  <IconButton icon={<Icon name="camera-alt" size={20} color="black"/>} style={Camera.cameraButton} onPress={()=>{navigation.navigate("IDCapture")}}/>
 {/* PAN OnGrid API based Dynamic Render */}
  {/* {panName ? <Text style={form.formLabel}>Name Registered with PAN</Text>:null}
  {
      resp["data"]["pan_data"]["name_match_status"] === "MATCH" ? 
      <TextInput style={form.formTextInput} value={panName} onChangeText={setPanName}  placeholder="Enter Name Registered with PAN"/> :
      null
  } */}

  {next ? <Button uppercase={false} title="Continue" type="solid"  color="#4E46F1" style={form.nextButton} onPress={()=>{navigation.navigate("PersonlInfoForm")}}><Text>Verify</Text></Button> : <Button title="Continue" uppercase={false} type="solid"  style={form.nextButton} disabled/>}  
    
  </SafeAreaView>
  </>
  )
}

