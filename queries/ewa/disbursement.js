import { QueryClient, useQuery } from "@tanstack/react-query";
import { getBackendData } from "../../services/employees/employeeServices";

export const queryClient = new QueryClient();

export const getDisbursement = ({ params, token }) => {
  const response = useQuery({
    queryKey: ["getDisbursement"],
    queryFn: async () => {
      return getBackendData({
        params: params,
        xpath: "ewa/disbursement",
        token: token,
      });
    },
    config: {
      staleTime: 1000 * 60 * 60 * 24,
      cacheTime: 1000 * 60 * 60 * 24,
      refetchInterval: 1000 * 60 * 60 * 24,
    },
  });
  return response;
};
