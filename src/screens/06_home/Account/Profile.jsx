import { useEffect } from "react";
import { BackHandler, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import AltMobile from "../../../assets/AltMobile.svg";
import CustomerSupport from "../../../assets/CustomerSupport.svg";
import Education from "../../../assets/Education.svg";
import MaritalStatus from "../../../assets/MaritalStatus.svg";
import SvgContainer from "../../../components/atoms/SvgContainer";
import LogoHeaderBack from "../../../components/molecules/LogoHeaderBack";
import { COLORS, FONTS } from "../../../constants/Theme";
import {
  InteractionTypes,
  trackEvent,
} from "../../../helpers/analytics/commonAnalytics";
import { KYC_POLLING_DURATION } from "../../../services/constants";
import { useGetKycQuery } from "../../../store/apiSlices/kycApi";
import { styles } from "../../../styles";
import ProfileFormTemplate from "../../../templates/profile/Form";

const Profile = ({ navigation }) => {
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);

  const { data: kycData, isLoading: kycLoading } = useGetKycQuery(
    unipeEmployeeId,
    {
      pollingInterval: KYC_POLLING_DURATION,
    }
  );
  const { aadhaar, pan, profile } = kycData ?? {};
  const profileComplete = profile?.profileComplete;
  const fullName = aadhaar?.data?.name || pan?.data?.name;
  const email = profile?.email;
  const mobile = useSelector((state) => state.auth.phoneNumber);
  const alternateMobile = profile?.altMobile;
  const maritalStatus = profile?.maritalStatus;
  const qualification = profile?.qualification;

  let res = [
    { title: "Mobile Number", subtitle: mobile, imageUri: <CustomerSupport /> },
    {
      title: "Alternate Mobile Number",
      subtitle: alternateMobile,
      imageUri: <AltMobile />,
    },
    {
      title: "Educational Qualification",
      subtitle: qualification,
      imageUri: <Education />,
    },
    {
      title: "Marital Status",
      subtitle: maritalStatus,
      imageUri: <MaritalStatus />,
    },
  ];

  const backAction = () => {
    trackEvent({
      interaction: InteractionTypes.BUTTON_PRESS,
      screen: "profile",
      action: "BACK",
    });
    navigation.goBack();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  useEffect(() => {
    trackEvent({
      interaction: InteractionTypes.SCREEN_OPEN,
      screen: "profile",
      action: "START",
    });
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LogoHeaderBack
        title="Profile Details"
        onLeftIconPress={() => backAction()}
      />
      {profileComplete ? (
        <View style={[styles.container, { alignItems: "center" }]}>
          <Image
            source={{
              uri: `data:image/jpeg;base64,${aadhaar?.data?.["photo_base64"]}`,
              cache: "only-if-cached",
            }}
            style={{ height: 100, width: 100 }}
          />
          <Text style={{ ...FONTS.body1, color: COLORS.black, marginTop: 10 }}>
            {fullName}
          </Text>
          <Text style={{ ...FONTS.body3, color: COLORS.black }}>{email}</Text>
          <View
            style={{
              width: "150%",
              borderTopWidth: 1,
              borderColor: COLORS.lightGray,
              marginVertical: 25,
            }}
          />

          {res.map((item, index) => (
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                padding: 15,
              }}
            >
              <SvgContainer height={36} width={36}>
                {item.imageUri}
              </SvgContainer>
              <View style={{ flexDirection: "column", paddingLeft: 15 }}>
                <Text style={{ ...FONTS.body4, color: COLORS.gray }}>
                  {item.title}
                </Text>
                <Text style={{ ...FONTS.body3, color: COLORS.black }}>
                  {item.subtitle}
                </Text>
              </View>
            </View>
          ))}
          {/* <DetailsCard
            data={cardData()}
            imageUri={{
              uri: `data:image/jpeg;base64,${aadhaar?.data?.["photo_base64"]}`,
              cache: "only-if-cached",
            }}
          /> */}
        </View>
      ) : (
        <>
          <ProfileFormTemplate type="KYC" />
        </>
      )}
    </SafeAreaView>
  );
};

export default Profile;
