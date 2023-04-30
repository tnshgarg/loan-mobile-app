import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../client";
import { getVersion } from "react-native-device-info";

import {
  getBackendData,
  putBackendData,
} from "../../services/employees/employeeServices";

export const getRepayment = async ({queryKey}) => {
  const [_, unipeEmployeeId, token] = queryKey;
  return await getBackendData({
                params: { unipeEmployeeId: unipeEmployeeId , version: getVersion()},
                xpath: "ewa/repayment",
                token: token,
              });
}

export const updateRepayment = () => {
  const mutation = useMutation({
    mutationFn: async ({ data, token }) => {
      return putBackendData({
        data: data,
        xpath: "ewa/repayment",
        token: token,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getRepayment"] });
      queryClient.invalidateQueries({ queryKey: ["getEwaOffers"] });
    },
  });
  return mutation;
};
