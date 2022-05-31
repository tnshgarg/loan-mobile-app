import React ,{useState} from 'react'
import { StyleSheet, Text, View,ScrollView,SafeAreaView,TextInput} from 'react-native';
import { Icon } from "@react-native-material/core";
import {Card, Title, Paragraph } from 'react-native-paper';
import {styles,homeCard,docSearch} from "./styles";
import FAB from 'react-native-fab'

export default HomeView = () => {
  return (
    <>
    <SafeAreaView style={styles.container}>
    <View style={docSearch.searchBar}>
        <Icon style={docSearch.searchIcon} name="search" size={30}/>
        <TextInput style={docSearch.searchInput} placeholder="Search"/>
    </View>
    <ScrollView>
    <View style={docSearch.searchBar}>
      <Card style={homeCard.card}>
          <Card.Content>
            <Title style={homeCard.title}>Payslip Nov</Title>
            <Paragraph style={homeCard.subtitle}>Updated on Nov 1 2022</Paragraph>
          </Card.Content>
          <Card.Actions>
          <Icon style={homeCard.downloadIcon} name="file-download" size={30}/> 
          <Text style={homeCard.downloadText}>Download</Text>
          </Card.Actions>
      </Card>

      <Card style={homeCard.card}>
          <Card.Content>
            <Title style={homeCard.title}>Payslip Nov</Title>
            <Paragraph style={homeCard.subtitle}>Updated on Nov 1 2022</Paragraph>
          </Card.Content>
          <Card.Actions>
          <Icon style={homeCard.downloadIcon} name="file-download" size={30}/> 
          <Text style={homeCard.downloadText}>Download</Text>
          </Card.Actions>
      </Card>
    </View>

    <View style={docSearch.searchBar}>
    <Card style={homeCard.card}>
          <Card.Content>
            <Title style={homeCard.title}>Payslip Nov</Title>
            <Paragraph style={homeCard.subtitle}>Updated on Nov 1 2022</Paragraph>
          </Card.Content>
          <Card.Actions>
          <Icon style={homeCard.downloadIcon} name="file-download" size={30}/> 
          <Text style={homeCard.downloadText}>Download</Text>
          </Card.Actions>
      </Card>

      <Card style={homeCard.card}>
          <Card.Content>
            <Title style={homeCard.title}>Payslip Nov</Title>
            <Paragraph style={homeCard.subtitle}>Updated on Nov 1 2022</Paragraph>
          </Card.Content>
          <Card.Actions>
          <Icon style={homeCard.downloadIcon} name="file-download" size={30}/> 
          <Text style={homeCard.downloadText}>Download</Text>
          </Card.Actions>
      </Card>
    </View>

    <View style={docSearch.searchBar}>
    <Card style={homeCard.card}>
          <Card.Content>
            <Title style={homeCard.title}>Payslip Nov</Title>
            <Paragraph style={homeCard.subtitle}>Updated on Nov 1 2022</Paragraph>
          </Card.Content>
          <Card.Actions>
          <Icon style={homeCard.downloadIcon} name="file-download" size={30}/> 
          <Text style={homeCard.downloadText}>Download</Text>
          </Card.Actions>
      </Card>

      <Card style={homeCard.card}>
          <Card.Content>
            <Title style={homeCard.title}>Payslip Nov</Title>
            <Paragraph style={homeCard.subtitle}>Updated on Nov 1 2022</Paragraph>
          </Card.Content>
          <Card.Actions>
          <Icon style={homeCard.downloadIcon} name="file-download" size={30}/> 
          <Text style={homeCard.downloadText}>Download</Text>
          </Card.Actions>
      </Card>
    </View>
    </ScrollView>  
    <View style={{zIndex:1}}><FAB buttonColor="#4E46F1" iconTextColor="#FFFFFF"  onClickAction={() => {console.log("FAB pressed")}} visible={true} iconTextComponent={<Icon name="add"/>} /></View>
    </SafeAreaView>
  </>
  )
}
