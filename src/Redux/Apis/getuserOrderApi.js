import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQuery } from "./auth.Api";

export const userOrder = createApi({
    reducerPath: "userOrder",
    baseQuery,
    tagTypes: ["userOrder"],
    endpoints: (builder) => {
        return {
            getUsers: builder.query({
                query: () => {
                    return {
                        url: "/apiEndPoint",
                        method: "GET"
                    }
                },
                providesTags: ["userOrder"]
            }),
            addUser: builder.mutation({
                query: userData => {
                    return {
                        url: "/users/order/getOrderById/6960df967eac426486b7c3df",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["userOrder"]
            }),

        }
    }
})

export const { useGetUsersQuery, useAddUserMutation } = userOrder
