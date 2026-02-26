import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./auth.Api";

export const enquiryApi = createApi({
    reducerPath: "enquiryApi",
    baseQuery,
    tagTypes: ["enquiry"],
    endpoints: (builder) => ({
        getEnquiry: builder.query({
            query: () => "/users/contactus/getall",
            providesTags: ["enquiry"],
        }),

        enquiryStatus: builder.mutation({
            query: ({ id }) => ({
                url: `/users/contactus/Contacted/${id}`,
                method: "PUT",
            }),
            invalidatesTags: ["enquiry"],
        }),
        managerContactResolve: builder.mutation({
            query: ({ id, body }) => ({
                url: `manager/contact/resolve/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["enquiry"],
        }),
        enquiryDelete: builder.mutation({
            query: ({ id }) => ({
                url: `/users/contactus/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["enquiry"],
        }),
    }),
});

export const { useGetEnquiryQuery, useEnquiryStatusMutation, useEnquiryDeleteMutation, useManagerContactResolveMutation } = enquiryApi;
