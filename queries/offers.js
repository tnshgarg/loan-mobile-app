import { useQuery } from "@tanstack/react-query";
import { getBackendData } from "../services/employees/employeeServices";

export const fetchQuery = ({ unipeEmployeeId, token }) => {
  const response = useQuery({
    queryKey: ["getEwaOffers"],
    queryFn: async () =>
      await getBackendData({
        params: { unipeEmployeeId: unipeEmployeeId },
        xpath: "ewa/offers",
        token: token,
      }),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 1000 * 60 * 60 * 24,
  });
  return response;
};
