import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const giftApi = createApi({
    reducerPath: "giftApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        credentials: "include", // if your API needs cookies
    }),
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

