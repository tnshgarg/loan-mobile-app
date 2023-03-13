import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";
import { store } from "../../store/store";
import { version } from "../../../package.json";
import * as RootNavigation from "../../navigators/RootNavigation";
import PushNotification from "react-native-push-notification";
import { fcmPush } from "../../helpers/BackendPush";

export async function requestUserPermission() {
  const authorizationStatus = await messaging().requestPermission();

  if (authorizationStatus) {
    console.log("Permission status:", authorizationStatus);
    getFcmToken();
  }
}

export const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem("fcmToken");
  await messaging().subscribeToTopic("initial-users");
  console.log(fcmToken, "the old FCM token");
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      const data = {
        unipeEmployeeId: store.getState().auth.unipeEmployeeId,
        token: fcmToken,
        appVersion: version,
      };
      console.log(data);
      if (fcmToken) {
        console.log(fcmToken, "new generated FCM token");
        fcmPush({
          data: data,
          token: store.getState().auth.token,
        });
        await AsyncStorage.setItem("fcmToken", fcmToken);
        await messaging().subscribeToTopic("initial-users");
      }
    } catch (error) {
      console.log(error, "error raised in FCM token");
    }
  }
};

export const notificationListener = async () => {
  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log(
      "Notification caused app to open from background state:",
      remoteMessage
    );
    switch (remoteMessage.data.type) {
      case "NEW_EWA_OFFER" ||
        "EWA_REPAYMENT_REMINDER" ||
        "EWA_DISBURSEMENT_SUCCESS":
        RootNavigation.navigate("HomeStack", {
          screen: remoteMessage.data.screenName,
        });
      default:
        RootNavigation.navigate("HomeStack", {
          screen: remoteMessage.data.screenName,
        });
    }
  });

  messaging().onMessage(async (remoteMessage) => {
    PushNotification.localNotification({
      message: remoteMessage.notification.body,
      title: remoteMessage.notification.title,
      smallIcon: "ic_notification_fcm_icon",
      allowWhileIdle: false,
      channelId: "Foreground",
      repeatTime: 1,
    });
    console.log("Received in Foreground", remoteMessage);
  });

  // Check whether an initial notification is available
  setTimeout(() => {
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.data
          );
          switch (remoteMessage.data.type) {
            case "NEW_EWA_OFFER" ||
              "EWA_REPAYMENT_REMINDER" ||
              "EWA_DISBURSEMENT_SUCCESS":
              RootNavigation.navigate("HomeStack", {
                screen: remoteMessage.data.screenName,
              });
              break;
            default:
              RootNavigation.navigate("HomeStack", {
                screen: remoteMessage.data.screenName,
              });
              break;
          }
        }
      });
  }, 800);
};
