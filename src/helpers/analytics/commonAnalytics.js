import Analytics from "appcenter-analytics";
import UnipeAnalyticsAPI from "./unipeAnalyticsAPI";
import {store} from "../../store/store"
import { version } from "../../../package.json";

const analyticsSession = {
    sessionStartTime: new Date().getTime() / 1000,
    appVersion: version,
    unipeEmployeeId: null,
    employerId: null,
    logs: 0
}

export const InteractionTypes =  {
    "BUTTON_PRESS": "BP",
    "SCREEN_OPEN": "SO",
    "INPUT": "INP"
}
export async function trackEvent(
    event
){
    const appState = store.getState();
    analyticsSession.logs += 1
    console.log("trackEvent",event, analyticsSession.logs);
    const analyticsEvent = {
        session: analyticsSession,
        user: {
            unipeEmployeeId: appState?.auth?.unipeEmployeeId,
        },
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

export async function setProperty(propertyName, propertyValue) {

}

export default {
    trackEvent,init,setEnabled,setProperty
}