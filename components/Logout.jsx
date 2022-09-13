import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Pressable, Text } from "react-native";
import { AntDesign } from "react-native-vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { resetAadhaar } from "../store/slices/aadhaarSlice";
import { resetAuth } from "../store/slices/authSlice";
import { resetBank } from "../store/slices/bankSlice";
import { resetESIC } from "../store/slices/esicSlice";
import { resetNavigation } from "../store/slices/navigationSlice";
import { resetPan } from "../store/slices/panSlice";
import { resetProfile } from "../store/slices/profileSlice";
import { resetTimer } from "../store/slices/timerSlice";

export default Logout = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  // console.log(store);
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
        dispatch(resetTimer());
        
        navigation.navigate("Welcome");
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
