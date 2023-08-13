import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "inspector";

type BazarAddRequest = {
  bazar: string;
  amount: number;
  name: string;
  email: string;
};

export const addBazarApi = createApi({
  reducerPath: "bazarAddApi",
  tagTypes: ["bazars"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  endpoints: (builder) => ({
    getBazar: builder.query<any, void>({
      query: () => "/api/add-bazar",
      providesTags: ["bazars"], // Adjust the URL to your API route
    }),
    BazarAdd: builder.mutation<{ success: boolean }, BazarAddRequest>({
      query: (bazarInfo) => ({
        url: "/api/add-bazar", // Adjust the URL to your API route
        method: "POST",
        body: bazarInfo,
      }),
      invalidatesTags: ["bazars"],
    }),
  }),
});

export const { useBazarAddMutation, useGetBazarQuery } = addBazarApi;
