import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./auth.Api";

export const userOrderApi = createApi({
    reducerPath: "userOrderApi",
    baseQuery,
    tagTypes: ["UserOrder", "Users"],
    endpoints: (builder) => ({
        // Get all users
        getUsers: builder.query({
            query: () => ({
                url: "/admin/users",
                method: "GET",
            }),
            providesTags: ["Users"],
        }),
        getAverageMonthlyOrders: builder.query({
            query: () => ({
                url: "/admin/order/getAverageMonthlyOrders",
                method: "GET",
            }),
            providesTags: ["Users"],
        }),

        // Get orders by user ID
        getOrdersByUserId: builder.query({
            query: (userId) => ({
                url: `/users/order/getOrderById/${userId}`,
                method: "GET",
            }),
            providesTags: ["UserOrder"],
        }),
    }),
});

export const { useGetUsersQuery, useGetOrdersByUserIdQuery, useGetAverageMonthlyOrdersQuery } = userOrderApi;
