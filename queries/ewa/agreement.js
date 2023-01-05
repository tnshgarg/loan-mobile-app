import { useMutation } from "@tanstack/react-query";
import { putBackendData } from "../../services/employees/employeeServices";
import { queryClient } from "../client";

export const updateAgreement = () => {
  const mutation = useMutation({
    mutationFn: async ({ data, token }) => {
      return putBackendData({
        data: data,
        xpath: "ewa/agreement",
        token: token,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getEwaOffers"] });
    },
  });
  return mutation;
};
