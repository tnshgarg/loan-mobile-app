import React ,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,SafeAreaView,TextInput,Image,ScrollView} from 'react-native';
import { AppBar,IconButton,Icon, Button} from "@react-native-material/core";
import { useNavigation} from '@react-navigation/core';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import { styles,form,progressBar,Camera} from './styles';
import { useStateValue } from "../StateProvider";
import {CF_API_KEY} from '@env';

export default PanCardInfo = () => {
    const navigation = useNavigation();
    const [pan,setPan]=useState("");
    const [next,setNext] = useState();
    const [{PanFront},dispatch] = useStateValue();
    const [response,setResponse] = useState("");
    const [panName, setPanName]=useState('');

    useEffect(() => {
      if(pan.length === 10){
        setNext(true);
      }
      else{
        setNext(false);
      }
    }, [pan]);

    const data=
    {
      "pan_number": pan,
      "name": panName,
      "date_of_birth": "2001-10-23",
      "consent": "Y"
    };
    const VerifyPAN =() =>{
      const options = {
        method: 'POST',
        headers: {
          'X-Auth-Type': 'API-Key',
          'X-API-Key': CF_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      };
      
      fetch(`https://api.gridlines.io/pan-api/v2/verify`, options)
        .then(response => response.json())
        .then(response => {console.log(response);setResponse(response["data"]);})
        .catch(err => console.error(err));
        if(response["data"]["code"]=="1001"){
          navigation.navigate("PersonlInfoForm");
        }
    }
    
    const PanOCR =() =>{
      const base64data=
      {
        "consent": "Y",
        "base64_data": PanFront
      }
      const options = {
        method: 'POST',
        headers: {
          'X-Auth-Type': 'API-Key',
          'X-API-Key': CF_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(base64data)
      };
      
      fetch(`https://api.gridlines.io/pan-api/ocr`, options)
        .then(response => response.json())
        .then(response => {console.log(response["data"]["ocr_data"]["document"]);{response["data"]["ocr_data"] ? navigation.navigate("PersonlInfoForm"):alert(`PAN not Verified please retake Photo.`)}})
        .catch(err => console.error(err));
          
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

  <ScrollView>
  {pan?
  null:
  <>
  <Text style={form.formLabel} >Scan PAN Front</Text>
  {PanFront ? <Image source={{uri: `data:image/jpeg;base64,${PanFront}`}} style={Camera.previewImage} /> : null}
  <View style={{flexDirection:"row"}}>
  <IconButton icon={<Icon name="camera-alt" size={20} color="black"/>} style={Camera.cameraButton} onPress={()=>{navigation.navigate("IDCapture","PAN_FRONT")}}/>
  <IconButton icon={<Icon name="delete" size={20} color="black"/>} style={Camera.cameraButton} onPress={()=>{ 
      dispatch({
        type: "SET_ID",
        payload: {"data":null,"type":"PAN_FRONT"}
      })}}/>
  </View>
  {PanFront!=null ? <Button uppercase={false} title="Verify PAN" type="solid"  color="#4E46F1" style={form.nextButton} onPress={()=>{PanOCR()}}><Text>Verify</Text></Button> : <Button title="Verify PAN" uppercase={false} type="solid"  style={form.nextButton} disabled/>}
  </>
  }

  {!PanFront && !pan? <Text style={form.aadhaarOr}>-OR-</Text>:null}
  {PanFront ? 
   null:
   <>
    {pan? <Text style={form.formLabel} >Enter PAN Number</Text>:null}
  <TextInput style={form.formTextInput} value={pan} onChangeText={setPan}  placeholder="Enter PAN Number" required/>
  {panName ? <Text style={form.formLabel}>Name Registered with PAN</Text>:null}
  <TextInput style={form.formTextInput} value={panName} onChangeText={setPanName}  placeholder="Enter Name Registered with PAN" required/>
  {next ? <Button uppercase={false} title="Continue" type="solid"  color="#4E46F1" style={form.nextButton} onPress={()=>{VerifyPAN()}}><Text>Verify</Text></Button> : <Button title="Continue" uppercase={false} type="solid"  style={form.nextButton} disabled/>}   
  </>
  }
  
  </ScrollView>
  </SafeAreaView>
  </>
  )
}
