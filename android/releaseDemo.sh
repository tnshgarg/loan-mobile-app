#!/bin/bash

export APP_NAME='Unipe-Demo-App'
export DISTRIBUTION_GROUP='Collaborators'
export APK_PATH='./android/app/build/outputs/apk/dev/release/app-dev-release.apk'
export STAGE='dev'
export LAMBDA_FUNCTION_NAME=$STAGE'-employee-app-api'

npx appcenter distribute release --app Unipe/$APP_NAME --group $DISTRIBUTION_GROUP --file $APK_PATH

export DEV_APP_VERSION=$(npx appcenter  distribute releases list --app Unipe/$APP_NAME | sed -n 2p | awk '{print $3}')

echo $DEV_APP_VERSION

export NEW_ENV_VARS=$(aws lambda get-function-configuration --function-name $LAMBDA_FUNCTION_NAME --query "Environment.Variables | merge(@, \`{\"appcenter_app_version_$STAGE\":\"$DEV_APP_VERSION\"}\`)")

echo $NEW_ENV_VARS

aws lambda update-function-configuration --function-name $LAMBDA_FUNCTION_NAME --environment "{ \"Variables\": $NEW_ENV_VARS }"