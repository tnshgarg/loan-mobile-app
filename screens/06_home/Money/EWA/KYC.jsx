import { AppBar, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import { SafeAreaView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import PrimaryButton from "../../../../components/PrimaryButton";
import { styles } from "../../../../styles";

const KYC = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <AppBar
        title="KYC"
        color="#4E46F1"
        leading={
          <IconButton
            icon={<Icon name="arrow-left" size={20} color="white" />}
            onPress={() => {
              navigation.goBack();
            }}
          />
        }
      />
      <PrimaryButton
        title="My Details are Correct"
        uppercase={false}
        onPress={() => {
          navigation.navigate("EWAMandate");
        }}
      />
    </SafeAreaView>
  );
};

export default KYC;
