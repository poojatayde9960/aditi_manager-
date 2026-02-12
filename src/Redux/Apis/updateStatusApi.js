import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const updateStatusApi = createApi({
    reducerPath: "updateStatusApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        credentials: "include",
    }),
    tagTypes: ["order"],
    endpoints: (builder) => ({
        updateStatus: builder.mutation({
            query: ({ orderId, status }) => ({
                url: `/users/order/update-status/${orderId}`,
                method: "PUT",
                body: { Status: status },
            }),
            invalidatesTags: ["order"],
        }),

        // users/order/getOrderById/6960df967eac426486b7c3df
        getOrderDetailById: builder.query({
            query: (orderId) => {
                return {
                    url: `/users/order/getOrderById/${orderId}`,
                    method: "GET"
                }
            },
            providesTags: ["order"]
        }),

    }),
});

export const { useUpdateStatusMutation, useGetOrderDetailByIdQuery } = updateStatusApi;
