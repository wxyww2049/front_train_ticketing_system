// import { QueryClient } from "@tanstack/react-query";
import { QueryClient } from "react-query";
import { request } from "../api/request";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const data = await request(
          {
            url: queryKey[0],
            data: queryKey[1].data ?? {},
            header: queryKey[1].headers ?? {},
          },
          queryKey[1].useAuth ?? false
        );

        if (typeof data.code === "undefined") return data;

        if (data.code !== 0) throw new Error(data.code + ":" + data.message);
        return data.data;
      },
      retry: (failureCount, error) => !error.message && failureCount < 5,
      staleTime: 1000,
      refetchOnWindowFocus: false,
    },
  },
});
