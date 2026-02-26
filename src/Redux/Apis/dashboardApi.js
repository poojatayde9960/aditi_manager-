import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithAdmin } from "./auth.Api";

export const dashboardApi = createApi({
    reducerPath: "dashboardApi",
    baseQuery: baseQueryWithAdmin,
    tagTypes: ["dashboard"],
    endpoints: (builder) => {
        return {
            getCardstatus: builder.query({
                query: () => {
                    return {
                        url: "/getDashboardStat",
                        method: "GET"
                    }
                },
                providesTags: ["dashboard"]
            }),
            getUserConversionRate: builder.query({
                query: () => {
                    return {
                        url: "/getUserConversionRate",
                        method: "GET"
                    }
                },
                providesTags: ["dashboard"]
            }),

            getTopSelling: builder.query({
                query: () => {
                    return {
                        url: "/topSelling",
                        method: "GET"
                    }
                },
                providesTags: ["dashboard"]
            }),

            getSaleByPercent: builder.query({
                query: () => {
                    return {
                        url: "/salesByPercent",
                        method: "GET"
                    }
                },
                providesTags: ["dashboard"]
            }),

            getSaleByMonthly: builder.query({
                query: () => {
                    return {
                        url: "/getMonthlySales",
                        method: "GET"
                    }
                },
                providesTags: ["dashboard"]
            }),




        }
    }
})

export const { useGetCardstatusQuery, useGetTopSellingQuery, useGetSaleByPercentQuery, useGetSaleByMonthlyQuery, useGetUserConversionRateQuery } = dashboardApi
