import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Alert, SafeAreaView, ScrollView, Text, View } from "react-native";
import { getUniqueId } from "react-native-device-info";
import { NetworkInfo } from "react-native-network-info";
import { useDispatch, useSelector } from "react-redux";
import RazorpayCheckout from "react-native-razorpay";
import { mandatePush } from "../../helpers/BackendPush";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import {
  addData,
  addVerifyMsg,
  addVerifyStatus,
  addVerifyTimestamp,
  resetMandate,
} from "../../store/slices/mandateSlice";
import { styles } from "../../styles";
import { showToast } from "../../components/atoms/Toast";
import {
  createCustomer,
  createOrder,
  getToken,
} from "../../services/mandate/Razorpay/services";
import { getBackendData } from "../../services/employees/employeeServices";
import { RZP_KEY_ID } from "../../services/constants";
import { COLORS, FONTS } from "../../constants/Theme";
import Analytics from "appcenter-analytics";
import DetailsCard from "../../components/molecules/DetailsCard";
import MandateOptions from "../../components/molecules/MandateOptions";
import Shield from "../../assets/Shield.svg";
import RBI from "../../assets/RBI.svg";

const MandateFormTemplate = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [deviceId, setDeviceId] = useState(0);
  const [ipAddress, setIpAdress] = useState(0);

  const [fetched, setFetched] = useState(false);

  const token = useSelector((state) => state.auth?.token);
  const unipeEmployeeId = useSelector((state) => state.auth?.unipeEmployeeId);
  const aCTC = useSelector((state) => state.auth?.aCTC);
  const phoneNumber = useSelector((state) => state.auth?.phoneNumber);
  const email = useSelector(
    (state) => state.profile?.email || state.pan?.data?.email
  );
  const accountHolderName = useSelector(
    (state) => state.bank?.data?.accountHolderName
  );
  const accountNumber = useSelector((state) => state.bank?.data?.accountNumber);
  const ifsc = useSelector((state) => state.bank?.data?.ifsc);

  const mandateSlice = useSelector((state) => state.mandate);
  const [loading, setLoading] = useState(false);
  const [authType, setAuthType] = useState();
  const [customerId, setCustomerId] = useState(mandateSlice?.data?.customerId);
  const [orderId, setOrderId] = useState(null);
  const [data, setData] = useState(mandateSlice?.data);
  const [verifyMsg, setVerifyMsg] = useState(mandateSlice?.verifyMsg);
  const [verifyStatus, setVerifyStatus] = useState(mandateSlice?.verifyStatus);
  const [verifyTimestamp, setVerifyTimestamp] = useState(
    mandateSlice?.verifyTimestamp
  );

  useEffect(() => {
    console.log("mandateSlice: ", mandateSlice);
    getUniqueId().then((id) => {
      setDeviceId(id);
    });
    NetworkInfo.getIPV4Address().then((ipv4Address) => {
      setIpAdress(ipv4Address);
    });
  }, []);

  useEffect(() => {
    if (unipeEmployeeId) {
      getBackendData({
        params: { unipeEmployeeId: unipeEmployeeId },
        xpath: "mandate",
        token: token,
      })
        .then((response) => {
          console.log("mandateFetch response.data", response.data);
          if (response.data.status === 200) {
            dispatch(resetMandate(response.data.body));
            setFetched(true);
          }
        })
        .catch((error) => {
          console.log("mandateFetch error: ", error);
        });
    }
  }, [unipeEmployeeId]);

  useEffect(() => {
    dispatch(addData(data));
  }, [data]);

  useEffect(() => {
    dispatch(addVerifyMsg(verifyMsg));
  }, [verifyMsg]);

  useEffect(() => {
    dispatch(addVerifyStatus(verifyStatus));
  }, [verifyStatus]);

  useEffect(() => {
    dispatch(addVerifyTimestamp(verifyTimestamp));
  }, [verifyTimestamp]);

  const backendPush = ({ data, verifyMsg, verifyStatus, verifyTimestamp }) => {
    console.log("mandateSlice: ", mandateSlice);
    setData(data);
    setVerifyMsg(verifyMsg);
    setVerifyStatus(verifyStatus);
    setVerifyTimestamp(verifyTimestamp);
    mandatePush({
      data: {
        unipeEmployeeId: unipeEmployeeId,
        ipAddress: ipAddress,
        deviceId: deviceId,
        data: data,
        verifyMsg: verifyMsg,
        verifyStatus: verifyStatus,
        verifyTimestamp: verifyTimestamp,
      },
      token: token,
    });
  };

  useEffect(() => {
    console.log("createCustomer customerId: ", customerId, !customerId);
    if (!customerId) {
      try {
        createCustomer({
          name: accountHolderName,
          email: email,
          contact: phoneNumber,
          unipeEmployeeId: unipeEmployeeId,
        })
          .then((res) => {
            console.log("createCustomer res.data: ", res.data);
            setCustomerId(res.data.id);
            Analytics.trackEvent("Mandate|CreateCustomer|Success", {
              unipeEmployeeId: unipeEmployeeId,
            });
          })
          .catch((error) => {
            console.log("createCustomer Catch Error: ", error.toString());
            Alert.alert("Error", error.toString());
            Analytics.trackEvent("Mandate|CreateCustomer|Error", {
              unipeEmployeeId: unipeEmployeeId,
              error: error.toString(),
            });
          });
      } catch (error) {
        console.log("createCustomer Try Catch Error: ", error.toString());
        Alert.alert("Error", error.toString());
        Analytics.trackEvent("Mandate|CreateCustomer|Error", {
          unipeEmployeeId: unipeEmployeeId,
          error: error.toString(),
        });
      }
    }
  }, [customerId]);

  useEffect(() => {
    console.log("createMandate orderId: ", orderId, !orderId);
    if (orderId) {
      var options = {
        description: "Unipe Mandate Verification",
        name: "Unipe",
        key: RZP_KEY_ID,
        order_id: orderId,
        customer_id: customerId,
        recurring: "1",
        prefill: {
          name: accountHolderName,
          email: email,
          contact: phoneNumber,
        },
        theme: { color: COLORS.primary },
        notes: { unipeEmployeeId: unipeEmployeeId },
      };

      RazorpayCheckout.open(options)
        .then((data) => {
          getToken({ paymentId: data.razorpay_payment_id })
            .then((token) => {
              console.log("mandate token.data: ", token.data);
              backendPush({
                data: {
                  authType: authType,
                  customerId: customerId,
                  orderId: orderId,
                  paymentId: data.razorpay_payment_id,
                  paymentSignature: data.razorpay_signature,
                  provider: "razorpay",
                  tokenId: token.data.token_id,
                },
                verifyMsg: "Mandate Verified Successfully",
                verifyStatus: "SUCCESS",
                verifyTimestamp: Date.now(),
              });
              showToast("Mandate Verified Successfully");
              Analytics.trackEvent("Mandate|GetToken|Success", {
                unipeEmployeeId: unipeEmployeeId,
              });
              setLoading(false);
              props?.type === "EWA"
                ? navigation.navigate("EWA_AGREEMENT")
                : null;
            })
            .catch((error) => {
              console.log("mandate error:", error.description);
              backendPush({
                data: {
                  authType: authType,
                  customerId: customerId,
                  orderId: orderId,
                  paymentId: data.razorpay_payment_id,
                  paymentSignature: data.razorpay_signature,
                  provider: "razorpay",
                },
                verifyMsg: error.description,
                verifyStatus: "ERROR",
                verifyTimestamp: Date.now(),
              });
              Alert.alert("Error", error.description);
              Analytics.trackEvent("Mandate|GetToken|Error", {
                unipeEmployeeId: unipeEmployeeId,
                error: error.description,
              });
              setLoading(false);
            });
        })
        .catch((error) => {
          console.log("mandate error:", error.description);
          backendPush({
            data: {
              authType: authType,
              customerId: customerId,
              orderId: orderId,
              provider: "razorpay",
            },
            verifyMsg: error.description,
            verifyStatus: "ERROR",
            verifyTimestamp: Date.now(),
          });
          Alert.alert("Error", error.description);
          Analytics.trackEvent("Mandate|Register|Error", {
            unipeEmployeeId: unipeEmployeeId,
            error: error.description,
          });
          setLoading(false);
        });
    }
  }, [orderId]);

  const ProceedButton = ({ authType }) => {
    setLoading(true);
    setAuthType(authType);
    backendPush({
      data: { authType: authType, customerId: customerId },
      verifyMsg: `Mandate|CreateOrder|${authType} PENDING`,
      verifyStatus: "PENDING",
      verifyTimestamp: Date.now(),
    });
    createOrder({
      authType: authType,
      customerId: customerId,
      accountHolderName: accountHolderName,
      accountNumber: accountNumber,
      ifsc: ifsc,
      aCTC: aCTC,
      unipeEmployeeId: unipeEmployeeId,
    })
      .then((res) => {
        console.log(`Mandate|CreateOrder|${authType} res.data:`, res.data);
        setOrderId(res.data.id);
        backendPush({
          data: {
            authType: authType,
            customerId: customerId,
            orderId: res.data.id,
          },
          verifyMsg: `Mandate|CreateOrder|${authType} SUCCESS`,
          verifyStatus: "PENDING",
          verifyTimestamp: Date.now(),
        });
        Analytics.trackEvent(`Mandate|CreateOrder|${authType}|Success`, {
          unipeEmployeeId: unipeEmployeeId,
        });
      })
      .catch((error) => {
        console.log(`Mandate|CreateOrder|${authType} error:`, error.toString());
        backendPush({
          data: { authType: authType, customerId: customerId },
          verifyMsg: `Mandate|CreateOrder|${authType} ERROR ${error.toString()}`,
          verifyStatus: "ERROR",
          verifyTimestamp: Date.now(),
        });
        Alert.alert("Error", error.toString());
        Analytics.trackEvent(`Mandate|CreateOrder|${authType}|Error`, {
          unipeEmployeeId: unipeEmployeeId,
          error: error.toString(),
        });
      });
  };

  const cardData = () => {
    var res = [
      {
        subTitle: "Account Holder Name",
        value: accountHolderName,
        fullWidth: true,
      },
      {
        subTitle: "Bank Account No*",
        value: accountNumber,
        fullWidth: true,
      },
      {
        subTitle: "IFSC code",
        value: ifsc,
        fullWidth: true,
      },
    ];
    return res;
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingWrapper>
        <ScrollView showsVerticalScrollIndicator={false}>
          <DetailsCard data={cardData()} />
          <Text
            style={{ ...FONTS.body4, color: COLORS.gray, marginVertical: 10 }}
          >
            Please choose your preferred mode
          </Text>
          {
            customerId == null || !fetched ? (
              <Text style={{ ...FONTS.body4, color: COLORS.gray }}>Initializing ... </Text>
            ) : (
              <MandateOptions ProceedButton={ProceedButton} disabled={loading} />
            )
          }
          <View
            style={{
              padding: 10,
              backgroundColor: COLORS.lightGray,
              marginVertical: 10,
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "center",
              marginTop: "10%"
            }}
          >
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.gray,
                marginBottom: 5,
                textAlign: "center",
              }}
            >
              Mandate is required to auto-debit loan payments on Due Date. This
              is 100% secure and executed by an RBI approved entity.
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              padding: 10,
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <Shield />
              <Text
                style={{ ...FONTS.body4, color: COLORS.gray, marginTop: 5 }}
              >
                100% Secure
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <RBI />
              <Text
                style={{ ...FONTS.body4, color: COLORS.gray, marginTop: 5 }}
              >
                RBI Approved
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
};

export default MandateFormTemplate;
