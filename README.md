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


## Build Strategies
` STAGE = "dev" | "test" | "prod" `

```
start:dev
- Emulator for developers while building a feature or making a fix with `dev` STAGE [DB]

start:test
- Emulator for developers while building a feature or making a fix with `test` STAGE [DB]

build:dev
- Test out an APK for developers while building a feature or making a fix with `dev` STAGE [DB]

build:test
- Test out an APK for Client Servicing Team while building a feature or making a fix with `test` STAGE [DB]

build:prod
- AAB to be released to PlayStore `prod` STAGE [DB]
```
