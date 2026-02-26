import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithAdmin } from "./auth.Api";

export const OrderApi = createApi({
    reducerPath: "OrderApi",
    baseQuery: baseQueryWithAdmin,
    tagTypes: ["order"],
    endpoints: (builder) => {
        return {
            getOders: builder.query({
                query: () => {
                    return {
                        url: "/order/getAllOrder",
                        method: "GET"
                    }
                },
                providesTags: ["order"]
            }),
            getOdersById: builder.query({
                query: (id) => {
                    return {
                        url: `/order/getOrderById/${id}`,
                        method: "GET"
                    }
                },
                providesTags: ["order"]
            }),
            getUserById: builder.query({
                query: (id) => ({
                    url: `/users/${id}`,
                    method: "GET",
                }),
                providesTags: ["order"],
            }),
            // getAllOders: builder.query({
            //     query: (id) => {
            //         return {
            //             // api/v1/admin/users/6948c9001f4a90a63b0bda82' 
            //             url: `/users/${id}`,
            //             method: "GET"
            //         }
            //     },
            //     providesTags: ["order"]
            // }),

            updateStatus: builder.mutation({
                query: ({ orderId, Status }) => ({
                    url: `/order/update-status/${orderId}`,
                    method: "PUT",
                    body: {
                        Status: Status,
                    },
                }),
                invalidatesTags: ["order"],
            }),


        }
    }
})

export const {
    useGetOdersQuery,
    useUpdateStatusMutation,
    useGetUserByIdQuery,
    useGetOdersByIdQuery
} = OrderApi
