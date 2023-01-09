import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../queries/client";

export default function usePersistentContext(key) {
  const { data } = useQuery([key], () => AsyncStorage.getItem(key));

  const { mutateAsync: setValue } = useMutation(
    (value) => AsyncStorage.setItem(key, value),
    {
      onMutate: (mutatedData) => {
        const current = data;
        queryClient.setQueryData(key, mutatedData);
        return current;
      },
      onError: (_, __, rollback) => {
        queryClient.setQueryData(key, rollback);
      },
    }
  );

  return [data, setValue];
}
