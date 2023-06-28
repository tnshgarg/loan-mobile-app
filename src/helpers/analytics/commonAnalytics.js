import analytics from "@react-native-firebase/analytics";
import Analytics from "appcenter-analytics";
import { version } from "../../../package.json";
import { store } from "../../store/store";
import UnipeAnalyticsAPI from "./unipeAnalyticsAPI";

const analyticsSession = {
    startTime: new Date().getTime() / 1000,
    appVersion: version,
    logCount: 0
}

let firebaseAnalytics = null;
export const InteractionTypes =  {
    "BANNER_TAP": "BP",
    "BUTTON_PRESS": "BP",
    "SCREEN_OPEN": "SO",
    "INPUT": "INP",
    "IN_APP_NOTIFICATION": "IAN",
    "CAMPAIGN_URL": "CU",
    "APP_UPDATE" : "AU"
}

export async function trackEvent(
    event
){
    const appState = store.getState();
    analyticsSession.logCount += 1
    console.log("trackEvent",event, analyticsSession.logCount, analyticsSession.campaignClick);
    const analyticsEvent = {
        session: analyticsSession,
        user: appState?.auth?.unipeEmployeeId,
        campaign: appState?.campaign,
        eventTime: new Date().getTime() / 1000,
        event: event || {}
    }
    const codepushEventName = `${event.flow}|${event.screen}|${event.action}`;
    // const analyticsEventName = `${event.component}_${event.action}_${event.status}`.replace(":","__")
    const analyticsEventName =
      `${event.flow}_${event.screen}_${event.action}`.replace(":", "__");
    Analytics.trackEvent(codepushEventName, analyticsEvent.event).catch(console.error)
    firebaseAnalytics.logEvent(analyticsEventName, {unipeEmployeeId: analyticsEvent.user})
    UnipeAnalyticsAPI.post("/",analyticsEvent
    ).then(r => console.log("AnalyticsResponse:",r?.data)).catch(console.error)
}

export async function init() {
    await Analytics.setEnabled(true);
    const codepushEnabled = await Analytics.isEnabled();
    firebaseAnalytics = analytics()
    console.log("CodePush Analytics Enabled", codepushEnabled, );

    return {
        "codepush": codepushEnabled
    }
}

export async function setEnabled(enabled){
    console.log("setEnabled called")
}

export async function setSessionValue(propertyName, propertyValue) {
    analyticsSession[propertyName] = propertyValue
}

export default {
    trackEvent,init,setEnabled,setSessionValue
}