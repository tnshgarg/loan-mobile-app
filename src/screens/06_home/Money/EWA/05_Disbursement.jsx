import { useEffect, useState } from "react";
import { BackHandler, SafeAreaView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Hourglass from "../../../../assets/Hourglass.svg";
import Failure from "../../../../assets/animations/Failure";
import Success from "../../../../assets/animations/Success";
import PrimaryButton from "../../../../components/atoms/PrimaryButton";
import SvgContainer from "../../../../components/atoms/SvgContainer";
import DisbursementCard from "../../../../components/molecules/DisbursementCard";
import FeedbackAlert from "../../../../components/molecules/FeedbackAlert";
import LogoHeaderBack from "../../../../components/molecules/LogoHeaderBack";
import { COLORS, FONTS } from "../../../../constants/Theme";
import { strings } from "../../../../helpers/Localization";
import {
  InteractionTypes,
  trackEvent
} from "../../../../helpers/analytics/commonAnalytics";
import { navigate } from "../../../../navigators/RootNavigation";
import {
  useDisbursementFeedbackMutation,
  useGetDisbursementQuery,
} from "../../../../store/apiSlices/ewaApi";
import { addCurrentScreen } from "../../../../store/slices/navigationSlice";
import { styles } from "../../../../styles";

const Disbursement = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { offer, enableFeedback } = route.params;

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
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");
  const categoryData = [
    "Medical Emergency",
    "Shopping",
    "Travel",
    "Special Occasion",
    "Other",
  ];

  console.log({ status });

  const backAction = () => {
    trackEvent({
      interaction: InteractionTypes.BUTTON_PRESS,
      screen: "requestProcessed",
      action: "BACK",
    });
    navigate("HomeStack", {
      screen: "Money",
      params: { screen: "EWA" },
    });
    return true;
  };

  useEffect(() => {
    trackEvent({
      interaction: InteractionTypes.BUTTON_PRESS,
      screen: "requestProcessed",
      action: "START",
    });
  }, []);

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

  const data = [
    { subTitle: strings.loanAmount, value: "₹" + loanAmount },
    { subTitle: strings.netTransferAmount, value: "₹" + netAmount },
    { subTitle: strings.bankAccountNumber, value: bankAccountNumber },
    { subTitle: strings.dueDate, value: dueDate },
    { subTitle: strings.loanAccountNumber, value: loanAccountNumber },
    { subTitle: strings.transferStatus, value: status },
  ];
  const [disbursementFeedback] = useDisbursementFeedbackMutation();
  const onSubmitFeedback = () => {
    const offerId = offer?.offerId;
    let data = {
      unipeEmployeeId: unipeEmployeeId,
      language: "en",
      contentType: `${offerId}-feedback`,
      content: { stars: rating, category: category, offerId: offerId },
    };
    disbursementFeedback(data)
      .unwrap()
      .then((res) => {
        console.log("ewa/disbursement-feedback res: ", res);
        const responseJson = res?.data;
        trackEvent({
          interaction: InteractionTypes.BUTTON_PRESS,
          screen: "requestProcessed",
          action: "SUCCESS",
        });
        console.log("ewa/disbursement-feedback responseJson: ", responseJson);
      })
      .catch((error) => {
        trackEvent({
          interaction: InteractionTypes.BUTTON_PRESS,
          screen: "requestProcessed",
          action: "ERROR",
        });
        console.log("ewa/disbursement-feedback error:", error);
      });
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      {enableFeedback ? (
        <LogoHeaderBack
          onRightIconPress={() => {
            navigate("CmsStack", {screen: "CmsScreenOne", params: {blogKey: "salary_info"}})
          }}
          hideLogo={true}
          containerStyle={{ backgroundColor: null }}
        />
      ) : (
        <LogoHeaderBack
          title="Money Transfer"
          onLeftIconPress={() => {
            backAction();
          }}
          onRightIconPress={() => {
            navigate("CmsStack", {screen: "CmsScreenOne", params: {blogKey: "salary_info"}})
          }}
          titleStyle={{ ...FONTS.body3 }}
        />
      )}

      <View
        style={[
          styles.container,
          { alignItems: "center", justifyContent: "space-evenly" },
        ]}
      >
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
        {enableFeedback ? (
          <PrimaryButton
            title="Thank you"
            containerStyle={{
              backgroundColor: null,
              borderWidth: 1.5,
              borderColor: COLORS.black,
            }}
            onPress={() => {
              trackEvent({
                interaction: InteractionTypes.BUTTON_PRESS,
                screen: "requestProcessed",
                action: "THANKYOU",
              });
              backAction();
            }}
            titleStyle={{ color: COLORS.black }}
          />
        ) : (
          <></>
        )}

        {status == "PENDING" && enableFeedback ? (
          <FeedbackAlert
            data={categoryData}
            ratingHook={[rating, setRating]}
            setCategory={setCategory}
            category={category}
            onSubmit={onSubmitFeedback}
          />
        ) : (
          <></>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Disbursement;
