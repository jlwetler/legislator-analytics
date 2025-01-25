import { useQuery } from "@tanstack/react-query";

import { clientFetchLocalAPI } from "./fetch.helper";
import { AxiosError } from "axios";

export interface IBill {
  id: string;
  title: string;
  supporters: number;
  opposers: number;
  primarySponsor: string;
}

export function useGetBills() {
  return useQuery<IBill[], AxiosError>({
    queryKey: ["Bills"],
    queryFn: () => {
      return clientFetchLocalAPI<IBill[]>("/bill");
    },
    enabled: true,
    retry: 1,
  });
}
