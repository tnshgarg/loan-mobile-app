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
  logo: {
    alignSelf: "center",
    width: "auto",
    height: "auto",
  },
  headline: {
    marginTop: "20rem",
    ...FONTS.h3,
    color: COLORS.black,
    textAlign: "center",
  },
  resendText: {
    color: COLORS.primary,
    alignSelf: "center",
    marginTop: "20rem",
    ...FONTS.h3,
    textDecorationLine: "underline",
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
  flexrow: {
    flexDirection: "row",
  },
  otpback: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 99,
  },
  dataUseText: {
    marginTop: "20rem",
    ...FONTS.body4,
    color: COLORS.gray,
    textAlign: "center",
  },
  termsText: {
    fontWeight: "bold",
    color: COLORS.primary,
  },
  otpreadtxt: {
    marginTop: "20rem",
    color: COLORS.gray,
    ...FONTS.h4,
    textAlign: "center",
  },
  card: {
    padding: 10,
    borderWidth: 0.5,
    borderColor: COLORS.lightgray_01,
    borderRadius: 5,
    elevation: 2,
    backgroundColor: COLORS.white,
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
  formHeader: {
    marginTop: "10rem",
    color: COLORS.black,
    ...FONTS.h3,
    textAlign: "center",
  },
  formLabel: {
    marginTop: "30rem",
    color: COLORS.gray,
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
    backgroundColor: COLORS.primaryBackground,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "10rem",
  },
  noButton: {
    flex: 1,
    width: SIZES.width / 2.5,
    height: SIZES.btnHeight,
    backgroundColor: COLORS.warningBackground,
    alignItems: "center",
    justifyContent: "center",
    marginRight: "10rem",
  },
  aadharimg: {
    alignSelf: "center",
    marginTop: "20rem",
    width: SIZES.width * 0.6,
    height: SIZES.width * 0.6,
  },

  forgotText: {
    marginTop: "10rem",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  year: {
    height: "40rem",
    width: "40rem",
    textAlign: "center",
    borderBottomWidth: 1,
  },
  monthday: {
    height: "40rem",
    width: "40rem",
    textAlign: "center",
    borderBottomWidth: 1,
  },
  hypenView: { width: "30rem", alignSelf: "center" },
  hypen: { alignSelf: "center", ...FONTS.h1 },
});

export const checkBox = EStyleSheet.create({
  checkBox: {
    marginTop: "30rem",
  },
  checkBoxText: {
    marginLeft: "10rem",
    marginRight: "40rem",
    marginTop: "30rem",
    fontSize: 14,
    color: COLORS.gray,
    ...FONTS.body4,
  },
  padding: {
    marginTop: "30rem",
  },
});

export const bankform = EStyleSheet.create({
  formtitle: {
    marginTop: "20rem",
    color: COLORS.gray,
    ...FONTS.body4,
  },
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
  asterisk: { fontWeight: "bold", color: COLORS.primary },
});

export const nav = EStyleSheet.create({
  navbar: {
    height: 80,
  },
});

export const Camera = EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLORS.black,
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  capture: {
    flex: 0,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    padding: "15rem",
    paddingHorizontal: "20rem",
    alignSelf: "center",
    marginTop: "450rem",
  },
  wait: {
    flex: 1,
    width: "100%",
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    flex: 1,
  },
  buttonText: {
    ...FONTS.body3,
    color: COLORS.white,
  },
  back: {
    backgroundColor: "rgba(78, 70, 241, 0.9)",
    borderRadius: 30,
    padding: "10rem",
    alignSelf: "center",
    marginTop: "10rem",
    marginLeft: "-300rem",
  },
  cameraButton: {
    marginLeft: "30rem",
    marginTop: "20rem",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: "30rem",
  },
  previewImage: {
    height: 200,
    width: "100%",
  },
});

export const welcome = EStyleSheet.create({
  steps: { alignSelf: "center", flex: 1 },
});

export const selfie = EStyleSheet.create({
  uploadButton: {
    marginTop: "20rem",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: "30rem",
  },
  cameraButton: {
    marginLeft: "60rem",
    marginTop: "20rem",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: "30rem",
  },
  selfieContainer: {
    marginTop: "20rem",
    width: "100%",
    height: SIZES.width * 0.6,
    backgroundColor: COLORS.lightgray_01,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  selfie: {
    alignSelf: "center",
    height: "100%",
    borderRadius: 10,
  },
});

export const esic = EStyleSheet.create({
  CollapseTitle: {
    marginTop: "20rem",
    color: COLORS.primary,
    ...FONTS.body4,
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
  padding: {
    marginTop: "10rem",
  },
  loanCard: {
    marginTop: "20rem",
    alignSelf: "center",
    width: "100%",
    backgroundColor: COLORS.lightgray_01,
    padding: "15rem",
    borderRadius: 10,
  },
  successImg: {
    alignSelf: "center",
    height: "43%",
    width: "100%",
    marginTop: "-8%",
  },
  checkBox: {
    marginTop: "10rem",
  },
  checkBoxText: {
    marginRight: "40rem",
    marginTop: "10rem",
    color: COLORS.gray,
  },
});

export const card = EStyleSheet.create({
  alertCard: {
    marginTop: "20rem",
    padding: "rem",
    flexDirection: "column",
  },
  infoText: {
    ...FONTS.body3,
  },
  alertText: {
    color: COLORS.black,
    ...FONTS.h4,
    textDecorationLine: "underline",
    paddingLeft: "10rem",
    paddingTop: "10rem",
  },
});

export const datacard = EStyleSheet.create({
  card: {
    alignSelf: "center",
    marginTop: "3%",
    padding: "3%",
    width: "95%",
    borderRadius: 5,
    flexDirection: "row",
    backgroundColor: "rgba(228, 238, 240, 0.4)",
    justifyContent: "space-between",
  },
  cardTitle: {
    ...FONTS.body3,
    color: COLORS.secondary,
  },
});

export const dev = EStyleSheet.create({
  title: {
    alignSelf: "center",
    marginTop: "20rem",
    width: "60%",
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
};
