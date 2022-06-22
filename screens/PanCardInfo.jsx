import React ,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,SafeAreaView,TextInput,Image,ScrollView, Alert,Linking} from 'react-native';
import { AppBar,IconButton,Icon, Button} from "@react-native-material/core";
import { useNavigation} from '@react-navigation/core';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import { styles,form,progressBar,Camera, checkBox,bankform} from './styles';
import { useStateValue } from "../StateProvider";
import {CF_API_KEY} from '@env';

export default PanCardInfo = () => {
    const navigation = useNavigation();
    const [pan,setPan]=useState("");
    const [next,setNext] = useState();
    const [{PanFront},dispatch] = useStateValue();
    const [panName, setPanName]=useState('');
    const [birthday,setBirthday]=useState('');

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
      "date_of_birth": birthday,
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
        .then(response => 
          {console.log(response);
            {if(response["status"]=="200") {
              switch(response["data"]["code"]){
                case "1001" : 
                  navigation.navigate("BankInfoForm")
                  Alert.alert("Pan Number Verification status",`PAN number ${pan} verified!`)
                  break;
                
                case "1002" :
                  response["data"]["pan_data"]["name_match_status"]=="NO_MATCH" ? Alert.alert("Pan Number Verification status",`Partial details matched, Please Check Name.`): Alert.alert("Pan Number Verification status",`Partial details matched, Please Check DOB.`)
                  break;

                case "1004":
                  Alert.alert("Pan Number Verification status",`PAN number incorrect.`)
                  break;
            
            }}
            else{
              Alert.alert("Error",response["error"]["message"])
            }
          }
          })
            .catch(err => Alert.alert("Error",err));
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
        .then(response => 
          {console.log(response["data"]["ocr_data"]);
          {if(response["status"]=="200"){
            switch(response["data"]["code"]){
              case "1009":
                navigation.navigate("BankInfoForm");
                Alert.alert("Pan Number Verification status",`PAN verified through OCR`);
                break;

              case "1010":
                Alert.alert("Error",response["data"]["message"])
                break;
          }}
          else{
            Alert.alert("Error",response["error"]["message"]);
          }
        };})
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
  <Text style={form.formHeader} >PAN Verification</Text>

  <ScrollView keyboardShouldPersistTaps='handled'>
  {/* {pan?
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
  {PanFront!=null ? <Button uppercase={false} title="Verify PAN" type="solid"  color="#4E46F1" style={form.nextButton} onPress={()=>{PanOCR()}}/> : <Button title="Verify PAN" uppercase={false} type="solid"  style={form.nextButton} disabled/>}
  </>
  } */}

  {/* {!PanFront && !pan? <Text style={form.aadhaarOr}>-OR-</Text>:null} */}
  <View style={checkBox.padding}/>
  {PanFront ? 
   null:
   <>
  <Text style={form.formLabel} >Enter PAN Number</Text>
  <TextInput style={form.formTextInput} autoCapitalize="characters" value={pan} onChangeText={setPan}  placeholder="Enter PAN Number" required/>
  <View style={form.forgotText}><Text style={styles.termsText} onPress={() => Linking.openURL('https://docs.google.com/document/d/19nf3qwzXcun0yTN6WH6iA5hpGKlgsg4erbHuDql0EZQ/edit')}>Forgot PAN?</Text></View>
  <Text style={form.formLabel}>Name as per PAN Card</Text>
  <TextInput style={form.formTextInput} autoCapitalize="words" value={panName} onChangeText={setPanName}  placeholder="Enter Name Registered with PAN" required/>
  <Text style={form.formLabel}>Date of birth as recorded in PAN</Text>
  <TextInput style={form.formTextInput} value={birthday} onChangeText={setBirthday}  placeholder="YYYY-MM-DD" required/>
  <View style={bankform.infoCard}><Text style={bankform.infoText}><Icon name="info-outline" size={20} color="#4E46F1"/>PAN is needed to verify your name and date of birth</Text></View>
  {next ? <Button uppercase={false} title="Continue" type="solid"  color="#4E46F1" style={form.nextButton} onPress={()=>{VerifyPAN()}}/> : <Button title="Continue" uppercase={false} type="solid"  style={form.nextButton} disabled/>}   
  </>
  }
  <View style={checkBox.padding}/>
  </ScrollView>
  </SafeAreaView>
  </>
  )
}
