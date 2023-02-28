import { getBackendData } from "../../services/employees/employeeServices";

export const getEwaOffers = async ({queryKey}) => {
  const [_, unipeEmployeeId, token] = queryKey;
  return await getBackendData({
                params: { unipeEmployeeId: unipeEmployeeId },
                xpath: "ewa/offers",
                token: token,
              });
}
