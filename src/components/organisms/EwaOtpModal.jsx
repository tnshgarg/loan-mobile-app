import { useNavigation } from "@react-navigation/core";
import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { COLORS, FONTS } from "../../constants/Theme";
import {
  useGenerateEwaOtpMutation,
  useVerifyEwaOtpMutation,
} from "../../store/apiSlices/ewaOtpApi";
import BottomSheetWrapper from "../atoms/BottomSheetWrapper";
import PrimaryButton from "../atoms/PrimaryButton";
import OtpInput from "../molecules/OtpInput";
const EWAOtpModal = ({ title, loading, onPressMethod }) => {
  const navigation = useNavigation();
  const [otp, setOtp] = useState("");
  const inputRef = useRef();
  const [generateOtp] = useGenerateEwaOtpMutation();
  const [verifyOtp] = useVerifyEwaOtpMutation();
  const [isVisible, setIsVisible] = useState(false);
  const mobile_number = useSelector((state) => state.auth.phoneNumber);
  const provider = "routemobile";
  const offer_id = useSelector((state) => state.ewaLive.offerId);
  const [disabled, setDisabled] = useState(false);
  const [verifyDisabled, setVerifyDisabled] = useState(true);

  const generateEwaOtp = async (e) => {
    console.log({
      mobile_number,
      provider,
      offer_id,
    })
    setDisabled(true);
    await generateOtp({
      mobile_number,
      provider,
      offer_id,
    })
      .unwrap()
      .then((otpResponse) => {
        setIsVisible(true);
        console.log("otpResponse", otpResponse);
      })
      .catch((error) => {
        setIsVisible(false);
        setDisabled(false);
        console.log("error", error);
      });
  };

  const verifyEwaOtp = async () => {
    // onPressMethod().then(async (res) => {
      // if (res.status == "SUCCESS") {
        await verifyOtp({
          mobile_number,
          provider,
          offer_id,
          otp,
        })
          .unwrap()
          .then((otpResponse) => {
            console.log("otpResponse", otpResponse);
            if (otpResponse.status == 200) {
              setDisabled(false);
              navigation.navigate("EWA_DISBURSEMENT", {
                offer: ewaLiveSlice,
                enableFeedback: true,
              });
            } else {
              setDisabled(false);
            }
          })
          .catch((error) => {
            console.log("error", error);
            alert("Error", error.message);
          });
      // } else {
      //   toast({
      //     title: "Some Error Occured!",
      //     description: "Agreement Failed",
      //     status: "failure",
      //     duration: 5000,
      //     isClosable: true,
      //   });
      
    // });
  };

  useEffect(() => {
    if (otp.length == 6) {
      setVerifyDisabled(false);
    }
  }, [otp]);

  return (
    <>
      <View>
        <PrimaryButton
          size="lg"
          onPress={(e) => {
            generateEwaOtp();
          }}
          title={title}
          disabled={disabled}
          loading={loading}
        />
      </View>
      <BottomSheetWrapper
        open={isVisible}
        setOpen={setIsVisible}
        dismissable={false}
      >
        <Text
          style={{
            ...FONTS.h2,
            color: COLORS.black,
            alignSelf: "center",
          }}
        >
          Please enter otp
        </Text>

        <OtpInput
          otp={otp}
          setOtp={setOtp}
          inputRef={inputRef}
          accessibilityLabel="OtpInput"
        />
        <View>
          <PrimaryButton
            title={"Proceed"}
            disabled={verifyDisabled}
            onPress={() => {
              verifyEwaOtp();
            }}
          />
        </View>
      </BottomSheetWrapper>
    </>
  );
};

export default EWAOtpModal;
