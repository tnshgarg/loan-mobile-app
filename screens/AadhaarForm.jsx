import React ,{useState,useEffect} from 'react'
import {Text, View,SafeAreaView,TextInput,Image,ScrollView,Alert} from 'react-native';
import { AppBar,IconButton,Icon, Button} from "@react-native-material/core";
import { useNavigation} from '@react-navigation/core';
import CheckBox from '@react-native-community/checkbox';
import {form ,checkBox,Camera,styles,bankform} from './styles';
import { useStateValue } from '../StateProvider';
import {CF_API_KEY} from '@env';
import ProgressBarTop from '../components/ProgressBarTop';
import { GenerateDocument } from '../helpers/GenerateDocument';
import { putAadhaarData } from '../services/employees/employeeServices';

export default AadhaarForm = () => {
    const [consent, setConsent] = useState(false);
    const [aadhaar,setAadhaar]=useState("");
    const navigation = useNavigation();
    const [next,setNext]=useState(false);
    const [transactionId,setTransactionId]=useState("");
    const [{AadhaarFront,AadhaarBack,id},dispatch] = useStateValue();
    const [frontaadhaarData,setFrontAadhaarData] = useState({});
    const [backaadhaarData,setBackAadhaarData] = useState({});
    const [aadhaarFrontVerified,setAadhaarFrontVerified]=useState(false);
    const [aadhaarBackVerified,setAadhaarBackVerified]=useState(false);
    const [aadhaarLinked,setAadhaarLinked] = useState(true);
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
        type: "SET_AADHAAR",
        payload: aadhaar
      })
    },[aadhaar]);

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

