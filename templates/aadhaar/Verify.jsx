import { useEffect, useState, useRef } from "react";
import { ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AadhaarVerifyApi from "../../apis/aadhaar/Verify";
import { setAadhaarTimer } from "../../store/slices/timerSlice";
import AadhaarOtpApi from "../../apis/aadhaar/Otp";
import { styles } from "../../styles";
import { COLORS } from "../../constants/Theme";
import OtpInput from "../../components/molecules/OtpInput";

const AadhaarVerifyTemplate = (props) => {
  const dispatch = useDispatch();
  const inputRef = useRef();

  const [resend, setResend] = useState(false);
  const [otp, setOtp] = useState("");
  const [validOtp, setValidOtp] = useState(true);

  const countDownTime = useSelector((state) => state.timer.aadhaar);
  const aadhaarSlice = useSelector((state) => state.aadhaar);
  const [number, setNumber] = useState(aadhaarSlice?.number);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    interval = setInterval(() => {
      console.log({ countDownTime });
      if (countDownTime > 0) {
        dispatch(setAadhaarTimer(countDownTime - 1));
      } else {
        props.setBack(true);
      }
    }, 1000);

    if (countDownTime === 0 || verified) {
      setResend(true);
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [countDownTime, verified]);

  useEffect(() => {
    setValidOtp(otp.length === 6);
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
          inputRef={props.inputRef}
        />

        <Text style={styles.subHeadline} accessibilityLabel="OtpText">
          Didn’t receive the secure code?{" "}
          {props.back ? (
            <AadhaarOtpApi
              data={{ aadhaar_number: number, consent: "Y" }}
              type={props?.route?.params?.type || ""}
              textButton={true}
              inputRef={props.inputRef}
            />
          ) : (
            <Text style={{ color: COLORS.secondary }}>
              Resend OTP in {Math.trunc(countDownTime / 60)}:
              {String("0" + (countDownTime % 60)).slice(-2)}
            </Text>
          )}
        </Text>

        <AadhaarVerifyApi
          data={{ otp: otp, include_xml: true, share_code: 5934 }}
          disabled={!validOtp}
          type={props?.route?.params?.type || ""}
          setVerified={setVerified}
        />
      </View>
    </ScrollView>
  );
};

export default AadhaarVerifyTemplate;
