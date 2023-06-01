import Analytics from "appcenter-analytics";
import UnipeAnalyticsAPI from "./unipeAnalyticsAPI";
import {store} from "../../store/store"
import { version } from "../../../package.json";

const analyticsSession = {
    startTime: new Date().getTime() / 1000,
    appVersion: version,
    logCount: 0
}

export const InteractionTypes =  {
    "BANNER_TAP": "BP",
    "BUTTON_PRESS": "BP",
    "SCREEN_OPEN": "SO",
    "INPUT": "INP",
    "IN_APP_NOTIFICATION": "IAN",
    "CAMPAIGN_URL": "CU"
}

export async function trackEvent(
    event
){
    const appState = store.getState();
    analyticsSession.logCount += 1
    console.log("trackEvent",event, analyticsSession.logCount);
    const analyticsEvent = {
        session: analyticsSession,
        user: appState?.auth?.unipeEmployeeId,
        campaign: appState?.campaign,
        eventTime: new Date().getTime() / 1000,
        event: event || {}
    }
    const codepushEventName = `${event.component}|${event.action}|${event.status}`
    Analytics.trackEvent(codepushEventName, analyticsEvent.event).catch(console.error)
    UnipeAnalyticsAPI.post("/",analyticsEvent
    ).then(r => console.log("AnalyticsResponse:",r?.data)).catch(console.error)
}

export async function init() {
    await Analytics.setEnabled(true);
    const codepushEnabled = await Analytics.isEnabled();
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