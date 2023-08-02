import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { useDispatch, useSelector } from "react-redux";
import { COLORS, FONTS } from "../../constants/Theme";
import { navigationHelper } from "../../helpers/CmsNavigationHelper";
import {
  InteractionTypes,
  trackEvent,
} from "../../helpers/analytics/commonAnalytics";
import { useSurveySubmissionMutation } from "../../store/apiSlices/cmsApi";
import { cmsFormData, cmsFormProgress } from "../../store/slices/cmsSlice";
import PrimaryButton from "../atoms/PrimaryButton";

const CmsMcq = ({
  children,
  survey_id,
  question_id,
  stepNo,
  totalQues,
  quesNo,
  quesTitle,
}) => {
  const safeChildren = children || [];
  const dispatch = useDispatch();
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const formAnswer = useSelector(
    (state) => state?.cmsForms?.[survey_id]?.[question_id] ?? ""
  );

  const formData = useSelector((state) => state?.cmsForms?.[survey_id]);
  const [surveySubmission] = useSurveySubmissionMutation();

  console.log({ formData });

  useEffect(() => {}, []);

  const onSubmitForm = () => {
    let data = {
      unipeEmployeeId: unipeEmployeeId,
      language: "en",
      contentType: `survey-${survey_id}`,
      content: { ...formData },
    };
    surveySubmission(data)
      .unwrap()
      .then((res) => {
        console.log("cms/survey-submission res: ", res);
        const responseJson = res?.data;
        trackEvent({
          interaction: InteractionTypes.BUTTON_PRESS,
          screen: "requestProcessed",
          action: "SUCCESS",
        });
        console.log("cms/survey-submission responseJson: ", responseJson);
        navigationHelper({
          type: "cms",
          params: { blogKey: "survey_done" },
        });
      })
      .catch((error) => {
        trackEvent({
          interaction: InteractionTypes.BUTTON_PRESS,
          screen: "requestProcessed",
          action: "ERROR",
        });
        console.log("cms/survey-submission error:", error);
      });
    // .finally(() => {
    //   backAction();
    // });
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ ...FONTS.h3, color: COLORS.black }}>{quesNo}</Text>
      <Text style={{ ...FONTS.body2, color: COLORS.black, marginTop: "5%" }}>
        {quesTitle}
      </Text>
      <View style={{ flexGrow: 1 }}>
        {safeChildren?.map((child, index) => (
          <TouchableOpacity
            style={{
              width: "100%",
              borderWidth: 1,
              borderColor:
                child?.answer_id == formAnswer ? COLORS.primary : COLORS.gray,
              padding: "6%",
              marginTop: "5%",
              borderRadius: 10,
              backgroundColor: "#fff",
            }}
            key={index}
            onPress={() => {
              dispatch(
                cmsFormData({
                  formId: survey_id,
                  key: question_id,
                  value: child?.answer_id,
                })
              );
            }}
          >
            {child.element(child)}
          </TouchableOpacity>
        ))}
      </View>

      <PrimaryButton
        title={totalQues - 1 == stepNo ? "Submit" : "Next"}
        containerStyle={{ width: "100%", marginTop: "10%" }}
        disabled={!formAnswer}
        onPress={() =>
          totalQues - 1 == stepNo
            ? onSubmitForm()
            : dispatch(
                cmsFormProgress({ formId: survey_id, value: stepNo + 1 })
              )
        }
      />
    </View>
  );
};

export default CmsMcq;

const styles = EStyleSheet.create({
  container: {
    padding: "5%",
    width: "100%",
    // backgroundColor: "#fff",
  },

  childContainer: {
    paddingLeft: "15rem",
  },
  title: {
    color: "white",
    ...FONTS.h3,
  },
  cta: {
    color: "#CBD987",
    ...FONTS.body5,
    paddingTop: "2rem",
  },
});
