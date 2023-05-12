import { getVersion } from "react-native-device-info";

import {
  getBackendData
} from "../../services/employees/employeeServices";

export const getRepayment = async ({ queryKey }) => {
  const [_, unipeEmployeeId, token] = queryKey;
  return await getBackendData({
    params: { unipeEmployeeId: unipeEmployeeId, version: getVersion() },
    xpath: "ewa/repayment",
    token: token,
  });
};
