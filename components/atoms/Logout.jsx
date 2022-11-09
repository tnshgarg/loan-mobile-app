import { useNavigation } from "@react-navigation/core";
import { Pressable, Text } from "react-native";
import { AntDesign } from "react-native-vector-icons";
import { useDispatch } from "react-redux";
import { showToast } from "./Toast";

export default Logout = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        dispatch({type: "LOGOUT"});
        showToast("Logging out");
        setTimeout(() => {
          navigation.navigate("OnboardingStack", { screen: "Login" });
        }, 1000);
      }}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 20,
      }}
    >
      <AntDesign name="logout" color="black" size={16} />
      <Text style={{ fontSize: 16, paddingLeft: 10 }}>Logout</Text>
    </Pressable>
  );
};
