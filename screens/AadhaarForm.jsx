import React ,{useState,useEffect} from 'react'
import {Text, View,SafeAreaView,TextInput,Image,ScrollView} from 'react-native';
import { AppBar,IconButton,Icon, Button} from "@react-native-material/core";
import { useNavigation} from '@react-navigation/core';
import CheckBox from '@react-native-community/checkbox';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import { progressBar, form ,checkBox,Camera,styles} from './styles';
import { useStateValue } from '../StateProvider';

export default AadhaarForm = () => {
    const navigation = useNavigation();
    const [consent, setConsent] = useState(false);
    const [aadhaar,setAadhaar]=useState("");
    const [next,setNext]=useState(false);
    const [{AadhaarFront,AadhaarBack},dispatch] = useStateValue();
    useEffect(() => {
      if(aadhaar.length === 12){
        setNext(true);
      }
      else{
        setNext(false);
      }
    }, [aadhaar]);

  return (
    <>
    <SafeAreaView style={styles.container}>
    <AppBar
    title="Setup Profile"
    color="#4E46F1"
    leading={
      <IconButton icon={<Icon name="arrow-back" size={20} color="white"/>} onPress={()=>navigation.navigate('Otp')} />
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
    <Text style={form.formLabel} >Aadhaar Front</Text>
    {AadhaarFront ? <Image source={{uri: `data:image/jpeg;base64,${AadhaarFront}`}} style={Camera.previewImage} /> : null}
    <IconButton icon={<Icon name="camera-alt" size={20} color="black"/>} style={Camera.cameraButton} onPress={()=>{navigation.navigate("IDCapture","AADHAAR_FRONT")}}/>
    <Text style={form.formLabel} >Aadhaar Back</Text>
    {AadhaarBack ? <Image source={{uri: `data:image/jpeg;base64,${AadhaarBack}`}} style={Camera.previewImage} /> : null}
    <IconButton icon={<Icon name="camera-alt" size={20} color="black"/>} style={Camera.cameraButton} onPress={()=>{navigation.navigate("IDCapture","AADHAAR_BACK")}}/>
    
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
    {next && consent ? <Button uppercase={false} title="Continue" type="solid"  color="#4E46F1" style={form.nextButton} onPress={()=>{navigation.navigate("AadhaarVerify")}}/> : <Button title="Continue" uppercase={false} type="solid"  style={form.nextButton} disabled/>}
    <View style={checkBox.padding}></View>
    </ScrollView>
    </SafeAreaView>
    </>
  )
}
