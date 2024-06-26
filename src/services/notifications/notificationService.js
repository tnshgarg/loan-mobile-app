import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";
import { version } from "../../../package.json";
import Analytics, {
  InteractionTypes
} from "../../helpers/analytics/commonAnalytics";
import * as RootNavigation from "../../navigators/RootNavigation";
import { fcmApi } from "../../store/apiSlices/fcmApi";
import { store } from "../../store/store";

function generateCampainClick(remoteMessage) {
  const data = remoteMessage?.data ?? {};
  const utm_campaign = `utm_campaign=${data.utm_campaign}`;
  const utm_medium = `utm_medium=${data.utm_medium}`;
  const utm_source = `utm_source=${data.utm_source}`;
  const utm_content = `utm_content=${data.utm_content}`;

  return `fcm://screen/${remoteMessage?.data?.screenName}/fcm_notification?${utm_campaign}&${utm_medium}&${utm_source}&${utm_content}`;
}

function pushAnalytics(remoteMessage, status) {
  Analytics.setSessionValue(
    "campaignClick",
    generateCampainClick(remoteMessage)
  );
  Analytics.setSessionValue("in_app_notification", remoteMessage.data);
  Analytics.trackEvent({
    interaction: InteractionTypes.IN_APP_NOTIFICATION,
    flow: "notification",
    screen: remoteMessage?.data?.screenName || "not set",
    action: remoteMessage?.data?.type || "not set",
  });
}

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
        fcmApi.endpoints.updateFcm.initiate({
          data: data,
          token: store.getState().auth.token,
        })
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
    pushAnalytics(remoteMessage, "received_in_background")
    RootNavigation.navigate("HomeStack", {
      screen: remoteMessage?.data?.screenName || "Home",
    });
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
          pushAnalytics(remoteMessage, "received_in_quit_state")
          RootNavigation.navigate("HomeStack", {
            screen: remoteMessage?.data?.screenName || "Home",
          });
        }
      });
  }, 800);
};
