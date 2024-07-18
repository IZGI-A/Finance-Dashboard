import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const financeapi = createApi({

    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    reducerPath: "app",
    tagTypes: ["FKpis"],

    endpoints: (builder) => ({
        getFinanceKpis: builder.query <void, void> ({
            query: () => "finance/kpis/",
            providesTags: ["FKpis"],
        }),
    }),
});

export const { useGetFinanceKpisQuery } = financeapi;
