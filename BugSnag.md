# BugSnag

## Advantages of BugSnag
1. Used in identifying the logs for errors caused on Production Application
2. We can easily get the device information on which the app crashed
3. We can assign issues to various team members on BugSnag in order to maintain sync
4. We can filter issues based on release versions, stages and different issues
5. We don't have to track the error in our Database anymore
6. Automatically captures tracked and untracked errors
7. Acts like Github for issue tracking

## Types of Logs
1. Logs for API failures -> If the API's fail to post data, we are catching it and logging it to the BugSnag Console. We will be able to find out the exact reason based on which the issue occured.
2. Logs for Sudden Crashing -> If the app crashes for no reason, we will get a log on BugSnag defining the error. We will see the breadcrumbs according to the whole journey of the app used by the user. Used for identifying the App is not responding issues.
3. Logs for Unhandled failures -> We will get logs for unhandled failures which our app might face due to server-load, UI stretching and Frontend issues.

## Classification of Logs
1. Handled Logs -> Logs that are handled (basically the logs that we are tracking in the codebase ourself). These logs can be Backend, UI and API related. These are further classified based on the current code written:
   
   1. Tracked Issues: The places where we are ourselves defining the issue and catching logs are tracked issues. We are doing this to track API failures. We know about the causes of these errors and these errors are API based so we are already providing them with certain text to identify the issue immediately in BugSnag.
   2. Untracked Issues: The places where we are getting unplanned errors based on UI, frontend or API related issues. The places where we know that the error might come, but we don't know what that error might be. Mostly the errors that we are handling are API based errors.
   
2. Un-Handled Logs -> Logs that are not handled (means that there is no code written for tracking these issues as these issues are permanant issues). These are basically "Non-Responding", "App-Crashed" and "Unexpected-Error" issues that are tracked using Un-Handled Logs

## Data we are getting from BugSnag

1. Related to Device: 
   1. Battery Level
   2. Mobile Brand
   3. Is Charging
   4. Is Emulator
   5. Free Storage in Mobile
   6. Free RAM in Mobile
   7. Device ID
   8. Model Name
   9. OS Version
   10. Network Access
   11. RunTime Versions
   12. Screen Resolution
   13. Total Memory
   
2. Related to App:
   1. Active Screen
   2. Duration of App used (Background)
   3. Duration of App used (Foreground)
   4. Is Low Memory Device
   5. Memory Limit
   6. Memory Usage
   7. Total Memory
   8. App Version
   9. App Version Code