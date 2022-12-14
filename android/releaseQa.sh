#!/bin/bash

export APP_NAME='Unipe-QA-App'
export DISTRIBUTION_GROUP='QA'
export APK_PATH='./android/app/build/outputs/apk/qa/release/app-qa-release.apk'
export STAGE='test'
export LAMBDA_FUNCTION_NAME=$STAGE'-employee-app-api'

npx appcenter distribute release --app Unipe/$APP_NAME --group $DISTRIBUTION_GROUP --file $APK_PATH

export TEST_APP_VERSION=$(npx appcenter  distribute releases list --app Unipe/$APP_NAME | sed -n 2p | awk '{print $3}')

echo $TEST_APP_VERSION

export NEW_ENV_VARS=$(aws lambda get-function-configuration --function-name $LAMBDA_FUNCTION_NAME --query "Environment.Variables | merge(@, \`{\"appcenter_app_version_$STAGE\":\"$TEST_APP_VERSION\"}\`)")

echo $NEW_ENV_VARS

aws lambda update-function-configuration --function-name $LAMBDA_FUNCTION_NAME --environment "{ \"Variables\": $NEW_ENV_VARS }"