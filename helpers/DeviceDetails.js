import { getUniqueId } from "react-native-device-info";
import { NetworkInfo } from "react-native-network-info";

const DeviceId = () => {
  let deviceId = 0;
  getUniqueId().then((id) => {
    deviceId = id;
  });
  return deviceId;
};

const DeviceIp = () => {
  let deviceIp = 0;
  NetworkInfo.getIPV4Address().then((ip) => {
    deviceIp = ip;
  });
  return deviceIp;
};

module.exports = {
  DeviceId,
  DeviceIp,
};
