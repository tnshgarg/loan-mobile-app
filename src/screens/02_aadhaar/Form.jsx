import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Alert, BackHandler, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/core";

import { addCurrentScreen } from "../../store/slices/navigationSlice";
import AadhaarFormTemplate from "../../templates/aadhaar/Form";
import { styles } from "../../styles";
import Header from "../../components/atoms/Header";
import LogoHeader from "../../components/atoms/LogoHeader";
import LogoHeaderBack from "../../components/molecules/LogoHeaderBack";
import HelpSection from "../../components/organisms/HelpSection";
import { navigationHelper } from "../../helpers/CmsNavigationHelper";

const AadhaarForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    dispatch(addCurrentScreen("AadhaarForm"));
  }, []);

  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      { text: "No", onPress: () => null, style: "cancel" },
      { text: "Yes", onPress: () => navigation.navigate("ProfileForm") },
    ]);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer} accessibilityLabel="AadhaarForm">
      <LogoHeaderBack
        headline={"Aadhaar Verification"}
        subHeadline={
          "भारतीय रिजर्व बैंक के मानदंडों के अनुसार, आपको अपना आधार वेरीफाई करना अनिवार्य है।"
        }
        onLeftIconPress={backAction}
        onRightIconPress={() =>
          navigationHelper({
            type: "cms",
            params: { blogKey: "AadhaarHelp" },
          })
        }
      />

      <AadhaarFormTemplate setHelpSectionVisible={setVisible} />
    </SafeAreaView>
  );
};

export default AadhaarForm;
