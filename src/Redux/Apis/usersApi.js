import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userOrderApi = createApi({
    reducerPath: "userOrderApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        credentials: "include",
    }),
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
