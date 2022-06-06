import React ,{useState,useEffect} from 'react'
import {Text, View,SafeAreaView,TextInput} from 'react-native';
import { AppBar,IconButton,Icon, Button, Flex} from "@react-native-material/core";
import { useNavigation} from '@react-navigation/core';
import CheckBox from '@react-native-community/checkbox';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import { progressBar, form ,checkBox,Camera} from './styles';

export default AadhaarForm = () => {
    const navigation = useNavigation();
    const [consent, setConsent] = useState(false);
    const [aadhaar,setAadhaar]=useState("");
    const [next,setNext]=useState(false);
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
      <SafeAreaView >
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

    {aadhaar? <Text style={form.formLabel} >Enter 12 Digit Aadhaar Number</Text> : null}
    <View style={{flexDirection:"row"}}>
    <TextInput style={form.formTextInput} value={aadhaar} onChangeText={setAadhaar} placeholder="Enter 12 Digit Aadhaar Number"/>
    {consent ? <IconButton icon={<Icon name="camera-alt" size={20} color="black"/>} style={Camera.cameraButton} onPress={()=>{navigation.navigate("IDCapture")}}/> : <IconButton icon={<Icon name="camera-alt" size={20} color="grey"/>} style={Camera.cameraButton} onPress={()=>{navigation.navigate("IDCapture")}} disabled/>}
    </View>
    <View style={{flexDirection:"row"}}>
    <CheckBox
          value={consent}
          onValueChange={setConsent}
          style={checkBox.checkBox}
          tintColors={{true: '#4E46F1'}}
    />
    <Text style={checkBox.checkBoxText}>I agree KYC registration for the lorem ipsum {'\n'} & term & conditions to verifiy my identity</Text>
    </View>
    {next && consent ? <Button uppercase={false} title="Continue" type="solid"  color="#4E46F1" style={form.nextButton} onPress={()=>{navigation.navigate("AadhaarVerify")}}/> : <Button title="Continue" uppercase={false} type="solid"  style={form.nextButton} disabled/>}
    </SafeAreaView>
    </>
  )
}
