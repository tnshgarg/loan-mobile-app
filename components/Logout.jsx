import { resetAadhaar } from "../store/slices/aadhaarSlice";
import { resetAuth } from "../store/slices/authSlice";
import { resetProfile } from "../store/slices/profileSlice";
import { resetBank } from "../store/slices/bankSlice";
import { resetESIC } from "../store/slices/esicSlice";
import { resetNavigation } from "../store/slices/navigationSlice";
import { resetPan } from "../store/slices/panSlice";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { IconButton, Icon } from "@react-native-material/core";

export default Logout = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <IconButton
      icon={<Icon name="menu" size={30} color="black" />}
      onPress={() => {
        dispatch(resetAadhaar(),resetAuth(),resetProfile(),resetBank(),resetESIC(),resetNavigation(),resetPan());
        navigation.navigate("Welcome");
      }}
    />
  );
};
