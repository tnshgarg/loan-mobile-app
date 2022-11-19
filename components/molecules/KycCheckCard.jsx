import { SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import MessageCard from "../atoms/MessageCard";
import { allAreNull } from "../../helpers/nullCheck";

const KycCheckCard = () => {
  const bankStatus = useSelector((state) => state.bank.verifyStatus);
  const panStatus = useSelector((state) => state.pan.verifyStatus);
  const aadhaarStatus = useSelector((state) => state.aadhaar.verifyStatus);

  const message = [
    aadhaarStatus != "SUCCESS" ? "AADHAAR" : null,
    bankStatus != "SUCCESS" ? "BANK" : null,
    panStatus != "SUCCESS" ? "PAN" : null,
  ];

  return (
    <SafeAreaView>
      {!allAreNull(message) ? (
        <MessageCard
          title="Following pending steps need to be completed in order to receive advance salary."
          message={message}
        />
      ) : null}
    </SafeAreaView>
  );
};

export default KycCheckCard;
