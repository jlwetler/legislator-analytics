import { useQuery } from "@tanstack/react-query";

import { clientFetchLocalAPI } from "./fetch.helper";
import { AxiosError } from "axios";

export interface ILegislator {
  id: string;
  name: string;
  supportedBills: number;
  opposedBills: number;
}

export function useGetLegislators() {
  return useQuery<ILegislator[], AxiosError>({
    queryKey: ["legislators"],
    queryFn: () => {
      return clientFetchLocalAPI<ILegislator[]>("/legislator");
    },
    enabled: true,
    retry: 1,
  });
}
