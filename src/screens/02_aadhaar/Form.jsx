import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { BackHandler, SafeAreaView } from "react-native";
import { useDispatch } from "react-redux";

import BottomAlert from "../../components/molecules/BottomAlert";
import LogoHeaderBack from "../../components/molecules/LogoHeaderBack";
import { navigationHelper } from "../../helpers/CmsNavigationHelper";
import { strings } from "../../helpers/Localization";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { styles } from "../../styles";
import AadhaarFormTemplate from "../../templates/aadhaar/Form";

const AadhaarForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    dispatch(addCurrentScreen("AadhaarForm"));
  }, []);

  const backAction = () => {
    setAlertVisible(true);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const [alertVisible, setAlertVisible] = useState(false);

  const alertData = {
    title: "Wait! KYC is in progress",
    subtitle: "To get advance salary you must complete your KYC",

    imageUri:
      "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Help/Aadhaar/step3.png",
    primaryBtnText: "Continue KYC",
    onPressPrimaryBtn: () => {
      setAlertVisible(false);
    },
    secondaryBtnText: "I will do it later",
    infoText: "",
    contentContainerStyle: { flexDirection: "column-reverse" },
    onPressSecondaryBtn: () => {
      setAlertVisible(false);
      navigation.navigate("HomeStack");
    },
  };

  return (
    <SafeAreaView style={styles.safeContainer} accessibilityLabel="AadhaarForm">
      <LogoHeaderBack
        headline={strings.aadhaarVerification}
        subHeadline={
          "भारतीय रिजर्व बैंक के मानदंडों के अनुसार, आपको अपना आधार वेरीफाई करना अनिवार्य है।"
        }
        onLeftIconPress={backAction}
        onRightIconPress={() =>
          navigationHelper({
            type: "cms",
            params: { blogKey: "aadhaar_help" },
          })
        }
      />

      {alertVisible && (
        <BottomAlert
          visible={alertVisible}
          setVisible={setAlertVisible}
          data={alertData}
        />
      )}

      <AadhaarFormTemplate setHelpSectionVisible={setVisible} />
    </SafeAreaView>
  );
};

export default AadhaarForm;
