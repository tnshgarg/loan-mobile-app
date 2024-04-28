import { useState } from "react";
import { Text, TouchableNativeFeedback, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, FONTS } from "../../constants/Theme";
import {
  InteractionTypes,
  trackEvent,
} from "../../helpers/analytics/commonAnalytics";
import FormInput from "../atoms/FormInput";
import PrimaryButton from "../atoms/PrimaryButton";

const Upi = ({ ProceedButton, disabled }) => {
  const [vpa, setVpa] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(false);
  let isValidVpa = false;

  let upiReg = /^[a-zA-Z0-9.\-_]{2,49}@[a-zA-Z._]{2,49}/gm;
  if (upiReg.test(vpa || "")) {
    isValidVpa = true;
  }
  return (
    <>
      <TouchableNativeFeedback
        disabled={disabled}
        accessibilityLabel="InfoCard"
        onPress={() => {
          setExpanded(!expanded);
        }}
      >
        <View
          style={[
            styles.container,
            {
              backgroundColor: selected
                ? COLORS.primary
                : selected
                ? COLORS.lightgray_01
                : COLORS.white,
            },
          ]}
        >
          <MaterialCommunityIcons
            name={"card-account-details-outline"}
            size={24}
            color={
              selected ? COLORS.white : selected ? COLORS.gray : COLORS.black
            }
          />
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.title,
                {
                  color: selected
                    ? COLORS.white
                    : selected
                    ? COLORS.gray
                    : COLORS.black,
                },
              ]}
            >
              UPI
            </Text>
            <Text style={[styles.subtitle, { color: COLORS.primary }]}>
              Instant registration
            </Text>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={
              selected ? COLORS.white : selected ? COLORS.gray : COLORS.black
            }
          />
        </View>
      </TouchableNativeFeedback>
      {expanded && (
        <View style={styles.extension}>
          <FormInput
            containerStyle={{ width: "100%" }}
            placeholder={"Enter your UPI ID"}
            value={vpa}
            autoFocus={true}
            onChange={setVpa}
            errorMsg={vpa && !isValidVpa ? "Please enter a valid UPI ID" : ""}
          />
          <PrimaryButton
            title={"Confirm UPI ID"}
            disabled={!isValidVpa}
            onPress={() => {
              trackEvent({
                interaction: InteractionTypes.SCREEN_OPEN,
                screen: "mandateStart",
                action: "CONTINUE",
              });
              ProceedButton({
                authType: "upi",
                provider: "cashfree",
                additionalData: { upi_vpa: vpa },
              });
            }}
          />
        </View>
      )}
    </>
  );
};

const DebitCard = ({ ProceedButton, disabled }) => {
  const [selected, setSelected] = useState(false);
  return (
    <>
      <TouchableNativeFeedback
        disabled={disabled}
        accessibilityLabel="InfoCard"
        onPress={() => {
          trackEvent({
            interaction: InteractionTypes.SCREEN_OPEN,
            screen: "mandateStart",
            action: "CONTINUE",
          });
          ProceedButton({ authType: "debitcard" });
        }}
      >
        <View
          style={[
            styles.container,
            {
              backgroundColor: selected
                ? COLORS.primary
                : disabled
                ? COLORS.lightgray_01
                : COLORS.white,
            },
          ]}
        >
          <MaterialCommunityIcons
            name={"credit-card-outline"}
            size={24}
            color={
              selected ? COLORS.white : disabled ? COLORS.gray : COLORS.black
            }
          />
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.title,
                {
                  color: selected
                    ? COLORS.white
                    : disabled
                    ? COLORS.gray
                    : COLORS.black,
                },
              ]}
            >
              Debit Card
            </Text>
            {/* <Text style={styles.subtitle}>Instant registration</Text> */}
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={
              selected ? COLORS.white : disabled ? COLORS.gray : COLORS.black
            }
          />
        </View>
      </TouchableNativeFeedback>
    </>
  );
};

