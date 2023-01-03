import { useQuery } from "@tanstack/react-query";
import { getBackendData } from "../services/employees/employeeServices";

export const getEwaOffers = ({ unipeEmployeeId, token }) => {
  const response = useQuery({
    queryKey: ["getEwaOffers"],
    queryFn: async () => {
      return getBackendData({
        params: { unipeEmployeeId: unipeEmployeeId },
        xpath: "ewa/offers",
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
