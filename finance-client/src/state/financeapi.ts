import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetFinanceKpisResponse, GetProductsResponse, GetTransactionsResponse } from "./types";

export const financeapi = createApi({

    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    reducerPath: "app",
    tagTypes: ["FKpis", "Products", "Transactions"],

    endpoints: (builder) => ({
        getFinanceKpis: builder.query <Array<GetFinanceKpisResponse>, void> ({
            query: () => "finance/kpis/",
            providesTags: ["FKpis"],
        }),
        getProducts: builder.query <Array<GetProductsResponse>, void> ({
            query: () => "product/products/",
            providesTags: ["Products"],
        }),
        getTransactions: builder.query <Array<GetTransactionsResponse>, void> ({
            query: () => "transaction/transactions/",
            providesTags: ["Transactions"],
        }),
    }),
});

export const { useGetFinanceKpisQuery, useGetProductsQuery, useGetTransactionsQuery } = financeapi;
