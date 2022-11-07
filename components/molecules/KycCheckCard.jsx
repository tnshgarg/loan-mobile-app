import { SafeAreaView, Text } from "react-native";
import { useSelector } from "react-redux";
import MessageCard from "../atoms/MessageCard";
import { allAreNull } from "../../helpers/nullCheck";

const KycCheckCard = () => {
  const bankStatus = useSelector((state) => state.bank.verifyStatus);
  const panStatus = useSelector((state) => state.pan.verifyStatus);
  const aadhaarStatus = useSelector((state) => state.aadhaar.verifyStatus);
  const mandateStatus = useSelector((state) => state.mandate.verifyStatus);

  const message = [
    aadhaarStatus != "SUCCESS" ? "AADHAAR" : null,
    bankStatus != "SUCCESS" ? "BANK" : null,
    mandateStatus != "SUCCESS" ? "MANDATE" : null,
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
