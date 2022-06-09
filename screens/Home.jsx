import React,{useEffect, useState} from 'react'
import { Image, Text, View,SafeAreaView,TextInput} from 'react-native';
import { useStateValue } from "../StateProvider";
import { useNavigation} from '@react-navigation/core';
import HomeView from './HomeView';
import {styles,nav} from "./styles"
import { AppBar,IconButton,Icon, Button} from "@react-native-material/core";
import BottomTabNav from '../components/BottomTabNav';

export default Home = () => {
    const navigation = useNavigation();
    const [{user}] = useStateValue();
    const bottomTab = createBottomTabNavigator();
  return (
    <>
    <SafeAreaView style={styles.container}>
    <AppBar
    title={<Image style={nav.titleLogo} source={require("../assets/unipe-Thumbnail.png")}/>}
    centerTitle={true}
    contentContainerStyle={nav.navbar}
    color="#ffffff"
    leading={
      <IconButton icon={<Icon name="menu"  size={30}/>} 
      />
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
