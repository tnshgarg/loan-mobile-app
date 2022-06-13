import React ,{useState,useEffect} from 'react'
import {Text, View,SafeAreaView,TextInput,Image,ScrollView} from 'react-native';
import { AppBar,IconButton,Icon, Button} from "@react-native-material/core";
import { useNavigation} from '@react-navigation/core';
import CheckBox from '@react-native-community/checkbox';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import { progressBar, form ,checkBox,Camera,styles} from './styles';
import { useStateValue } from '../StateProvider';
import {CF_API_KEY, CF_API_PATH} from '@env';

export default AadhaarForm = () => {
    const navigation = useNavigation();
    const [consent, setConsent] = useState(false);
    const [aadhaar,setAadhaar]=useState("");
    const [next,setNext]=useState(false);
    const [transactionId,setTransactionId]=useState("");
    const [{AadhaarFront,AadhaarBack},dispatch] = useStateValue();
    const [frontaadhaarData,setFrontAadhaarData] = useState({});
    const [backaadhaarData,setBackAadhaarData] = useState({});

    useEffect(()=>{
      dispatch({
        type: "SET_AADHAAR_TRANSACTION_ID",
        payload: transactionId
      })
    },[transactionId]);

    useEffect(()=>{
      dispatch({
        type: "SET_AADHAAR_OCR_DATA",
        payload: {"data":frontaadhaarData,"type":"AADHAAR_FRONT"}
      })
    },[frontaadhaarData]);

    useEffect(()=>{
      dispatch({
        type: "SET_AADHAAR_OCR_DATA",
        payload: {"data":backaadhaarData,"type":"AADHAAR_BACK"}
      })
    },[backaadhaarData]);

    useEffect(() => {
      if(aadhaar.length === 12){
        setNext(true);
      }
      else{
        setNext(false);
      }
    }, [aadhaar]);
  
  const data = 
  {
      "aadhaar_number": aadhaar,
      "consent": "Y"
  };
  
  const GenerateOtp =() =>{
    const options = {
      method: 'POST',
      headers: {
        'X-Auth-Type': 'API-Key',
        'X-API-Key': CF_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    };
    
    fetch(`${CF_API_PATH}/aadhaar-api/boson/generate-otp`, options)
      .then(response => response.json())
      .then(response => {console.log(response);setTransactionId(response["data"]["transaction_id"]);navigation.navigate('AadhaarVerify');})
      .catch(err => console.error(err));
        
  }


  const AadhaarOCR =(type) =>{
    const base64data=
    {
      "consent": "Y",
      "base64_data": type==="front"?AadhaarFront:AadhaarBack
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
    
    fetch(`${CF_API_PATH}/aadhaar-api/ocr`, options)
      .then(response => response.json())
      .then(response => {console.log(response["data"]["ocr_data"]["document"]);alert(`Verfied Aadhaar ${type==="front"?"Front":"Back"}`);{type==="front" ? setFrontAadhaarData(response["data"]["ocr_data"]["document"]):setBackAadhaarData(response["data"]["ocr_data"]["document"])};})
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
          progress={0.25}
        />
    <Text style={progressBar.progressNos} >1/4</Text>
    </View>
    <Text style={form.formHeader} >Let's begin with your background verification {'\n'}                   processs with eKYC</Text>
    <ScrollView>
    {aadhaar? 
    null
    :
    <>
    <Text style={form.formLabel} >Aadhaar Front</Text>
    {AadhaarFront ? <Image source={{uri: `data:image/jpeg;base64,${AadhaarFront}`}} style={Camera.previewImage} /> : null}
    <View style={{flexDirection:"row"}}>
    <IconButton icon={<Icon name="camera-alt" size={20} color="black"/>} style={Camera.cameraButton} onPress={()=>{navigation.navigate("IDCapture","AADHAAR_FRONT")}}/>
    <IconButton icon={<Icon name="delete" size={20} color="black"/>} style={Camera.cameraButton} onPress={()=>{ 
      dispatch({
        type: "SET_ID",
        payload: {"data":null,"type":"AADHAAR_FRONT"}
      })}}/>
    </View>
    {AadhaarFront!=null ? <Button uppercase={false} title="Verify Front" type="solid"  color="#4E46F1" style={form.nextButton} onPress={()=>{AadhaarOCR("front")}}/>: <Button title="Verify Front" uppercase={false} type="solid"  style={form.nextButton} disabled/>}
    
    <Text style={form.formLabel} >Aadhaar Back</Text>
    {AadhaarBack ? <Image source={{uri: `data:image/jpeg;base64,${AadhaarBack}`}} style={Camera.previewImage} /> : null}
    <View style={{flexDirection:"row"}}>
    <IconButton icon={<Icon name="camera-alt" size={20} color="black"/>} style={Camera.cameraButton} onPress={()=>{navigation.navigate("IDCapture","AADHAAR_BACK")}}/>
    <IconButton icon={<Icon name="delete" size={20} color="black"/>} style={Camera.cameraButton} onPress={()=>{ 
      dispatch({
        type: "SET_ID",
        payload: {"data":null,"type":"AADHAAR_BACK"}
      })}}/>
    </View>
    {AadhaarBack!=null ? <Button uppercase={false} title="Verify Back" type="solid"  color="#4E46F1" style={form.nextButton} onPress={()=>{AadhaarOCR()}}/> : <Button title="Verify Back" uppercase={false} type="solid"  style={form.nextButton} disabled/>}
    </>
    }
    {!AadhaarFront && !AadhaarBack && !aadhaar? <Text style={form.aadhaarOr}>-OR-</Text>:null}
    {AadhaarFront || AadhaarBack ? 
        <>
        <View style={{flexDirection:"row"}}>
        <CheckBox
              value={consent}
              onValueChange={setConsent}
              style={checkBox.checkBox}
              tintColors={{true: '#4E46F1'}}
        />
        <Text style={checkBox.checkBoxText}>I agree with the KYC registration Terms {'\n'} and Conditions to verifiy my identity.</Text>
        </View>
        {consent ? <Button uppercase={false} title="Continue" type="solid"  color="#4E46F1" style={form.nextButton} onPress={()=>{navigation.navigate("PanCardInfo")}}/> : <Button title="Continue" uppercase={false} type="solid"  style={form.nextButton} disabled/>}
        </>
        :
        <>
        {aadhaar? <Text style={form.formLabel} >Enter 12 Digit Aadhaar Number</Text> : null}
        <TextInput style={form.formTextInput} value={aadhaar} onChangeText={setAadhaar} placeholder="Enter 12 Digit Aadhaar Number"/>
       
        <View style={{flexDirection:"row"}}>
        <CheckBox
              value={consent}
              onValueChange={setConsent}
              style={checkBox.checkBox}
              tintColors={{true: '#4E46F1'}}
        />
        <Text style={checkBox.checkBoxText}>I agree with the KYC registration Terms {'\n'} and Conditions to verifiy my identity.</Text>
        </View>
        {next && consent ? <Button uppercase={false} title="Continue" type="solid"  color="#4E46F1" style={form.nextButton} onPress={()=>{GenerateOtp()}}/> : <Button title="Continue" uppercase={false} type="solid"  style={form.nextButton} disabled/>}
        </>
  
      }
    
    
    <View style={checkBox.padding}></View>
    </ScrollView>
    </SafeAreaView>
    </>
  )
}
