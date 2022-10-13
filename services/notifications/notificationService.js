import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";
import notifee from "@notifee/react-native";

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
      if (fcmToken) {
        console.log(fcmToken, "new generated FCM token");
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
      remoteMessage.notification
    );
  });

  messaging().onMessage(async (remoteMessage) => {
    console.log("Received in Foreground", remoteMessage);
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log(
          "Notification caused app to open from quit state:",
          remoteMessage.notification
        );
      }
    });
};

export function onMessageReceived(message) {
  const { type, timestamp } = message.data;

  if (type === "order_shipped") {
    notifee.displayNotification({
      title: "Your order has been shipped",
      body: `Your order was shipped at ${new Date(
        Number(timestamp)
      ).toString()}!`,
      android: {
        channelId: "orders",
      },
    });
  }
}
