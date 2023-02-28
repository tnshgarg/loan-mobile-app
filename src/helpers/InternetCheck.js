import NetInfo from "@react-native-community/netinfo";

const AddListener = (handleConnectivity) => {
  const unsubscribe = NetInfo.addEventListener(handleConnectivity);
  return unsubscribe;
};

module.exports = {
  AddListener,
};
