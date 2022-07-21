import React from "react";
import { Text, View } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import { Icon } from "@react-native-material/core";
import { homeCard, docSearch } from "../styles";

export default DocumentTile = (props) => {
  return (
    <View style={docSearch.searchBar}>
      {props.documents.map((doc, index) => {
        return (
          <Card style={homeCard.card}>
            <Card.Content>
              <Title style={homeCard.title}>{doc.title}</Title>
              <Paragraph style={homeCard.subtitle}>
                Updated on {doc.date}
              </Paragraph>
            </Card.Content>
            <Card.Actions>
              <Icon
                style={homeCard.downloadIcon}
                name="file-download"
                size={30}
              />
              <Text style={homeCard.downloadText}>Download</Text>
            </Card.Actions>
          </Card>
        );
      })}
    </View>
  );
};
