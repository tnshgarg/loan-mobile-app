import { COLORS, FONTS, SIZES } from "./constants/Theme";
import EStyleSheet from "react-native-extended-stylesheet";

export const styles = EStyleSheet.create({
  container: {
    backgroundColor: "$white",
    flex: 1,
    padding: "3%",
  },
  safeContainer: {
    backgroundColor: "$white",
    flex: 1,
  },
  logo: {
    alignSelf: "center",
    // marginTop: "10%",
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
    height: 50,
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
    backgroundColor: COLORS.white,
    width: 50,
    borderRadius: 40,
    marginTop: "20rem",
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

export const buttons = EStyleSheet.create({
  ContinueButton: {
    padding: 10,
    alignSelf: "center",
    marginTop: 50,
    width: 320,
    height: 60,
    fontSize: 20,
  },
  FAB: {
    backgroundColor: COLORS.primary,
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
  progressNos: {
    marginLeft: 8,
    marginTop: -3,
    color: COLORS.gray,
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
  formTextInput: {
    width: "100%",
    height: 50,
    borderBottomWidth: 1,
  },
  picker: {
    marginLeft: 34,
    width: "79%",
    borderBottomWidth: 1,
  },
  chosenButton: {
    padding: 2,
    marginTop: "20rem",
    width: 140,
    height: 40,
    fontSize: 20,
  },
  choiceButton: {
    padding: 2,

    marginTop: "20rem",
    width: 140,
    height: 40,
    fontSize: 20,
    backgroundColor: COLORS.gray,
  },
  nextButton: {
    padding: 5,
    alignSelf: "center",
    marginTop: "20rem",
    width: "100%",
    height: 50,
    fontSize: 20,
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
    marginLeft: 55,
    marginTop: "10rem",
    ...FONTS.body3,
  },
  aadharConfirmText: {
    color: COLORS.secondary,
    marginLeft: 69,
    marginTop: "10rem",
    ...FONTS.body3,
  },
  yesButton: {
    flex: 1,
    height: 50,
    backgroundColor: COLORS.primaryBackground,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  noButton: {
    flex: 1,
    width: SIZES.width / 2.5,
    height: 50,
    backgroundColor: COLORS.warningBackground,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  aadharimg: {
    alignSelf: "center",
    marginTop: "20rem",
    width: 200,
    height: 200,
  },
  aadhaarOr: {
    marginBottom: 20,
    marginTop: "20rem",
    alignSelf: "center",
    ...FONTS.body3,
  },
  AadharLinkedStatus: {
    marginTop: "30rem",
    alignSelf: "center",
    color: COLORS.primary,
    width: 300,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  forgotText: {
    marginTop: "10rem",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  year: {
    height: 40,
    width: 40,
    textAlign: "center",
    borderBottomWidth: 1,
  },
  monthday: {
    height: 40,
    width: 40,
    textAlign: "center",
    borderBottomWidth: 1,
  },
  hypenView: { width: 30, alignSelf: "center" },
  hypen: { alignSelf: "center", fontSize: 30 },
});

export const checkBox = EStyleSheet.create({
  checkBox: {
    marginTop: "30rem",
  },
  checkBoxText: {
    marginLeft: 10,
    marginRight: 40,
    marginTop: "30rem",
    fontSize: 14,
    color: "#828282",
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
  formInput: {
    width: "100%",
    height: 40,
    borderBottomWidth: 1,
  },
  nextButton: {
    padding: 10,
    alignSelf: "center",
    marginTop: "40rem",
    width: 320,
    height: 60,
    fontSize: 20,
  },
  padding: {
    marginTop: "30rem",
  },
  infoCard: {
    backgroundColor: "rgba(78, 70, 241, 0.1)",
    width: "100%",
    marginLeft: 30,
    marginTop: "20rem",
    padding: 10,
    flex: 0,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  infoText: {
    width: "93%",
    color: COLORS.darkGray,
    paddingLeft: 7,
  },
  Maintitle: {
    marginLeft: 30,
    marginTop: "10rem",
    color: COLORS.black,
    fontSize: 18,
    fontFamily: "Roboto",
  },
  subTitle: {
    marginTop: "20rem",
    color: COLORS.black,
    ...FONTS.h3,
    alignSelf: "center",
  },
  asterisk: { fontWeight: "bold", color: COLORS.primary },
});

export const homeCard = EStyleSheet.create({
  card: {
    marginTop: "20rem",
    width: 170,
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 10,
  },
  title: {
    ...FONTS.h3,
  },
  subtitle: {
    ...FONTS.body4,
  },
  downloadIcon: {
    marginTop: "30rem",
    color: COLORS.primary,
  },
  downloadText: {
    marginTop: "30rem",
    ...FONTS.h4,
    color: COLORS.primary,
  },
});

export const nav = EStyleSheet.create({
  titleLogo: {
    width: 160,
    height: 80,
  },
  navbar: {
    height: 80,
  },
});

export const docSearch = EStyleSheet.create({
  searchBar: {
    marginLeft: 20,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  searchIcon: {
    marginTop: "20rem",
  },
  searchInput: {
    width: 320,
    borderBottomWidth: 2,
    textAlignVertical: "center",
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
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    marginTop: 450,
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
    fontSize: 16,
    color: COLORS.white,
  },
  back: {
    backgroundColor: "rgba(78, 70, 241, 0.9)",
    borderRadius: 30,
    padding: 10,
    alignSelf: "center",
    marginTop: "10rem",
    marginLeft: -300,
  },
  cameraButton: {
    marginLeft: 30,
    marginTop: "20rem",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 30,
  },
  previewImage: {
    height: 200,
    width: "100%",
  },
});

export const welcome = EStyleSheet.create({
  title: {
    marginTop: "20rem",
    color: COLORS.black,
    ...FONTS.body4,
  },
  mainTitle: {
    marginTop: "20rem",
    marginLeft: 30,
    color: COLORS.black,
    ...FONTS.h2,
  },
  subTitle: {
    alignSelf: "center",
    color: COLORS.black,
    ...FONTS.h3,
    textAlign: "center",
  },
  steps: { alignSelf: "center", flex: 1 },
});

export const selfie = EStyleSheet.create({
  uploadButton: {
    marginTop: "20rem",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 30,
  },
  cameraButton: {
    marginLeft: 60,
    marginTop: "20rem",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 30,
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
    marginLeft: "20%",
    ...FONTS.body4,
  },
  valid: {
    color: "green",
    marginLeft: "10%",
    ...FONTS.body4,
  },
  invalid: {
    color: "red",
    marginLeft: "20%",
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
    paddingVertical: "4%",
    paddingHorizontal: "3%",
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
    marginRight: 40,
    marginTop: "10rem",
    color: COLORS.gray,
  },
});

export const card = EStyleSheet.create({
  alertCard: {
    marginTop: "20rem",
    padding: 10,
    flexDirection: "column",
  },
  infoText: {
    fontSize: 16,
  },
  alertText: {
    color: COLORS.black,
    ...FONTS.h4,
    textDecorationLine: "underline",
    paddingLeft: 10,
    paddingTop: 10,
  },
});

export const datacard = EStyleSheet.create({
  card: {
    alignSelf: "center",
    marginTop: "3%",
    padding: "3%",
    width: "95%",
    borderRadius: 4,
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
