import { useQuery } from "@tanstack/react-query";
import { getBackendData } from "../../../../services/employees/employeeServices";

export const fetchQuery = ({ unipeEmployeeId, token }) => {
  const response = useQuery(
    ["offers"],
    async () =>
      await getBackendData({
        params: { unipeEmployeeId: unipeEmployeeId },
        xpath: "ewa/offers",
        token: token,
      }),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      staleTime: 1000 * 50, // 50 Seconds
      refetchInterval: 1000 * 60, // 1 Minute,
      placeholderData: () => {
        return queryClient.getQueryData(["offers"]);
      },
    }
  );
  return response;
};
