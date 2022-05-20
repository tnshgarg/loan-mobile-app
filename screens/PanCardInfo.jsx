import React ,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,SafeAreaView,TextInput} from 'react-native';
import { AppBar,IconButton,Icon, Button} from "@react-native-material/core";
import { useNavigation} from '@react-navigation/core';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import { styles,form,progressBar} from './styles';

const PanCardInfo = () => {
    const navigation = useNavigation();
    const [pan,setpan]=useState("");
    const [next,setNext] = useState();
    
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
    <IconButton icon={<Icon name="arrow-back" size={20} color="white"/>} onPress={()=>navigation.navigate('AadharConfirm')} />
  }
  />
   <View style={progressBar.progressView}>
    <ProgressBar
          styleAttr="Horizontal"
          style={progressBar.progressBar}
          indeterminate={false}
          progress={0.75}
        />
    <Text style={progressBar.progressNos} >3/4</Text>
    </View>
  <Text style={form.formHeader} >You are almost there, we just need to verify {'\n'}                       your Pan Card</Text>

  {pan? <Text style={form.formLabel} >Enter PAN Number</Text>:null}
  <TextInput style={form.formTextInput} value={pan} onChangeText={setpan}  placeholder="Enter PAN Number"/>
  {next ? <Button uppercase={false} title="Continue" type="solid"  color="#4E46F1" style={form.nextButton} onPress={()=>{navigation.navigate("BankInfoForm")}}><Text>Verify</Text></Button> : <Button title="Continue" uppercase={false} type="solid"  style={form.nextButton} disabled/>}  
    
  </SafeAreaView>
  </>
  )
}

export default PanCardInfo