import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetFinanceKpisResponse } from "./types";

export const financeapi = createApi({

    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    reducerPath: "app",
    tagTypes: ["FKpis"],

    endpoints: (builder) => ({
        getFinanceKpis: builder.query <Array<GetFinanceKpisResponse>, void> ({
            query: () => "finance/kpis/",
            providesTags: ["FKpis"],
        }),
    }),
});

export const { useGetFinanceKpisQuery } = financeapi;
