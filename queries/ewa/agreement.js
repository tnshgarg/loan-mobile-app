import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { EMPLOYEE_API_URL } from "../../services/constants";
import { queryClient } from "../client";

export const updateAgreement = () => {
  const mutation = useMutation({
    mutationFn: async ({ data, xpath, token }) => {
      return axios({
        method: "post",
        url: `${EMPLOYEE_API_URL}/ewa/agreement`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify(data),
      })
        .then((response) => {
          console.log("ewakyc response:", response);
          return response;
        })
        .catch(console.error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getEwaOffers"] });
    },
  });
  return mutation;
};
