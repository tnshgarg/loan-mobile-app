import { Text } from "react-native";
import termsOfUse from "../../templates/docs/TermsOfUse";
import privacyPolicy from "../../templates/docs/PrivacyPolicy";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS } from "../../constants/Theme";
import TermsAndPrivacyModal from "../molecules/TermsAndPrivacyModal";

const AgreementText = ({
  isTermsOfUseModalVisible,
  setIsTermsOfUseModalVisible,
  isPrivacyModalVisible,
  setIsPrivacyModalVisible,
}) => {
  return (
    <>
      <Text style={styles.parentText}>
        By clicking “Verify” you are agreeing to Unipe’s{" "}
        <Text
          onPress={() => setIsTermsOfUseModalVisible(true)}
          style={styles.childText}
        >
          Terms of use
        </Text>{" "}
        and{" "}
        <Text
          onPress={() => setIsPrivacyModalVisible(true)}
          style={styles.childText}
        >
          Privacy Policy.
        </Text>
      </Text>
      {isTermsOfUseModalVisible && (
        <TermsAndPrivacyModal
          isVisible={isTermsOfUseModalVisible}
          setIsVisible={setIsTermsOfUseModalVisible}
          data={termsOfUse}
        />
      )}

      {isPrivacyModalVisible && (
        <TermsAndPrivacyModal
          isVisible={isPrivacyModalVisible}
          setIsVisible={setIsPrivacyModalVisible}
          data={privacyPolicy}
        />
      )}
    </>
  );
};

const styles = EStyleSheet.create({
  parentText: {
    marginVertical: "15rem",
    ...FONTS.body5,
    color: COLORS.gray,
    textAlign: "left",
  },
  childText: {
    ...FONTS.body5,
    color: COLORS.primary,
  },
});

export default AgreementText;
