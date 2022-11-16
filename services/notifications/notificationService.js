import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";
import axios from "axios";
import { store } from "../../store/store";
import { version } from "../../package.json";
import * as RootNavigation from "../../navigators/RootNavigation";
import PushNotification from "react-native-push-notification";

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
        unipeEmployeeId: store.getState().auth.id,
        // unipeEmployeeId: "123412341234123412341234",
        token: fcmToken,
        lastUpdated: new Date().getTime(),
        appVersion: version,
      };
      if (fcmToken) {
        console.log(fcmToken, "new generated FCM token");
        axios({
          method: "post",
          url: "https://wq1kbvpl4b.execute-api.ap-south-1.amazonaws.com/dev/employee/fcm",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify(data),
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
    RootNavigation.navigate("EWAStack", {
      screen: remoteMessage.data.screenName,
    });
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
            remoteMessage.notification
          );
          RootNavigation.navigate("EWAStack", {
            screen: remoteMessage.data.screenName,
          });
        }
      });
  }, 100);
};

// export function subscribeTokenToTopic(token, topic) {
//   fetch(`https://iid.googleapis.com/iid/v1/${token}/rel/topics/${topic}`, {
//     method: "POST",
//     headers: new Headers({
//       Authorization: `key=AAAAFZwEI68:APA91bHm_VKOs0ZqhB5ioYLj3a6mj6_KIezTOakwpjx4c2wQ4uMotTscXvkDCFj4_zpchfQOCeYB25UON_U0_mVATfHk4d_FQEPeQ2gJgxYWwmxZ-zz-ItUpzPyGVBcoE_elw1zRP5gY`,
//     }),
//   })
//     .then((response) => {
//       if (response.status < 200 || response.status >= 400) {
//         console.log(response.status, response);
//       }
//       console.log(`"${topic}" is subscribed`);
//     })
//     .catch((error) => {
//       console.error(error.result);
//     });
//   return true;
// }
