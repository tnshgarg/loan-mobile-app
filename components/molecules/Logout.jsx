import { useNavigation } from "@react-navigation/core";
import { Pressable, Text } from "react-native";
import { AntDesign } from "react-native-vector-icons";
import { useDispatch } from "react-redux";
import { resetAadhaar } from "../../store/slices/aadhaarSlice";
import { resetAuth } from "../../store/slices/authSlice";
import { resetBank } from "../../store/slices/bankSlice";
import { resetESIC } from "../../store/slices/esicSlice";
import { resetNavigation } from "../../store/slices/navigationSlice";
import { resetPan } from "../../store/slices/panSlice";
import { resetProfile } from "../../store/slices/profileSlice";
import { resetLicense } from "../../store/slices/licenseSlice";
import { resetTimer } from "../../store/slices/timerSlice";
import { COLORS, FONTS } from "../../constants/Theme";
import { showToast } from "../atoms/Toast";

export default Logout = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        dispatch(resetAuth());
        dispatch(resetNavigation());
        dispatch(resetProfile());
        dispatch(resetPan());
        dispatch(resetAadhaar());
        dispatch(resetESIC());
        dispatch(resetBank());
        dispatch(resetLicense());
        dispatch(resetTimer());
        showToast("Logging out");
        setTimeout(() => {
          navigation.navigate("OnboardingStack", { screen: "Login" });
        }, 2000);
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
