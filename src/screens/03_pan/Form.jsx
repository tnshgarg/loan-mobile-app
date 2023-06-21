import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Alert, SafeAreaView, BackHandler } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { styles } from "../../styles";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import PanFormTemplate from "../../templates/pan/Form";
import LogoHeaderBack from "../../components/molecules/LogoHeaderBack";
import { useGetAadhaarQuery } from "../../store/apiSlices/aadhaarApi";
import { strings } from "../../helpers/Localization";
import { navigationHelper } from "../../helpers/CmsNavigationHelper";

export default PanForm = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { unipeEmployeeId } = useSelector((state) => state.auth);
  const { data: aadhaarData } = useGetAadhaarQuery(unipeEmployeeId, {
    pollingInterval: 1000 * 60 * 60 * 24,
  });

  console.log({ aadhaarData });

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
            aadhaarData?.verifyStatus === "SUCCESS"
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
