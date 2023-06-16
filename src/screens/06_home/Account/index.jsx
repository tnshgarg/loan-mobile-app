import {
  BackHandler,
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { accountStyles, styles } from "../../../styles";
import LogoHeader from "../../../components/atoms/LogoHeader";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS } from "../../../constants/Theme";
import { useDispatch, useSelector } from "react-redux";
import termsOfUse from "../../../templates/docs/TermsOfUse";
import privacyPolicy from "../../../templates/docs/PrivacyPolicy";
import TermsAndPrivacyModal from "../../../components/molecules/TermsAndPrivacyModal";
import { showToast } from "../../../components/atoms/Toast";
import { useNavigation } from "@react-navigation/native";
import LogoutModal from "../../../components/organisms/LogoutModal";
import ListItem from "../../../components/atoms/ListItem";
import whatsappLinking from "../../../helpers/WhatsappLinking";
import Profile from "../../../assets/Profile.svg";
import Payslip from "../../../assets/Payslip.svg";
import CustomerSupport from "../../../assets/CustomerSupport.svg";
import Kyc from "../../../assets/Kyc.svg";
import AboutUs from "../../../assets/AboutUs.svg";
import Logout from "../../../assets/Logout.svg";
import InfoCard from "../../../components/atoms/InfoCard";
import { useGetKycQuery } from "../../../store/apiSlices/kycApi";

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
      // navigation.replace("OnboardingStack", { screen: "Login" });
    }, 5000);
  };

  const options = [
    {
      title: "Profile",
      subtitle: "See & edit your profile details",
      imageUri: <Profile />,
      route: { stack: "AccountStack", screen: "Profile" },
    },
    {
      title: "Payslips",
      subtitle: "View and dpownload payslips",
      imageUri: <Payslip />,
      route: { stack: "AccountStack", screen: "Profile" },
    },
    {
      title: "KYC",
      subtitle: "All your KYC details in one place",
      imageUri: <Kyc />,
      route: { stack: "AccountStack", screen: "KYC" },
    },

    // {
    //   title: "Mandate",
    //   subtitle: "Mandate is required for availing advance salary",
    //   iconName: "order-bool-ascending-variant",
    //   route: { stack: "AccountStack", screen: "Mandate" },
    // },
    // {
    //   title: "Documents",
    //   subtitle: "All your documents at one place",
    //   iconName: "file-document-outline",
    //   route: { stack: "AccountStack", screen: "Documents" },
    // },
    {
      title: "Customer Support",
      subtitle: "Talk to out support team",
      imageUri: <CustomerSupport />,
      action: () => {
        whatsappLinking();
      },
    },
    {
      title: "About Us",
      subtitle: "Read about us and our terms of use",
      imageUri: <AboutUs />,
      action: () =>
        props.navigation.navigate("CmsScreen", {
          data: {
            screenTitle: "About Us",
            cmsData: [
              {
                type: "tabs",
                children: [
                  {
                    name: "Unipe",
                    data: [
                      {
                        type: "section",
                        title: "Learn With Us",
                      },
                    ],
                  },
                  {
                    name: "T&C",
                    data: [
                      {
                        type: "section",
                        title: "Learn With Us",
                      },
                    ],
                  },
                  {
                    name: "Privacy Policy",
                    data: [
                      {
                        type: "section",
                        title: "Learn With Us",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        }),
    },
    // {
    //   title: "Privacy Policy",
    //   subtitle: "Read our privacy policy",
    //   imageUri: <AboutUs />,
    //   action: () => setIsPrivacyModalVisible(true),
    // },
    {
      title: "Logout",
      subtitle: "Logout from Unipe App",
      imageUri: <Logout />,
      action: () => onLogout(),
    },
  ];

  const onPressCard = ({ route, action }) => {
    console.log({ route });
    if (route) props.navigation.replace(route.stack, { screen: route.screen });
    else action();
  };

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

        {options.map((item, index) => (
          <ListItem
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
