import { QueryClient, useMutation } from "@tanstack/react-query";
import { putBackendData } from "../../services/employees/employeeServices";

export const queryClient = new QueryClient();

export const updateKyc = () => {
  const mutation = useMutation({
    mutationFn: async ({ data, token }) => {
      return putBackendData({
        data: data,
        xpath: "ewa/kyc",
        token: token,
      });
    },
  });
  return mutation;
};
