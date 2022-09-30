import { useNavigation } from "@react-navigation/core";
import { Text, TouchableOpacity, View } from "react-native";
import { card } from "../styles";

const MessageCard = (props) => {

  const navigation = useNavigation();
  
  return (
    <View style={card.alertCard}>
        <Text style={card.infoText}>
          {props.title}
          {"\n \n"}
        </Text>
        {props.message.map((item, index) =>
          item != null ? (
            <TouchableOpacity key={index} style={{borderRadius:10,width:"100%",borderWidth:0.5,marginTop:10}}>
              <Text
                style={card.alertText}
                onPress={() =>
                  navigation.navigate("KYC", {
                    screen: item,
                  })
                }
              >
                {item}
                {"\n"}
              </Text>
            </TouchableOpacity>
          ) : null
        )}
    </View>
  );
};

export default MessageCard;