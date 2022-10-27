import { View, SafeAreaView, Text } from "react-native";
import { styles } from "../../styles";

const DocumentsView = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignSelf: "center", marginTop: "20%" }}>
        <Text style={{ fontSize: 20, alignSelf: "center" }}>
          More Details Coming Soon
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default DocumentsView;
