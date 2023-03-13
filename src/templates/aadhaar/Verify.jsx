import { useEffect, useState, useRef } from "react";
import { ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AadhaarVerifyApi from "../../apis/aadhaar/Verify";
import { setAadhaarTimer } from "../../store/slices/timerSlice";
import AadhaarOtpApi from "../../apis/aadhaar/Otp";
import { styles } from "../../styles";
import { COLORS } from "../../constants/Theme";
import OtpInput from "../../components/molecules/OtpInput";
import BackgroundTimer from "react-native-background-timer";
import { addVerifyStatus } from "../../store/slices/aadhaarSlice";

const AadhaarVerifyTemplate = (props) => {
  const dispatch = useDispatch();
  const inputRef = useRef();

  const [resend, setResend] = useState(false);
  const [validOtp, setValidOtp] = useState(true);
  const [verified, setVerified] = useState(false);
  
  const [otp, setOtp] = useState("");

  const countDownTime = useSelector((state) => state.timer.aadhaar);

  let interval;

  useEffect(() => {
    
    interval = BackgroundTimer.setInterval(() => {
      console.log({ countDownTime });
      if (countDownTime > 0) {
        dispatch(setAadhaarTimer(countDownTime - 1));
      } else {
        props.setBack(true);
      }
    }, 1000);

    if (countDownTime < 1 || verified) {
      setResend(true);
      BackgroundTimer.clearInterval(interval);
    }
    if (countDownTime < 1){
      dispatch(addVerifyStatus("PENDING"));
    }

    return () => BackgroundTimer.clearInterval(interval);

  }, [countDownTime, verified]);

  useEffect(() => {
    setValidOtp(otp.length === 6);
    return () => {};
  }, [otp]);

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <Text style={styles.headline}>Verify Aadhaar</Text>
        <Text style={styles.subHeadline}>
          कृपया छ डिजिट का OTP यहाँ भरें। इसी के द्वारा ये स्पष्ट होगा की ऊपर
          भरा आधार नम्बर आपका है। ये जानकारी आपकी कम्पनी को दी जाएगी।
        </Text>
        <OtpInput
          otp={otp}
          setOtp={setOtp}
          inputRef={inputRef}
          accessibilityLabel={"AadhaarOtpInput"}
        />

        <Text style={styles.subHeadline} accessibilityLabel="OtpText">
          Didn’t receive the secure code?{" "}
          {resend ? (
            <AadhaarOtpApi
              type={props?.route?.params?.type || ""}
              isTextButton={true}
              textButton="Resend OTP"
              toggle={setResend}
            />
          ) : (
            <Text style={{ color: COLORS.secondary }}>
              Resend OTP in {Math.trunc(countDownTime / 60)}:
              {String("0" + (countDownTime % 60)).slice(-2)}
            </Text>
          )}
        </Text>

        <AadhaarVerifyApi
          data={{ otp: otp }}
          disabled={!validOtp}
          type={props?.route?.params?.type || ""}
          setVerified={setVerified}
        />

      </View>
    </ScrollView>
  );
};

export default AadhaarVerifyTemplate;
