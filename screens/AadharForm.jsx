import React ,{useState,useEffect} from 'react'
import {Text, View,SafeAreaView,TextInput} from 'react-native';
import { AppBar,IconButton,Icon, Button, Flex} from "@react-native-material/core";
import { useNavigation} from '@react-navigation/core';
import CheckBox from '@react-native-community/checkbox';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import { progressBar, form ,checkBox} from './styles';

const AadharForm = () => {
    const navigation = useNavigation();
    const [consent, setConsent] = useState(false);
    const [aadhar,setaadhar]=useState("");
    const [next,setNext]=useState(false);
    useEffect(() => {
      if(aadhar.length === 12){
        setNext(true);
      }
      else{
        setNext(false);
      }
    }, [aadhar]);

  return (
    <>
      <SafeAreaView >
      <AppBar
    title="Setup Profile"
    color="#4E46F1"
    leading={
      <IconButton icon={<Icon name="arrow-back" size={20} color="white"/>} onPress={()=>navigation.navigate('PersonlInfoForm')} />
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
    <Text style={form.formHeader} >Let's begin with your background verification {'\n'}                   processs with eKYC</Text>

    {aadhar? <Text style={form.formLabel} >Enter 12 Digit Aadhar Number</Text> : null}
    <TextInput style={form.formTextInput} value={aadhar} onChangeText={setaadhar} placeholder="Enter 12 Digit Aadhar Number"/>
    <View style={{flexDirection:"row"}}>
    <CheckBox
          value={consent}
          onValueChange={setConsent}
          style={checkBox.checkBox}
          tintColors={{true: '#4E46F1'}}
    />
    <Text style={checkBox.checkBoxText}>I agree KYC registration for the lorem ipsum {'\n'} & term & conditions to verifiy my identity</Text>
    </View>
    {next && isSelected ? <Button uppercase={false} title="Continue" type="solid"  color="#4E46F1" style={form.nextButton} onPress={()=>{navigation.navigate("AadharVerify")}}><Text>Verify</Text></Button> : <Button title="Continue" uppercase={false} type="solid"  style={form.nextButton} disabled/>}
    
    </SafeAreaView>
    </>
  )
}

export default AadharForm;