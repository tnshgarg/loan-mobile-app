import React ,{useState} from 'react'
import { StyleSheet, Text, View,ScrollView,SafeAreaView,TextInput} from 'react-native';
import { Icon } from "@react-native-material/core";
import {styles,docSearch} from "./styles";
import DocumentTile from '../components/DocumentTile';

export default HomeView = () => {
  documents=[{"title":"Document 1","date":"2020-01-01"},{"title":"Document 2","date":"2020-01-01"},{"title":"Document 3","date":"2020-01-01"}]
  return (
    <>
    <SafeAreaView style={styles.container}>
    <View style={docSearch.searchBar}>
        <Icon style={docSearch.searchIcon} name="search" size={30}/>
        <TextInput style={docSearch.searchInput} placeholder="Search"/>
    </View>
    <ScrollView>
    <DocumentTile documents={documents}/>
    </ScrollView>  
    </SafeAreaView>
  </>
  )
}
