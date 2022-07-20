# employee-app

## Install and run on android
```
cd employee-app
npm install
npx react-native start
npx react-native run-android
```

## Install and run on ios
```
npm install -g react-native-cli
cd employee-app
npm install
react-native run-ios
```

//npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res &&