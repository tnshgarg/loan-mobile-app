# employee-app

## Install and run on android

```
cd employee-app
npm install
npx react-native start

# start after reset cache
npx react-native start --reset-cache

# build and start emulator
npx react-native run-android --active-arch-only
```

## Gradle

```
# cleanup
cd android && ./gradlew clean

# assemble release for building an APK
cd android && ./gradlew assembleRelease

```

## Install and run on ios

```
npm install -g react-native-cli
cd employee-app
npm install
react-native run-ios
```

## Build Strategies

`STAGE = "dev" | "test" | "prod"`

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

## Code Push

```
    appcenter codepush release-react -a Unipe/EmployeeApp -d Test
    - pushes to test
    appcenter codepush release-react -a Unipe/EmployeeApp -d Dev
    - pushes to dev
    appcenter codepush release-react -a Unipe/EmployeeApp -d Prod
    - pushes to prod
```

## Appium Testing

```
npm i -g appium
npm i -g jest
Install Appium server GUI from https://github.com/appium/appium-desktop/releases/tag/v1.22.3-4
Install Appium Inspector from https://github.com/appium/appium-inspector/releases

For running tests
jest appium // in root directory

```
