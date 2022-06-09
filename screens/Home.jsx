import React,{useEffect, useState} from 'react'
import { Image, Text, View,SafeAreaView,TextInput} from 'react-native';
import { useStateValue } from "../StateProvider";
import { useNavigation} from '@react-navigation/core';
import HomeView from './HomeView';
import {styles,nav} from "./styles"
import { AppBar,IconButton,Icon, Button} from "@react-native-material/core";
import BottomTabNav from '../components/BottomTabNav';

import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';
import awsconfig from '../src/aws-exports';
Amplify.configure(awsconfig);

export default Home = () => { 
  const [{user},dispatch] = useStateValue();
  const signOut = () => {
    if (user) {
      Auth.signOut();
      dispatch({
        type: "SET_USER",
        payload: null,
      })
      navigation.navigate('Login');
      console.log('signed out');
    } else {
      console.log('No user to sign out');
    }
  };
    const navigation = useNavigation();
    const bottomTab = createBottomTabNavigator();
    console.log("USER REGED");
    console.log(user);
  return (
    <>
    <SafeAreaView style={styles.container}>
    <AppBar
    title={<Image style={nav.titleLogo} source={require("../assets/unipe-Thumbnail.png")}/>}
    centerTitle={true}
    contentContainerStyle={nav.navbar}
    color="#ffffff"
    leading={
      <IconButton icon={<Icon name="menu"  size={30} />} onPress={() =>signOut()} /> 
    }
    trailing={
        <IconButton icon={<Icon name="more-vert" size={30} />}/>
    }
    />
    <BottomTabNav tabs={tabs}/>
    </SafeAreaView>
    </>
  )
}
