import React from 'react'
import {Text, View, SafeAreaView,Image} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import {styles,progressBar,form} from './styles';
import {AppBar, IconButton, Icon, Button} from "@react-native-material/core";

export default PersonalImage = () => {
    const navigation = useNavigation();

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
                  progress={0.75}
                />
            <Text style={progressBar.progressNos} >3/4</Text>
        </View>
      <Button title="Finish" type="solid"  uppercase={false} style={form.nextButton} color="#4E46F1" onPress={()=>{navigation.navigate("Home")}}/>
      </SafeAreaView>
   
    </>
  )
}