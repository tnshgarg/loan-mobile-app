import { useNavigation } from "@react-navigation/core";
import { Pressable, Text } from "react-native";
import { AntDesign } from "react-native-vector-icons";
import { useDispatch } from "react-redux";
import { COLORS, FONTS } from "../../constants/Theme";
import { showToast } from "../atoms/Toast";
import { persistor } from "../../store/store";

export default Logout = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <Pressable
      onPress={() => {
        showToast("Logging out");
        dispatch({ type: "LOGOUT" });
        // persistor.purge().then(() =>  );
      }}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 20,
      }}
    >
      <AntDesign name="logout" color={COLORS.warning} size={16} />
      <Text style={{ ...FONTS.h4, paddingLeft: 10, color: COLORS.warning }}>
        Logout
      </Text>
    </Pressable>
  );
};
