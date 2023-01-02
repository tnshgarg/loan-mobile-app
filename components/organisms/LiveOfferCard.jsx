import { useNavigation } from "@react-navigation/core";
import GetMoneyCard from "../molecules/GetMoneyCard";
import PayMoneyCard from "../molecules/PayMoneyCard";

const LiveOfferCard = ({ eligible, accessible, ewaLiveSlice, auto }) => {
  const navigation = useNavigation();

  return (
    <>
      <GetMoneyCard
        navigation={navigation}
        eligible={eligible}
        accessible={accessible}
        amount={"₹" + ewaLiveSlice?.eligibleAmount}
        auto={auto == "ewa" ? true : false}
      />
      <PayMoneyCard
        amount={"₹" + ewaLiveSlice?.loanAmount}
        dueDate={ewaLiveSlice?.dueDate}
        auto={auto == "repayment" ? true : false}
      />
    </>
  );
};

export default LiveOfferCard;
