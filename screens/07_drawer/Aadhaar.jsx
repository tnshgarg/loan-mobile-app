import { Alert, View } from "react-native";
import { useSelector } from "react-redux";
import PrimaryButton from "../../components/PrimaryButton";
import AadhaarDataCollection from "../../templates/Aadhaar/AadhaarDataCollection";
import DetailItem from "./DetailItem";
import TopTabNav from "../../components/TopTabNav";
import AadhaarOtpVerify from "../../templates/Aadhaar/AadhaarOtpVerify";
import Confirm from "../../apis/aadhaar/Confirm";
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
    { label: "Verify Status", value: verifyStatus, divider: false },
  ];

  const tabs = [
    {
      name: "Aadhaar Form",
      component: AadhaarDataCollection,
      initialParams: { type: "KYC" },
      disable: true,
    },
    {
      name: "Verify",
      component: AadhaarOtpVerify,
      initialParams: { type: "KYC" },
      disable: true,
    },

    {
      name: "Confirm",
      component: Confirm,
      initialParams: { type: "KYC" },
      disable: true,
    },
  ];

  return (
    <View style={styles.container}>
      {verifyStatus == "SUCCESS" ? (
        <>
          {dataDetails.map((item, index) => (
            <DetailItem
              key={index}
              label={item.label}
              value={item.value || "Not Provided"}
              divider={item?.divider??true}
            />
          ))}

          <View
            style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 20 }}
          >
            <PrimaryButton
              style={{ marginTop: 20 }}
              title="Update"
              onPress={() =>
                Alert.alert(
                  "The Aadhaar Details are not editable, please ask your employer to update"
                )
              }
            />
          </View>
        </>
      ) : (
        <TopTabNav tabs={tabs} hide={true} />
      )}
    </View>
  );
};

export default Aadhaar;
