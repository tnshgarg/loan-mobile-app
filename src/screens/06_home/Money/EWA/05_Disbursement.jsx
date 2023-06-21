import { useEffect, useState } from "react";
import { BackHandler, SafeAreaView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Hourglass from "../../../../assets/Hourglass.svg";
import Failure from "../../../../assets/animations/Failure";
import Success from "../../../../assets/animations/Success";
import SvgContainer from "../../../../components/atoms/SvgContainer";
import DisbursementCard from "../../../../components/molecules/DisbursementCard";
import LogoHeaderBack from "../../../../components/molecules/LogoHeaderBack";
import { COLORS, FONTS } from "../../../../constants/Theme";
import { strings } from "../../../../helpers/Localization";
import { useGetDisbursementQuery } from "../../../../store/apiSlices/ewaApi";
import { addCurrentScreen } from "../../../../store/slices/navigationSlice";
import { styles } from "../../../../styles";

const Disbursement = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { offer } = route.params;

  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);

  const bankSlice = useSelector((state) => state.bank);
  const [bankAccountNumber, setBankAccountNumber] = useState(
    bankSlice?.data?.accountNumber
  );
  const [dueDate, setDueDate] = useState("");
  const [loanAccountNumber, setLoanAccountNumber] = useState("");
  const [loanAmount, setLoanAmount] = useState(0);
  const [netAmount, setNetAmount] = useState(0);
  const [status, setStatus] = useState("");
  console.log({ status });

  const backAction = () => {
    navigation.navigate("HomeStack", {
      screen: "Money",
      params: { screen: "EWA" },
    });
    return true;
  };

  useEffect(() => {
    dispatch(addCurrentScreen("EWA_Disbursement"));
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const StatusImage = (status) => {
    switch (status) {
      case "SUCCESS":
        return (
          <SvgContainer height={200} width={200}>
            <Success />
          </SvgContainer>
        );
      case "REJECTED":
        return (
          <SvgContainer height={300} width={300}>
            <Failure />
          </SvgContainer>
        );
      case "FAILURE":
        return (
          <SvgContainer height={300} width={300}>
            <Failure />
          </SvgContainer>
        );
      default:
        return (
          <SvgContainer height={200} width={200}>
            <Hourglass />
          </SvgContainer>
        );
    }
  };

  const getStatusText = (headline, subheadline) => {
    return (
      <View style={{ alignItems: "center", width: "100%" }}>
        <Text
          style={[
            styles.headline,
            { marginTop: "10%", color: COLORS.black, ...FONTS.body2 },
          ]}
        >
          {headline}
        </Text>
        <Text
          style={[styles.subHeadline, { color: COLORS.gray, ...FONTS.body3 }]}
        >
          {subheadline}
        </Text>
      </View>
    );
  };

  const StatusText = (status) => {
    switch (status) {
      case "SUCCESS":
        return getStatusText(strings.congrats, strings.advanceSalaryCredited);
      case "REJECTED":
        return getStatusText(strings.sorry, strings.cannotProcessSalary);
      case "FAILURE":
        return getStatusText(strings.sorry, strings.cannotProcessSalary);
      default:
        return getStatusText(strings.pending, strings.receiveMoney);
    }
  };

  const {
    isSuccess: getDisbursementIsSuccess,
    isError: getDisbursementIsError,
    error: getDisbursementError,
    data: getDisbursementData,
  } = useGetDisbursementQuery({
    offerId: offer?.offerId,
    unipeEmployeeId: unipeEmployeeId,
  });

  useEffect(() => {
    console.log("getDisbursementIsSuccess", offer);
    console.log("getDisbursementData", getDisbursementData);
    if (getDisbursementIsSuccess) {
      if (getDisbursementData?.status === 200) {
        setBankAccountNumber(getDisbursementData?.body?.bankAccountNumber);
        setDueDate(getDisbursementData?.body?.dueDate);
        setLoanAccountNumber(getDisbursementData?.body?.loanAccountNumber);
        setLoanAmount(getDisbursementData?.body?.loanAmount);
        setNetAmount(getDisbursementData?.body?.netAmount);
        setStatus(getDisbursementData?.body?.status);
      } else {
        console.log("API error getDisbursementData : ", getDisbursementData);
      }
    } else if (getDisbursementIsError) {
      console.log("API error getDisbursementError : ", getDisbursementError);
    }
  }, [getDisbursementIsSuccess, getDisbursementData]);

  useEffect(() => {
    setDueDate(offer?.dueDate);
    setLoanAccountNumber(offer?.loanAccountNumber);
    setLoanAmount(offer?.loanAmount);
    let pf = (parseInt(offer?.loanAmount) * offer?.fees) / 100;
    let pF;
    if (parseInt(pf) % 10 < 4) {
      pF = Math.max(9, Math.floor(pf / 10) * 10 - 1);
    } else {
      pF = Math.max(9, Math.floor((pf + 10) / 10) * 10 - 1);
    }
    setNetAmount(parseInt(offer?.loanAmount) - pF);
  }, [offer]);

  const data = [
    { subTitle: strings.loanAmount, value: "₹" + loanAmount },
    { subTitle: strings.netTransferAmount, value: "₹" + netAmount },
    { subTitle: strings.bankAccountNumber, value: bankAccountNumber },
    { subTitle: strings.dueDate, value: dueDate },
    { subTitle: strings.loanAccountNumber, value: loanAccountNumber },
    { subTitle: strings.transferStatus, value: status },
  ];

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LogoHeaderBack
        title={strings.moneyTransfer}
        onLeftIconPress={() => backAction()}
        onRightIconPress={() => {}}
        titleStyle={{ ...FONTS.body3 }}
      />
      <View style={[styles.container, { alignItems: "center" }]}>
        {StatusImage(status)}
        {StatusText(status)}
        {status == "REJECTED" || status == "ERROR" ? null : (
          <DisbursementCard
            data={data}
            title={strings.loanDetails}
            info={strings.moneyAutoDebitedUpcomingSalary}
            iconName="ticket-percent-outline"
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Disbursement;
