import { Icon } from "@react-native-material/core";
import React from "react";
import { SafeAreaView, ScrollView, TextInput, View } from "react-native";
import DocumentTile from "../../components/DocumentTile";
import { docSearch, styles } from "../../styles";

const DocumentsView = () => {
  const documents = [
    { title: "Document 1", date: "2020-01-01" },
    { title: "Document 2", date: "2020-01-01" },
    { title: "Document 3", date: "2020-01-01" },
  ];
  return (
    <>
      <SafeAreaView style={[styles.container, { padding: 0 }]}>
        <View style={docSearch.searchBar}>
          <Icon style={docSearch.searchIcon} name="search" size={30} />
          <TextInput style={docSearch.searchInput} placeholder="Search" />
        </View>
        <ScrollView>
          <DocumentTile documents={documents} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default DocumentsView;
