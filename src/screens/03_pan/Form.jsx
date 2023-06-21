import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Alert, BackHandler, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import LogoHeaderBack from "../../components/molecules/LogoHeaderBack";
import { navigationHelper } from "../../helpers/CmsNavigationHelper";
import { useGetKycQuery } from "../../store/apiSlices/kycApi";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { styles } from "../../styles";
import PanFormTemplate from "../../templates/pan/Form";

export default PanForm = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { unipeEmployeeId } = useSelector((state) => state.auth);
  const { data: kycData } = useGetKycQuery(unipeEmployeeId, {
    pollingInterval: 1000 * 60 * 60 * 24,
  });

  console.log({ kycData });

  const { aadhaar, pan, bank } = kycData ?? {};

  useEffect(() => {
    dispatch(addCurrentScreen("PanForm"));
  }, []);

  const backAction = () => {
    Alert.alert(
      "Hold on!",
      "If you go back your Aadhaar Verification will have to be redone. Continue only if you want to edit your Aadhaar number.",
      [
        { text: "No", onPress: () => null, style: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            aadhaar?.verifyStatus === "SUCCESS"
              ? navigation.navigate("AadhaarConfirm")
              : navigation.navigate("AadhaarForm");
          },
        },
      ]
    );
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LogoHeaderBack
        headline={"PAN Card Verification"}
        subHeadline={
          "हमें आपका नाम और जन्मतिथि जांच करने के लिए आपके पैन की आवश्यकता है।"
        }
        onLeftIconPress={backAction}
        onRightIconPress={() =>
          navigationHelper({
            type: "cms",
            params: { blogKey: "pan_help" },
          })
        }
      />

      <PanFormTemplate setHelpSectionVisible={setVisible} />
    </SafeAreaView>
  );
};
