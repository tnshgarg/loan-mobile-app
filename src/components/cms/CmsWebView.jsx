import React, { useState } from "react";
import { Linking, ScrollView, StyleSheet, View } from "react-native";
import WebView from "react-native-webview";

const CmsWebView = ({source}) => {
  // source: https://yelotofu.com/reactnative-why-your-webview-disappears-inside-scrollview-c6057c9ac6dd
  const [webViewHeight, setWebViewHeight] = useState(null);
  const onMessage = (event) => {
    setWebViewHeight(Number(event.nativeEvent.data));
  }
  const onShouldStartLoadWithRequest = (request) => { 
    if (request.navigationType === 'click') {
      // Open all new click-throughs in external browser.
      Linking.openURL(request.url);
      return false;
    }
    return true;
  }
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, height: styles.header.height + webViewHeight }}>
      <WebView
        source={source}
        bounces={true}
        scrollEnabled={false}
        onMessage={onMessage}
        injectedJavaScript="window.ReactNativeWebView.postMessage(Math.max(document.body.offsetHeight, document.body.scrollHeight));"
        style={styles.content}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
      />
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  header: {
    height: 300,
    justifyContent: 'center'    
  },
  content: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});

export default CmsWebView