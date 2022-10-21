import { SafeAreaView, View } from "react-native";
import { useSelector } from "react-redux";
import DetailItem from "./DetailItem";
import TopTabNav from "../../navigators/TopTabNav";
import AadhaarFormTemplate from "../../templates/aadhaar/Form";
import AadhaarVerifyTemplate from "../../templates/aadhaar/Verify";
import AadhaarConfirmApi from "../../apis/aadhaar/Confirm";
import { styles } from "../../styles";

const Aadhaar = () => {
  const number = useSelector((state) => state.aadhaar.number);
  const data = useSelector((state) => state.aadhaar.data);
  const address = data?.address;
  const dob = data?.date_of_birth;
  const name = data?.name;
  const verifyStatus = useSelector((state) => state.aadhaar.verifyStatus);

  const dataDetails = [
    { label: "Full Name", value: name },
    { label: "Date of Birth", value: dob },
    { label: "Aadhaar Number", value: number },
    { label: "Address", value: address },
    { label: "Verify Status", value: verifyStatus },
  ];

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
    <SafeAreaView style={[styles.container, { padding: 0 }]}>
      {verifyStatus == "SUCCESS" ? (
        <View style={styles.container}>
          {dataDetails.map((item, index) => (
            <DetailItem
              key={index}
              label={item.label}
              value={item.value || "Not Provided"}
              divider={item?.divider ?? true}
            />
          ))}
        </View>
      ) : (
        <TopTabNav tabs={tabs} hide={true} />
      )}
    </SafeAreaView>
  );
};

export default Aadhaar;
