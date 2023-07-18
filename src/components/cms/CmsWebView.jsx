import React from "react";
import { Linking, ScrollView, StyleSheet, View } from "react-native";
import WebView from "react-native-webview";
import { connect } from "react-redux";
import { setWebViewHeight } from "../../store/slices/cmsSlice";
import { store } from "../../store/store";

const CmsWebView = ({uri, height}) => {
  console.log({webview: {uri,height}})
  // source: https://yelotofu.com/reactnative-why-your-webview-disappears-inside-scrollview-c6057c9ac6dd
  const onMessage = (event) => {
    console.log({webviewonmessage: {height: Number(event.nativeEvent.data)}})
    store.dispatch(setWebViewHeight({uri,height: Number(event.nativeEvent.data)}))
  }
  const webViewScript = `
    setTimeout(function() { 
      window.ReactNativeWebView.postMessage(document.documentElement.scrollHeight); 
    }, 500);
    true; // note: this is required, or you'll sometimes get silent failures
  `;
  
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
      <ScrollView contentContainerStyle={{ flexGrow: 1, height: (height || 0) * 1.3 }}>
      <WebView
        source={{ uri }}
        bounces={true}
        automaticallyAdjustContentInsets={false}
        scrollEnabled={false}
        onMessage={onMessage}
        javaScriptEnabled={true}
        injectedJavaScript={webViewScript}
        style={styles.content}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        domStorageEnabled={true}
        useWebKit={true}
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

const ConnectedWebview = connect((state, ownProps) => {
  let {uri} = ownProps;
  return {uri,height: state.cmsForms.webviewdata?.[uri]}
})(CmsWebView)

const WrappedWebView = ({uri}) => (<ConnectedWebview uri={uri} />)
export default WrappedWebView