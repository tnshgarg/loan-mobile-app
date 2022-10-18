import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "./constants/Theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    padding: "1%",
  },
  logo: {
    alignSelf: "center",
    // marginTop: "10%",
    width: "auto",
    height: "auto",
  },
  headline: {
    marginTop: 30,
    ...FONTS.h3,
    color: COLORS.black,
    textAlign: "center",
  },
  fieldLabel: {
    ...FONTS.body4,
    marginTop: 60,
    color: COLORS.black,
  },
  textInput: {
    width: "100%",
    height: 50,
    borderBottomWidth: 1,
  },
  resendText: {
    color: COLORS.primary,
    alignSelf: "center",
    marginTop: 30,
    ...FONTS.h3,
    textDecorationLine: "underline",
  },
  otpInput: {
    alignSelf: "center",
    marginTop: 40,
    width: "49%",
    height: 50,
    borderBottomWidth: 1,
  },
  ContinueButton: {
    alignSelf: "center",
    marginTop: 20,
    width: 320,
    height: 60,
    fontSize: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 6,
  },
  PrimaryButton: {
    alignSelf: "center",
    marginTop: 20,
    width: "100%",
    height: 60,
    fontSize: 20,
  },
  btn: {
    marginTop: 20,
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

    marginTop: 20,
  },
  dataUseText: {
    marginTop: 20,
    ...FONTS.body4,
    color: COLORS.gray,
    textAlign: "center",
  },
  termsText: {
    fontWeight: "bold",
    color: COLORS.primary,
  },
  otpreadtxt: {
    marginTop: 20,
    color: COLORS.gray,
    ...FONTS.h4,
    textAlign: "center",
  },
  LoadingButton: {
    padding: 10,
    alignSelf: "center",
    marginTop: 20,
    width: 320,
    height: 60,
    fontSize: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 6,
  },
});

export const buttons = StyleSheet.create({
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

export const progressBar = StyleSheet.create({
  progressView: {
    marginTop: 20,
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

export const form = StyleSheet.create({
  formHeader: {
    marginTop: 10,
    color: COLORS.black,
    ...FONTS.h3,
    textAlign: "center",
  },
  formLabel: {
    marginTop: 30,
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

    marginTop: 20,
    width: 140,
    height: 40,
    fontSize: 20,
  },
  choiceButton: {
    padding: 2,

    marginTop: 20,
    width: 140,
    height: 40,
    fontSize: 20,
    backgroundColor: COLORS.gray,
  },
  nextButton: {
    padding: 5,
    alignSelf: "center",
    marginTop: 20,
    width: "100%",
    height: 50,
    fontSize: 20,
  },
  OtpAwaitMsg: {
    color: COLORS.secondary,
    alignSelf: "center",
    textAlign: "center",
    marginTop: 20,
    ...FONTS.body3,
  },
  userData: {
    color: COLORS.secondary,
    marginLeft: 55,
    marginTop: 10,
    ...FONTS.body3,
  },
  aadharConfirmText: {
    color: COLORS.secondary,
    marginLeft: 69,
    marginTop: 10,
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
    marginTop: 20,
    width: 200,
    height: 200,
  },
  aadhaarOr: {
    marginBottom: 20,
    marginTop: 20,
    alignSelf: "center",
    ...FONTS.body3,
  },
  AadharLinkedStatus: {
    marginTop: 30,
    alignSelf: "center",
    color: COLORS.primary,
    width: 300,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  forgotText: {
    marginTop: 10,
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

export const checkBox = StyleSheet.create({
  checkBox: {
    marginTop: 30,
  },
  checkBoxText: {
    marginLeft: 10,
    marginRight: 40,
    marginTop: 30,
    fontSize: 14,
    color: "#828282",
  },
  padding: {
    marginTop: 30,
  },
});

export const bankform = StyleSheet.create({
  formtitle: {
    marginTop: 20,
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
    marginTop: 40,
    width: 320,
    height: 60,
    fontSize: 20,
  },
  padding: {
    marginTop: 30,
  },
  infoCard: {
    backgroundColor: "rgba(78, 70, 241, 0.1)",
    width: "100%",
    marginLeft: 30,
    marginTop: 20,
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
    marginTop: 10,
    color: COLORS.black,
    fontSize: 18,
    fontFamily: "Roboto",
  },
  subTitle: {
    marginTop: 20,
    color: COLORS.black,
    ...FONTS.h3,
    alignSelf: "center",
  },
  asterisk: { fontWeight: "bold", color: COLORS.primary },
});

export const homeCard = StyleSheet.create({
  card: {
    marginTop: 20,
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
    marginTop: 30,
    color: COLORS.primary,
  },
  downloadText: {
    marginTop: 30,
    ...FONTS.h4,
    color: COLORS.primary,
  },
});

export const nav = StyleSheet.create({
  titleLogo: {
    width: 160,
    height: 80,
  },
  navbar: {
    height: 80,
  },
});

export const docSearch = StyleSheet.create({
  searchBar: {
    marginLeft: 20,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  searchIcon: {
    marginTop: 20,
  },
  searchInput: {
    width: 320,
    borderBottomWidth: 2,
    textAlignVertical: "center",
  },
});
export const Camera = StyleSheet.create({
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
    marginTop: 10,
    marginLeft: -300,
  },
  cameraButton: {
    marginLeft: 30,
    marginTop: 20,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 30,
  },
  previewImage: {
    height: 200,
    width: "100%",
  },
});

export const welcome = StyleSheet.create({
  title: {
    marginTop: 20,
    color: COLORS.black,
    ...FONTS.body4,
  },
  mainTitle: {
    marginTop: 20,
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

export const selfie = StyleSheet.create({
  uploadButton: {
    marginTop: 20,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 30,
  },
  cameraButton: {
    marginLeft: 60,
    marginTop: 20,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 30,
  },
  selfieContainer: {
    marginTop: 20,
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

export const esic = StyleSheet.create({
  CollapseTitle: {
    marginTop: 20,
    color: COLORS.primary,
    ...FONTS.body4,
  },
});

export const license = StyleSheet.create({
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

export const ewa = StyleSheet.create({
  padding: {
    marginTop: 10,
  },
  loanCard: {
    marginTop: 20,
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
    marginTop: 10,
  },
  checkBoxText: {
    marginRight: 40,
    marginTop: 10,
    color: COLORS.gray,
  },
});

export const card = StyleSheet.create({
  alertCard: {
    marginTop: 20,
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

export const datacard = StyleSheet.create({
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

export const dev = StyleSheet.create({
  title: {
    alignSelf: "center",
    marginTop: 20,
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