const AadharPush = () => {
  var aadhaarPayload= GenerateDocument({"src":"AadhaarOCR","id":id ,"frontaadhaarData":frontaadhaarData,"backaadhaarData":backaadhaarData});
  putAadhaarData(aadhaarPayload).then(res=>{
    console.log(aadhaarPayload);
    console.log(res.data);
    Alert.alert("Message",res.data["message"]);
  })
  .catch(err=>{
    console.log(err);
  })
}

    
const GenerateOtp =() =>{
    const data = 
    {
        "aadhaar_number": aadhaar,
        "consent": "Y"
    };
    const options = {
      method: 'POST',
      headers: {
        'X-Auth-Type': 'API-Key',
        'X-API-Key': CF_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    };

    fetch(`https://api.gridlines.io/aadhaar-api/boson/generate-otp`, options)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        {if(response["status"]=="200"){
          switch(response["data"]["code"]){
          case "1001":
           setTransactionId(response["data"]["transaction_id"]);
           navigation.navigate('AadhaarVerify');
           break;

          case "1011":
          case "1008":
            setAadhaarLinked(false);
            break;
            
          case "1012":
            Alert.alert("Error",response["data"]["message"]);
            break;

        }}
        else{
          Alert.alert("Error",response["error"]["message"]);
        }
      };
        })
      .catch(err => Alert.alert("Error",err))
        
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
    
    fetch(`https://api.gridlines.io/aadhaar-api/ocr`, options)
      .then(response => response.json())
      .then(response => {console.log(response["data"]);{ response["data"]["ocr_data"] ?  <> {type==="front"?setAadhaarFrontVerified(true):setAadhaarBackVerified(true)}
      {dispatch({
        type: "SET_AADHAAR_VERIFED_STATUS",
        payload: "OCR_VERIFIED"
      })}</>: null};{type==="front" ? setFrontAadhaarData(response["data"]["ocr_data"]["document"]):setBackAadhaarData(response["data"]["ocr_data"]["document"])};})
      .catch(err => console.error(err));
  }

  const VerifyAadharOCR=()=>{
    AadhaarOCR("front");
    AadhaarOCR();
    !aadhaarBackVerified ? alert(`The Image captured is not verified please capture the image again for Aadhaar Back to get it verified.`):null;
    !aadhaarFrontVerified ? alert(`The Image captured is not verified please capture the image again for Aadhaar Front to get it verified.`):null;
    aadhaarBackVerified && aadhaarFrontVerified ? 
    <>
      {alert("Aadhar Verified through OCR.")}
      {navigation.navigate("PanCardInfo")}
      {AadharPush()}
      {}
    </> :null;
  }
  const backAlert = () =>
    Alert.alert(
      "Heading Back?",
      "If you continue to go back your OTP authentication would be invalid and you would have to redo it!",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "OK", onPress: () => navigation.goBack() }
      ]
    );

  return (
    <>
    <SafeAreaView style={styles.container}>
    <AppBar
    title="Setup Profile"
    color="#4E46F1"
    leading={
      <IconButton icon={<Icon name="arrow-back" size={20} color="white"/>} onPress={()=>{backAlert()}} />
    }
    />
    <ProgressBarTop step={1}/>
    <Text style={form.formHeader} >Let's begin with your background verification {'\n'}                   processs with eKYC</Text>
    <ScrollView keyboardShouldPersistTaps='handled'>
    {aadhaarLinked? 
      <>
      {aadhaar? <Text style={form.formLabel} >Enter 12 Digit Aadhaar Number</Text> : null}
      <TextInput style={form.formTextInput} value={aadhaar} onChangeText={setAadhaar} placeholder="Enter 12 Digit Aadhaar Number" maxLength={12} numeric/>
      <View style={bankform.infoCard}><Text style={bankform.infoText}><Icon name="info-outline" size={20} color="#4E46F1"/>My Mobile number is linked to my Aadhar card & I can receive the OTP on my Aadhar Linked Mobile Number</Text></View>
      <View style={{flexDirection:"row"}}>
      <CheckBox
            value={consent}
            onValueChange={setConsent}
            style={checkBox.checkBox}
            tintColors={{true: '#4E46F1'}}
      />
      <Text style={checkBox.checkBoxText}>I agree with the KYC registration Terms {'\n'} and Conditions to verifiy my identity.</Text>
      </View>
      <Button style={form.AadharLinkedStatus} onPress={()=>{setAadhaarLinked(false)}} uppercase={false} title="My Mobile number is not linked to my Aadhar card"/>
      {next && consent ? <Button uppercase={false} title="Continue" type="solid"  color="#4E46F1" style={form.nextButton} onPress={()=>{GenerateOtp()}}/> : <Button title="Continue" uppercase={false} type="solid"  style={form.nextButton} disabled/>}
      </>
    :
    <>
    <Text style={form.formLabel} >Upload Aadhar Front Photo</Text>
    {AadhaarFront ? <Image source={{uri: `data:image/jpeg;base64,${AadhaarFront}`}} style={Camera.previewImage} /> : null}
    <View style={{flexDirection:"row"}}>
    <IconButton icon={<Icon name="camera-alt" size={20} color="black"/>} style={Camera.cameraButton} onPress={()=>{navigation.navigate("IDCapture","AADHAAR_FRONT")}}/>
    <IconButton icon={<Icon name="delete" size={20} color="black"/>} style={Camera.cameraButton} onPress={()=>{ 
      dispatch({
        type: "SET_ID",
        payload: {"data":null,"type":"AADHAAR_FRONT"}
      })}}/>
    </View>
    <Text style={form.formLabel} >Upload Aadhar Back Photo</Text>
    {AadhaarBack ? <Image source={{uri: `data:image/jpeg;base64,${AadhaarBack}`}} style={Camera.previewImage} /> : null}
    <View style={{flexDirection:"row"}}>
    <IconButton icon={<Icon name="camera-alt" size={20} color="black"/>} style={Camera.cameraButton} onPress={()=>{navigation.navigate("IDCapture","AADHAAR_BACK")}}/>
    <IconButton icon={<Icon name="delete" size={20} color="black"/>} style={Camera.cameraButton} onPress={()=>{ 
      dispatch({
        type: "SET_ID",
        payload: {"data":null,"type":"AADHAAR_BACK"}
      })}}/>
    </View>
        <View style={{flexDirection:"row"}}>
        <CheckBox
              value={consent}
              onValueChange={setConsent}
              style={checkBox.checkBox}
              tintColors={{true: '#4E46F1'}}
        />
        <Text style={checkBox.checkBoxText}>I agree with the KYC registration Terms and Conditions to verifiy my identity.</Text>
        </View>
        <Button style={form.AadharLinkedStatus} onPress={()=>{setAadhaarLinked(true)}} uppercase={false} title="My Mobile number is linked to my Aadhar card."/>
        {AadhaarFront && AadhaarBack && consent ? <Button uppercase={false} title="Continue" type="solid"  color="#4E46F1" style={form.nextButton} onPress={()=>{VerifyAadharOCR()}}/> : <Button title="Continue" uppercase={false} type="solid"  style={form.nextButton} disabled/>}
    </>
    }
    <View style={checkBox.padding}></View>
    </ScrollView>
    </SafeAreaView>
    </>
  )
}
