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
  console.log("useGetLegislators hook chamado");
  return useQuery<ILegislator[], AxiosError>({
    queryKey: ["legislators"],
    queryFn: () => {
      console.log("Executando queryFn");
      const response = clientFetchLocalAPI<ILegislator[]>("/legislator");
      console.log("response do hook: ", response);
      return response;
    },
    enabled: true,
    retry: 1,
  });
}
