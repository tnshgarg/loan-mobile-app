import { Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { useSelector } from "react-redux";
import { COLORS, FONTS } from "../../constants/Theme";
import { strings } from "../../helpers/Localization";
import { CMS_POLLING_DURATION } from "../../services/constants";
import { useGetCmsQuery } from "../../store/apiSlices/cmsApi";
import TermsAndPrivacyModal from "../molecules/TermsAndPrivacyModal";

const AgreementText = ({
  isTermsOfUseModalVisible,
  setIsTermsOfUseModalVisible,
  isPrivacyModalVisible,
  setIsPrivacyModalVisible,
}) => {
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const { data: cmsData, isLoading: cmsLoading } = useGetCmsQuery(
    unipeEmployeeId,
    {
      pollingInterval: CMS_POLLING_DURATION,
    }
  );

  return (
    <>
      <Text style={styles.parentText}>
        By clicking “Continue” you are agreeing to Unipe’s{" "}
        <Text
          onPress={() => setIsTermsOfUseModalVisible(true)}
          style={styles.childText}
        >
          {strings.termsAndConditions}
        </Text>{" "}
        and{" "}
        <Text
          onPress={() => setIsPrivacyModalVisible(true)}
          style={styles.childText}
        >
          {strings.privacyPolicy}
        </Text>
      </Text>
      {isTermsOfUseModalVisible && (
        <TermsAndPrivacyModal
          isVisible={isTermsOfUseModalVisible}
          setIsVisible={setIsTermsOfUseModalVisible}
          data={cmsData?.login_terms_of_use}
        />
      )}

      {isPrivacyModalVisible && (
        <TermsAndPrivacyModal
          isVisible={isPrivacyModalVisible}
          setIsVisible={setIsPrivacyModalVisible}
          data={cmsData?.login_privacy_policy}
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
