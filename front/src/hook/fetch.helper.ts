import axios, { AxiosResponse } from "axios";

const axiosAPIClient = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export const clientFetchLocalAPI = async <T>(url: string): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosAPIClient.get(url, {});
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch data from ${url}:`, error);
    throw error;
  }
};
