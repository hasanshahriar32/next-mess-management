import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type } from "os";

type BazarAddRequest = {
  bazar: string;
  amount: number;
  name: string;
  email: string;
  month: string;
};
type UpdateBazarAddRequest = {
  newBazar: string;
  newAmount: number;
  newName: string;
  newEmail: string;
  newMonth: string;
};

type signupInfoType = {
  name: string;
  email: string;
  role: string;
  password: string;
};
type userInfoType = {
  email: string;
};

type HomeRentAndBillsRequest = {
  bills: number;
  homeRent: number;
  name: string;
  email: string;
  month: string;
};

export const addBazarApi = createApi({
  reducerPath: "bazarAddApi",
  tagTypes: ["bazars", "homeRent", "users"],

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
    updateBazar: builder.mutation<
      void,
      { id: string; updatedBazarData: UpdateBazarAddRequest }
    >({
      query: ({ id, updatedBazarData }) => ({
        url: `/api/add-bazar/${id}`, // Adjust the URL pattern according to your API
        method: "PUT",
        body: updatedBazarData,
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
    AddHomeAndBills: builder.mutation<
      { success: boolean },
      HomeRentAndBillsRequest
    >({
      query: (expenses) => ({
        url: "/api/add-homerent-bills", // Adjust the URL to your API route
        method: "POST",
        body: expenses,
      }),
      invalidatesTags: ["homeRent"],
    }),
    GetHomeAndBills: builder.query<any, void>({
      query: () => "/api/add-homerent-bills",
      providesTags: ["homeRent"],
    }),
    RemoveHomeRentAndBills: builder.mutation<
      { success: boolean },
      HomeRentAndBillsRequest
    >({
      query: (id) => ({
        url: `/api/add-homerent-bills?id=${id}`, // Adjust the URL to your API route
        method: "DELETE",
      }),
      invalidatesTags: ["homeRent"],
    }),

    AddUsers: builder.mutation<{ success: boolean }, signupInfoType>({
      query: (underInfo) => ({
        url: "/api/signup", // Adjust the URL to your API route
        method: "POST",
        body: underInfo,
      }),
      invalidatesTags: ["users"],
    }),
    getSingleUser: builder.query<any, void>({
      query: (email) => `/api/user/${email}`,
      providesTags: ["users"], // Adjust the URL to your API route
    }),
    updateUser: builder.mutation<void, { id: string; updatedUser: any }>({
      query: ({ id, updatedUser }) => ({
        url: `/api/user/update-user/${id}`, // Adjust the URL pattern according to your API
        method: "PATCH",
        body: updatedUser,
      }),
      invalidatesTags: ["users"],
    }),
    AllUser: builder.query<any, void>({
      query: () => `/api/user`,
      providesTags: ["users"],
    }),
    DeleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/user?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useBazarAddMutation,
  useGetBazarQuery,
  useRemoveBazarMutation,
  useGetSingleBazarQuery,
  useUpdateBazarMutation,
  useAddHomeAndBillsMutation,
  useGetHomeAndBillsQuery,
  useRemoveHomeRentAndBillsMutation,
  useAddUsersMutation,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useAllUserQuery,
  useDeleteUserMutation,
} = addBazarApi;
