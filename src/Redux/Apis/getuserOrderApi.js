import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userOrder = createApi({
    reducerPath: "userOrder",
    baseUrl: import.meta.env.VITE_BASE_URL,
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
