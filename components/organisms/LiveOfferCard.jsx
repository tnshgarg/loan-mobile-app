import { useNavigation } from "@react-navigation/core";
import GetMoneyCard from "../molecules/GetMoneyCard";
import PayMoneyCard from "../molecules/PayMoneyCard";

const LiveOfferCard = ({ eligible, accessible, ewaLiveSlice }) => {
  const navigation = useNavigation();

  return (
    <>
      <GetMoneyCard
        navigation={navigation}
        eligible={eligible}
        accessible={accessible}
        amount={"₹" + ewaLiveSlice?.eligibleAmount}
      />
      <PayMoneyCard
        amount={"₹" + ewaLiveSlice?.loanAmount}
        dueDate={ewaLiveSlice?.dueDate}
      />
    </>
  );
};

export default LiveOfferCard;
