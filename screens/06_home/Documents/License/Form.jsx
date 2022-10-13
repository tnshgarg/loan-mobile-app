import { SafeAreaView } from "react-native";
import { styles } from "../../../../styles";
import LicenseFormTemplate from "../../../../templates/license/Form";

export default LicenseForm = () => {
  return (
    <>
      <SafeAreaView style={[styles.container, { padding: 0 }]}>
        <LicenseFormTemplate />
      </SafeAreaView>
    </>
  );
};
