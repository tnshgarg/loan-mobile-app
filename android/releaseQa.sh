#!/bin/bash

export APP_NAME='Unipe-QA'
export DISTRIBUTION_GROUP='QA'
export APK_PATH='./android/app/build/outputs/apk/qa/release/app-qa-release.apk'
export STAGE='qa'

npx appcenter distribute release --app Unipe-org/$APP_NAME --group $DISTRIBUTION_GROUP --file $APK_PATH

export TEST_APP_VERSION=$(npx appcenter  distribute releases list --app Unipe/$APP_NAME | sed -n 2p | awk '{print $3}')

echo $TEST_APP_VERSION