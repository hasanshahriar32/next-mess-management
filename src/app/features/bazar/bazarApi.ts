import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
    getSingleBazar: builder.query<any, void>({
      query: (id) => `/api/add-bazar/${id}`,
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
    UpdateBazar: builder.mutation<
      { success: boolean },
      { id: string; bazarInfo: BazarAddRequest }
    >({
      query: ({ id, bazarInfo }) => ({
        url: `/api/add-bazar/${id}`, // Adjust the URL to your API route
        method: "PUT",
        body: bazarInfo,
      }),
      invalidatesTags: ["bazars"],
    }),
    RemoveBazar: builder.mutation<{ success: boolean }, BazarAddRequest>({
      query: (id) => ({
        url: `/api/add-bazar?id=${id}`, // Adjust the URL to your API route
        method: "DELETE",
      }),
      invalidatesTags: ["bazars"],
    }),
  }),
});

export const {
  useBazarAddMutation,
  useGetBazarQuery,
  useRemoveBazarMutation,
  useGetSingleBazarQuery,
  useUpdateBazarMutation,
} = addBazarApi;