const NetBanking = ({ ProceedButton, disabled }) => {
  const [selected, setSelected] = useState(false);
  return (
    <>
      <TouchableNativeFeedback
        disabled={disabled}
        accessibilityLabel="InfoCard"
        onPress={() => {
          trackEvent({
            interaction: InteractionTypes.SCREEN_OPEN,
            screen: "mandateStart",
            action: "CONTINUE",
          });
          ProceedButton({ authType: "netbanking" });
        }}
      >
        <View
          style={[
            styles.container,
            {
              backgroundColor: selected
                ? COLORS.primary
                : selected
                ? COLORS.lightgray_01
                : COLORS.white,
            },
          ]}
        >
          <MaterialCommunityIcons
            name={"bank-outline"}
            size={24}
            color={
              selected ? COLORS.white : selected ? COLORS.gray : COLORS.black
            }
          />
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.title,
                {
                  color: selected
                    ? COLORS.white
                    : selected
                    ? COLORS.gray
                    : COLORS.black,
                },
              ]}
            >
              Net Banking
            </Text>
            {/* <Text style={styles.subtitle}>Instant registration</Text> */}
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={
              selected ? COLORS.white : selected ? COLORS.gray : COLORS.black
            }
          />
        </View>
      </TouchableNativeFeedback>
    </>
  );
};

const Aadhaar = ({ ProceedButton, disabled }) => {
  const [selected, setSelected] = useState(false);
  return (
    <>
      <TouchableNativeFeedback
        accessibilityLabel="InfoCard"
        disabled={disabled}
        onPress={() => {
          trackEvent({
            interaction: InteractionTypes.SCREEN_OPEN,
            screen: "mandateStart",
            action: "CONTINUE",
          });
          ProceedButton({ authType: "aadhaar" });
        }}
      >
        <View
          style={[
            styles.container,
            {
              backgroundColor: selected
                ? COLORS.primary
                : selected
                ? COLORS.lightgray_01
                : COLORS.white,
            },
          ]}
        >
          <MaterialCommunityIcons
            name={"card-account-details-outline"}
            size={24}
            color={
              selected ? COLORS.white : selected ? COLORS.gray : COLORS.black
            }
          />
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.title,
                {
                  color: selected
                    ? COLORS.white
                    : selected
                    ? COLORS.gray
                    : COLORS.black,
                },
              ]}
            >
              Aadhaar
            </Text>
            <Text style={[styles.subtitle, { color: COLORS.secondary }]}>
              Takes upto 96 banking hours to register
            </Text>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={
              selected ? COLORS.white : selected ? COLORS.gray : COLORS.black
            }
          />
        </View>
      </TouchableNativeFeedback>
    </>
  );
};

const NA = () => {
  const [selected, setSelected] = useState(false);
  return (
    <>
      <TouchableNativeFeedback
        accessibilityLabel="InfoCard"
        onPress={() => {
          trackEvent({
            interaction: InteractionTypes.SCREEN_OPEN,
            screen: "mandateStart",
            action: "CONTINUE",
          });
          ProceedButton({ authType: "debitcard" });
        }}
      >
        <View
          style={[
            styles.container,
            {
              backgroundColor: selected
                ? COLORS.primary
                : selected
                ? COLORS.lightgray_01
                : COLORS.white,
            },
          ]}
        >
          <MaterialCommunityIcons
            name={"crosshairs-off"}
            size={24}
            color={
              selected ? COLORS.white : selected ? COLORS.gray : COLORS.black
            }
          />
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.title,
                {
                  color: selected
                    ? COLORS.white
                    : selected
                    ? COLORS.gray
                    : COLORS.black,
                },
              ]}
            >
              Your bank does not support mandate
            </Text>
            {/* <Text style={styles.subtitle}>Instant registration</Text> */}
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={
              selected ? COLORS.white : selected ? COLORS.gray : COLORS.black
            }
          />
        </View>
      </TouchableNativeFeedback>
    </>
  );
};

export { Aadhaar, DebitCard, NA, NetBanking, Upi };

const styles = EStyleSheet.create({
  ParentContainer: { padding: 2 },
  notFoundContainer: {
    padding: "10rem",
  },
  container: {
    width: "100%",
    padding: "20rem",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: COLORS.lightgray_01,
  },
  textContainer: {
    paddingLeft: "10rem",
    flexDirection: "column",
    alignItems: "flex-start",
    flex: 1,
  },
  title: {
    ...FONTS.body4,
    color: COLORS.black,
  },
  extension: {
    width: "100%",
    padding: "5rem",
    flexDirection: "column",
    flexGrow: 1,
    borderBottomWidth: 1,
    alignItems: "space-between",
    borderColor: COLORS.lightgray_01,
  },
  subtitle: { ...FONTS.body5, color: COLORS.gray },
  image: {
    flex: 1,
    alignItems: "center",
    width: "40rem",
  },
});
