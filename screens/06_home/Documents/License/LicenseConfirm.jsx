import { useEffect } from "react";
import {
  SafeAreaView,
  ScrollView
} from "react-native";
import { useDispatch } from "react-redux";
import { styles } from "../../../../styles";

import Confirm from "../../../../apis/license/Confirm";
import { addCurrentScreen } from "../../../../store/slices/navigationSlice";

export default LicenseConfirm = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(addCurrentScreen("PanConfirm"));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Confirm />
      </ScrollView>
    </SafeAreaView>
  );
};
