import { useState } from "react";
import { Text, TouchableNativeFeedback, View, Linking} from "react-native";
import codePush from "react-native-code-push";
import EStyleSheet from "react-native-extended-stylesheet";
import Modal from "react-native-modal";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { COLORS, FONTS, SIZES } from "../constants/Theme";

const UpdateDialog = () => {

  const [show, setShow] = useState(false);
  const [state, setState] = useState("");
  const [receivedData, setReceivedData] = useState(0);
  const [totalData, setTotalData] = useState(0);

  codePush.sync(
    { updateDialog: true },
    (syncStatus) => {
      switch (syncStatus) {
        case codePush.SyncStatus.UNKNOWN_ERROR:
          console.log("Unknown error");
          setState("ERROR");
          setShow(true);
        case codePush.SyncStatus.DOWNLOADING_PACKAGE:
          console.log("Downloading package");
          setShow(true);
          break;
        case codePush.SyncStatus.UP_TO_DATE:
          console.log("Up to date");
          setShow(false);
          break;
      }
    },
    ({ receivedBytes, totalBytes }) => {
      setReceivedData(receivedBytes);
      if (!totalData) {
        setTotalData(totalBytes);
      }
      if (receivedBytes == totalBytes) {
        setShow(false);
      }
    }
  );
  return (
    <Modal isVisible={show} style={styles.modal}>
      <View
        style={
          state === "ERROR"
            ? [styles.container, { height: SIZES.height * 0.3}]
            : [styles.container, { height: SIZES.height * 0.2 }]
        }
      >
        <Text
          style={{
            ...FONTS.h4,
            color: COLORS.secondary,
          }}
        >
          {state === "ERROR"
            ? "There was a problem getting your updates."
            : "Getting your updates..."}
        </Text>
        <View
          style={{
            width: "100%",
            backgroundColor: COLORS.lightGray,
            height: "10%",
            marginTop: "4%",
            borderRadius: 10,
          }}
        >
          <View
            style={{
              width: `${
                state === "ERROR" ? 75 : (receivedData / totalData) * 100
              }%`,
              backgroundColor: `${
                state === "ERROR" ? COLORS.warning : COLORS.primary
              }`,
              height: "100%",
              borderRadius: 10,
            }}
          />
        </View>
        <Text
          style={{
            ...FONTS.body4,
            color: COLORS.gray,
            textAlign: "center",
            alignSelf: "center",
            marginTop: "4%",
          }}
        >
          {state === "ERROR"
            ? "Please check your internet connection and restart the app, if the problem persists please contact our customer support team for help"
            : "Please dont press the back button or close the app"}
        </Text>
        {state === "ERROR" ? (
          <TouchableNativeFeedback
            onPress={() => {
              Linking.openURL(`whatsapp://send?text=&phone=7483447528`);
            }}
          >
            <MaterialCommunityIcons
              style={{
                alignSelf: "center",
                marginTop: "5%",
                color: COLORS.primary,
              }}
              name="whatsapp"
              size={44}
              color={COLORS.black}
            />
          </TouchableNativeFeedback>
        ) : null}
      </View>
    </Modal>
  );
};

const styles = EStyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  container: {
    backgroundColor: COLORS.white,
    justifyContent: "flex-start",
    padding: "15rem",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
  },
});

export default UpdateDialog;
