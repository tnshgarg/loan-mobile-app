import { useState } from "react";
import { SafeAreaView, View } from "react-native";
import { useSelector } from "react-redux";
import MandateFormTemplate from "../../templates/mandate/Form";
import { styles } from "../../styles";
import TopTabNav from "../../navigators/TopTabNav";
import DetailsCard from "../../components/molecules/DetailsCard";

const Mandate = () => {
  const [time, setTime] = useState(false);

  const mandateSlice = useSelector((state) => state.mandate);
  const authType = mandateSlice.data?.authType;
  const verifyStatus = mandateSlice.verifyStatus;

  const cardData = () => {
    var res = [
      {
        subTitle: "Mandate Type",
        value: authType,
        fullWidth: true,
      },
      {
        subTitle: "Verify Status",
        value: verifyStatus,
      },
    ];
    return res;
  };

  if (verifyStatus === "SUCCESS") {
    setTimeout(() => {
      setTime(true); // why this setTimeOut
    }, 2000);
  }

  const tabs = [
    {
      name: "Mandate",
      component: MandateFormTemplate,
      initialParams: { type: "KYC" },
      disable: true,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {verifyStatus == "SUCCESS" && time ? (
        <View style={styles.container}>
          <DetailsCard data={cardData()} />
        </View>
      ) : (
        // <MandateFormTemplate type="KYC" />
        <TopTabNav tabs={tabs} hide={true} />
      )}
    </SafeAreaView>
  );
};

export default Mandate;
