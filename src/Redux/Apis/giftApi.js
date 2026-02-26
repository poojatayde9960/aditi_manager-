import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQuery } from "./auth.Api";

export const giftApi = createApi({
    reducerPath: "giftApi",
    baseQuery,
    tagTypes: ["gift"],
    endpoints: (builder) => ({
        giftGetById: builder.query({
            query: (id) => ({
                url: `/admin/gift/user/${id}`,
                method: "GET",
            }),
            providesTags: ["gift"],
        }),
        addUser: builder.mutation({
            query: (userData) => ({
                url: "/apiEndPoint",
                method: "POST",
                body: userData,
            }),
            invalidatesTags: ["gift"],
        }),
    }),
});

export const { useGiftGetByIdQuery, useAddUserMutation } = giftApi;

