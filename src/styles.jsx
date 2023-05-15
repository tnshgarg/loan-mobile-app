import { COLORS, FONTS, SIZES } from "./constants/Theme";
import EStyleSheet from "react-native-extended-stylesheet";

export const styles = EStyleSheet.create({
  container: {
    backgroundColor: "$white",
    flex: 1,
    padding: "15rem",
  },
  safeContainer: {
    backgroundColor: "$white",
    flex: 1,
  },

  headline: {
    marginTop: "10rem",
    marginBottom: "5rem",
    ...FONTS.h2,
    color: COLORS.secondary,
    textAlign: "center",
    alignSelf: "center",
  },
  subHeadline: {
    //marginTop: "5rem",
    ...FONTS.body4,
    color: COLORS.black,
    textAlign: "center",
    alignSelf: "center",
    marginBottom: "5rem",
    // width: "85%",
  },
  btn: {
    marginTop: "20rem",
    width: "100%",
    height: SIZES.btnHeight,
    backgroundColor: COLORS.primary,
    borderRadius: 6,
  },
  btnText: {
    ...FONTS.h3,
    color: COLORS.white,
  },
  ButtonContainer: {
    width: "100%",
    height: "100%",
  },
  termsText: {
    ...FONTS.body5,
    color: COLORS.primary,
  },
  card: {
    padding: 10,
    borderWidth: 0.5,
    borderColor: COLORS.lightgray_01,
    borderRadius: 5,
    elevation: 2,
    backgroundColor: COLORS.white,
  },
  warningHeader: {
    color: COLORS.warning,
    ...FONTS.h3,
    alignSelf: "center",
    textAlign: "center",
    marginTop: "5%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: "15rem",
  },
  col: {
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    marginVertical: "10rem",
  },
});

export const progressBar = EStyleSheet.create({
  progressView: {
    marginTop: "20rem",
  },
  progressBar: {
    width: "100%",
    color: COLORS.primary,
  },
});

export const form = EStyleSheet.create({
  formLabel: {
    marginTop: "30rem",
    color: COLORS.gray,
    ...FONTS.body4,
  },
  OtpAwaitMsg: {
    color: COLORS.secondary,
    alignSelf: "center",
    textAlign: "center",
    marginTop: "20rem",
    ...FONTS.body3,
  },
  userData: {
    color: COLORS.secondary,
    marginLeft: "30rem",
    marginTop: "10rem",
    ...FONTS.body3,
  },
  yesButton: {
    flex: 1,
    height: SIZES.btnHeight,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "5rem",
  },
  noButton: {
    flex: 1,
    height: SIZES.btnHeight,
    backgroundColor: null,
    borderWidth: 1.5,
    borderColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
    marginRight: "5rem",
  },
  aadharimg: {
    alignSelf: "center",
    marginTop: "20rem",
    width: SIZES.width * 0.3,
    height: SIZES.width * 0.3,
  },

  forgotText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  year: {
    height: "40rem",
    width: "40rem",
    textAlign: "center",
    borderBottomWidth: 1,
    ...FONTS.body4,
  },
  monthday: {
    height: "40rem",
    width: "40rem",
    textAlign: "center",
    borderBottomWidth: 1,
    ...FONTS.body4,
  },
  hypenView: { width: "30rem", alignSelf: "center" },
  hypen: { alignSelf: "center", ...FONTS.h1 },
  formatmsg: {
    color: COLORS.warning,
    ...FONTS.body4,
  },
});

export const checkBox = EStyleSheet.create({
  checkBox: {
    marginTop: "30rem",
  },
  checkBoxText: {
    marginLeft: "10rem",
    marginRight: "40rem",
    marginTop: "30rem",
    color: COLORS.gray,
    ...FONTS.body5,
  },
  padding: {
    marginTop: "30rem",
  },
});

