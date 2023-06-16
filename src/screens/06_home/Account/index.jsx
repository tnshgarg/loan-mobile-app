import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  BackHandler,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import ListItem from "../../../components/atoms/ListItem";
import LogoHeader from "../../../components/atoms/LogoHeader";
import TermsAndPrivacyModal from "../../../components/molecules/TermsAndPrivacyModal";
import LogoutModal from "../../../components/organisms/LogoutModal";
import { COLORS } from "../../../constants/Theme";
import { strings } from "../../../helpers/Localization";

import Logout from "../../../assets/Logout.svg";
import InfoCard from "../../../components/atoms/InfoCard";
import { useGetKycQuery } from "../../../store/apiSlices/kycApi";
import { accountStyles, styles } from "../../../styles";
import DUMMY_RES, { useGetCmsQuery } from "../../../store/apiSlices/cmsApi";
import CmsRoot from "../../../components/cms/CmsRoot";
import CmsThreeColumn from "../../../components/cms/CmsThreeColumn";
import LogoutItem from "../../../components/atoms/LogoutItem";

const AccountMenu = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [isPrivacyModalVisible, setIsPrivacyModalVisible] = useState(false);
  const [isTermsOfUseModalVisible, setIsTermsOfUseModalVisible] =
    useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [kycCompleted, setKycCompleted] = useState(false);

  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const { data: kycData } = useGetKycQuery(unipeEmployeeId, {
    pollingInterval: 1000 * 60 * 60 * 24,
  });
  const {
    isAadhaarSuccess,
    isPanSuccess,
    isBankSuccess,
    isProfileSuccess,
    profile,
    aadhaar,
    pan,
    bank,
  } = kycData ?? {};

  useEffect(() => {
    if (isAadhaarSuccess && isPanSuccess && isBankSuccess && isProfileSuccess) {
      setKycCompleted(true);
    }
  }, [isAadhaarSuccess, isPanSuccess, isBankSuccess, isProfileSuccess]);

  const image = aadhaar?.data?.photo_base64;
  console.log({ image });
  const name = aadhaar.data?.name || pan.data?.name || auth.employeeName;

  const backAction = () => {
    navigation.navigate("HomeStack", {
      screen: "Money",
    });
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const onLogout = () => {
    dispatch({ type: "LOGOUT" });
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
      navigation.navigate("OnboardingStack", { screen: "Login" });
    }, 5000);
  };

  const options = [
    {
      title: strings.logout,
      subtitle: strings.logoutFromUnipe,
      imageUri:
        "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/circleIcons/logout.png ",
      action: () => onLogout(),
    },
  ];

  const onPressCard = ({ route, action }) => {
    console.log({ route });
    if (route) props.navigation.navigate(route.stack, { screen: route.screen });
    else action();
  };

  const { data: cmsData, isLoading: cmsLoading } = useGetCmsQuery(
    unipeEmployeeId,
    {
      pollingInterval: 1000,
    }
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LogoHeader
        title={"Account"}
        containerStyle={{ backgroundColor: null }}
      />
      <ScrollView>
        <View style={accountStyles.imageContainer}>
          {!image ? (
            <View style={accountStyles.guestIcon}>
              <MaterialCommunityIcons
                name={"account"}
                size={48}
                color={COLORS.white}
              />
            </View>
          ) : (
            <Image
              source={{
                uri: `data:image/jpeg;base64,${image}`,
                cache: "only-if-cached",
              }}
              style={accountStyles.userImage}
            />
          )}
          <View style={{ flexDirection: "column" }}>
            <Text style={accountStyles.userTitle}>{name}</Text>
            <Text style={accountStyles.userSubtitle}>Amazon India</Text>
          </View>
        </View>
        {!kycCompleted && (
          <View style={{ paddingHorizontal: 15 }}>
            <InfoCard
              variant={"gradient"}
              title={"Action Required"}
              info={
                "Verify your identity to withdraw advance salary in our bank account"
              }
            />
          </View>
        )}

        {!cmsLoading ? (
          <CmsRoot children={DUMMY_RES?.account || []}></CmsRoot>
        ) : (
          <></>
        )}

        {options.map((item, index) => (
          <LogoutItem
            key={index}
            item={{ ...item, onPress: () => onPressCard(item) }}
            showIcon={true}
          />
        ))}
      </ScrollView>
      {isTermsOfUseModalVisible && (
        <TermsAndPrivacyModal
          isVisible={isTermsOfUseModalVisible}
          setIsVisible={setIsTermsOfUseModalVisible}
          data={termsOfUse}
        />
      )}
      {isPrivacyModalVisible && (
        <TermsAndPrivacyModal
          isVisible={isPrivacyModalVisible}
          setIsVisible={setIsPrivacyModalVisible}
          data={privacyPolicy}
        />
      )}
      {modalVisible && <LogoutModal modalVisible={modalVisible} />}
    </SafeAreaView>
  );
};

export default AccountMenu;
