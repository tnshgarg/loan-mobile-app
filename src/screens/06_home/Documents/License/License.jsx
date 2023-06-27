import { Alert, SafeAreaView, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import PrimaryButton from "../../../../components/atoms/PrimaryButton";
import DetailItem from "../../../../components/molecules/DetailItem";
import TopTabNav from "../../../../navigators/TopTabNav";
import { checkBox, license, styles } from "../../../../styles";

import { strings } from "../../../../helpers/Localization";
import Confirm from "./Confirm";
import Form from "./Form";

const License = () => {
  const data = useSelector((state) => state.license.data);
  const number = useSelector((state) => state.license.number);

  const licenseSlice = useSelector((state) => state.license);
  const verifyStatus = licenseSlice?.verifyStatus;

  const dataDetails = [
    { label: "Number", value: number },
    { label: "Name", value: data?.name },
    { label: "DOB", value: data?.date_of_birth },
    { label: "Blood Group", value: data?.blood_group || "NA" },
  ];

  const isDateValid = (expiry_date) => {
    return new Date(expiry_date) > new Date();
  };

  const tabs = [
    {
      name: "Form",
      component: Form,
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
    <SafeAreaView style={styles.safeContainer}>
      {verifyStatus == "SUCCESS" ? (
        <ScrollView>
          <View style={styles.card}>
            {dataDetails.map((item, index) => (
              <DetailItem
                key={index}
                label={item.label}
                value={item.value || "Not Provided"}
                divider={item?.divider ?? true}
              />
            ))}
            {data?.validity?.non_transport ? (
              <>
                <DetailItem
                  label="Expiry date"
                  value={data?.validity?.non_transport?.expiry_date}
                  divider={false}
                />
                <View style={{ flexDirection: "row" }}>
                  <Text style={license.authority}>{strings.nonTransport}</Text>
                  {isDateValid(data?.validity?.non_transport?.expiry_date) ? (
                    <Text style={license.valid}>{strings.valid}</Text>
                  ) : (
                    <Text style={license.invalid}>{strings.invalid}</Text>
                  )}
                </View>
              </>
            ) : null}

            {data?.validity?.transport ? (
              <>
                <DetailItem
                  label="Expiry date"
                  value={data?.validity?.transport?.expiry_date}
                  divider={true}
                />
                <View style={{ flexDirection: "row" }}>
                  <Text style={license.authority}>{strings.transport}</Text>
                  {isDateValid(data?.validity?.transport?.expiry_date) ? (
                    <Text style={license.valid}>{strings.valid}</Text>
                  ) : (
                    <Text style={license.invalid}>{strings.invalid}</Text>
                  )}
                </View>
              </>
            ) : null}
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              paddingBottom: 20,
            }}
          >
            <PrimaryButton
              containerStyle={{ marginTop: 20 }}
              title="Update"
              onPress={() =>
                Alert.alert(
                  "The License Details are not editable, please ask your employer to update"
                )
              }
            />
          </View>
          <View style={checkBox.padding}></View>
        </ScrollView>
      ) : (
        <TopTabNav tabs={tabs} hide={true} />
      )}
    </SafeAreaView>
  );
};

export default License;
