import { SafeAreaView, View } from "react-native";
import { useSelector } from "react-redux";
import TopTabNav from "../../../navigators/TopTabNav";
import AadhaarFormTemplate from "../../../templates/aadhaar/Form";
import AadhaarVerifyTemplate from "../../../templates/aadhaar/Verify";
import AadhaarConfirmApi from "../../../apis/aadhaar/Confirm";
import { styles } from "../../../styles";
import DetailsCard from "../../../components/molecules/DetailsCard";

const Aadhaar = () => {
  const number = useSelector((state) => state.aadhaar.number);
  const data = useSelector((state) => state.aadhaar.data);
  const verifyStatus = useSelector((state) => state.aadhaar.verifyStatus);

  const cardData = () => {
    var res = [
      { subTitle: "Name", value: data?.name, fullWidth: true },
      { subTitle: "Number", value: number },
      { subTitle: "Gender", value: data?.gender },
      { subTitle: "Date of Birth", value: data?.date_of_birth },
      { subTitle: "Address", value: data?.address, fullWidth: true },
      { subTitle: "Verify Status", value: verifyStatus },
    ];
    return res;
  };

  const tabs = [
    {
      name: "Aadhaar Form",
      component: AadhaarFormTemplate,
      initialParams: { type: "KYC" },
      disable: true,
    },
    {
      name: "Verify",
      component: AadhaarVerifyTemplate,
      initialParams: { type: "KYC" },
      disable: true,
    },

    {
      name: "Confirm",
      component: AadhaarConfirmApi,
      initialParams: { type: "KYC" },
      disable: true,
    },
  ];

  return (
    <SafeAreaView style={styles.safeContainer}>
      {verifyStatus == "SUCCESS" ? (
        <View style={styles.container}>
          <DetailsCard
            data={cardData()}
            imageUri={{
              uri: `data:image/jpeg;base64,${data["photo_base64"]}`,
              cache: "only-if-cached",
            }}
          />
        </View>
      ) : (
        <TopTabNav tabs={tabs} hide={true} />
      )}
    </SafeAreaView>
  );
};

export default Aadhaar;
