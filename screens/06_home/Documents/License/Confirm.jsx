import { useEffect } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { useDispatch } from "react-redux";
import { styles, bankform } from "../../../../styles";

import Confirm from "../../../../apis/license/Confirm";
import { addCurrentScreen } from "../../../../store/slices/navigationSlice";

export default LicenseConfirm = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addCurrentScreen("LicenseConfirm"));
  }, []);

  return (
    <SafeAreaView style={[styles.container, { padding: 0 }]}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Confirm />
        <View style={bankform.padding}></View>
      </ScrollView>
    </SafeAreaView>
  );
};
