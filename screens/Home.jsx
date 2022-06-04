import React,{useEffect, useState} from 'react'
import { Image, Text, View,SafeAreaView,TextInput} from 'react-native';
import { useStateValue } from "../StateProvider";
import { useNavigation} from '@react-navigation/core';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeView from './HomeView';
import {styles,nav} from "./styles"
import { AppBar,IconButton,Icon, Button} from "@react-native-material/core";

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
        <IconButton
          icon={<Icon name="more-vert" size={30} />}
        />
    }
  />

    <bottomTab.Navigator
     screenOptions={({ route }) => ({
      headerShown: false ,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'home': 'home';
        } else if (route.name === 'Documents') {
          iconName = focused ? 'wysiwyg' : 'wysiwyg';
        }
        else if (route.name === 'Benefits') {
          iconName = focused ? 'request-quote' : 'request-quote';
        }
        else if (route.name === 'Banking') {
          iconName = focused ? 'money' : 'money';
        }
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#4E46F1',
      tabBarInactiveTintColor: '#4E4E4F',
    })}>
        <bottomTab.Screen name="Home" component={HomeView} />
        <bottomTab.Screen name="Documents" component={HomeView} />
        <bottomTab.Screen name="Benefits" component={HomeView} />
        <bottomTab.Screen name="Banking" component={HomeView} />
    </bottomTab.Navigator>
    </SafeAreaView>
    </>
  )
}