export const bankform = EStyleSheet.create({
  formatmsg: {
    color: COLORS.warning,
    ...FONTS.body4,
  },
  padding: {
    marginTop: "30rem",
  },
  subTitle: {
    marginTop: "20rem",
    color: COLORS.black,
    ...FONTS.h3,
    alignSelf: "center",
  },
});

export const selfie = EStyleSheet.create({
  selfie: {
    alignSelf: "center",
    height: "100%",
    borderRadius: 10,
  },
});

export const license = EStyleSheet.create({
  authority: {
    color: COLORS.primary,
    marginLeft: "20rem",
    ...FONTS.body4,
  },
  valid: {
    color: "green",
    marginLeft: "10rem",
    ...FONTS.body4,
  },
  invalid: {
    color: "red",
    marginLeft: "20rem",
    ...FONTS.body4,
  },
});

export const ewa = EStyleSheet.create({
  checkBox: {
    marginTop: "10rem",
  },
  checkBoxText: {
    marginRight: "40rem",
    marginTop: "10rem",
    color: COLORS.gray,
    ...FONTS.body5,
  },
});

export const dev = EStyleSheet.create({
  btn: {
    alignSelf: "center",
    marginTop: "20rem",
    width: "60%",
    height: "40rem",
    backgroundColor: COLORS.primary,
  },
});

export const onboardingStyles = EStyleSheet.create({
  curvedBox: {
    height: "32rem",
    width: "32rem",
    backgroundColor: COLORS.primary,
    borderTopRightRadius: "10rem",
    borderBottomRightRadius: "10rem",
    marginRight: "10rem",
    marginLeft: "-20rem",
  },
  alertBox: {
    backgroundColor: "rgba(255, 193, 33, 0.33)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: "15rem",
    marginTop: "15rem",
    borderRadius: "10rem",
  },
});

export const moneyStyles = EStyleSheet.create({
  percentageTitle: {
    ...FONTS.body5,
    marginTop: "25%",
    color: COLORS.gray,
    alignSelf: "center",
    fontSize: 8,
  },
});

export const accountStyles = EStyleSheet.create({
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: "15rem",
    borderBottomWidth: 0.8,
    borderColor: COLORS.lightGray,
  },
  guestIcon: {
    width: "60rem",
    height: "60rem",
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  userImage: {
    width: "60rem",
    height: "60rem",
    resizeMode: "contain",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  userTitle: {
    ...FONTS.h4,
    color: COLORS.black,
    marginLeft: "15rem",
  },
});

export const investStyles = EStyleSheet.create({
  title: {
    ...FONTS.body4,
    color: COLORS.black,
    marginTop: "10rem",
  },
  subtitle: {
    ...FONTS.body2,
    color: COLORS.black,
    marginBottom: "10rem",
  },
  description: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginTop: "10rem",
    width: "70%",
  },
  underlineText: {
    ...FONTS.body4,
    color: COLORS.primary,
    textDecorationLine: "underline",
  },
});

export const stepIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: COLORS.primary,
  stepStrokeWidth: 3,
  separatorStrokeFinishedWidth: 4,
  stepStrokeFinishedColor: COLORS.primary,
  stepStrokeUnFinishedColor: COLORS.lightGray,
  separatorFinishedColor: COLORS.primary,
  separatorUnFinishedColor: COLORS.lightGray,
  stepIndicatorFinishedColor: COLORS.primary,
  stepIndicatorUnFinishedColor: COLORS.white,
  stepIndicatorCurrentColor: COLORS.white,
  stepIndicatorLabelFontSize: SIZES.body3,
  currentStepIndicatorLabelFontSize: SIZES.body3,
  stepIndicatorLabelCurrentColor: COLORS.primary,
  stepIndicatorLabelFinishedColor: COLORS.primary,
  stepIndicatorLabelUnFinishedColor: COLORS.lightGray,
  labelColor: COLORS.gray,
  labelSize: SIZES.body4,
  currentStepLabelColor: COLORS.primary,
  labelAlign: "flex-start",
  labelFontFamily: "Montserrat-Regular",
};
