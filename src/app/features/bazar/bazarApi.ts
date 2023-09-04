import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type } from "os";

type BazarAddRequest = {
  bazar: string;
  amount: number;
  name: string;
  email: string;
  month: string;
  bazarStatus: boolean;
};
type UpdateBazarAddRequest = {
  newBazar: string;
  newAmount: number;
  newName: string;
  newEmail: string;
  newMonth: string;
  newBazarStatus: boolean;
};

type ApproveBazarAddRequest = {
  newBazarStatus: boolean;
};

type signupInfoType = {
  name: string;
  email: string;
  role: string;
  password: string;
  bloodGroup: string;
  idCard: number;
  messMemberStatus: boolean;
  month: string;
  parentNumber: number;
  personalNumber: number;
  religious: string;
  selectedImage: string;
  reportCardStatus: boolean;
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
  homeRentAndBills: boolean;
  homeRentDate: String;
  dayOfMonth: Number;
  year: Number;
};

type ApproveHomeRentAndBillsRequest = {
  newHomeRentAndBills: boolean;
};
interface DynamicDataItem {
  name: string;
  total: number;
  personAmount: number;
  expenseForMeal: number;
  paymentDifference: number;
}

interface Data {
  average: number;
  dynamicData: DynamicDataItem[];
  month: string;
  totalBazar: number;
  totalMeal: number;
  userEmail: string;
  homeRent: number;
  bills: number;
}

type billsInterface = {
  netBill: number;
  gasBill: number;
  electricityBill: number;
};

type homeRentAndBillsSubSchema = {
  homeRent: number;
  bills: billsInterface[];
  user: string;
  date: string;
  dayOfMonth: number;
  email: string;
  month: string;
  year: number;
};

export const addBazarApi = createApi({
  reducerPath: "bazarAddApi",
  tagTypes: [
    "bazars",
    "homeRent",
    "users",
    "reportCard",
    "homeRentAndBills",
    "mealCount",
  ],

  baseQuery: fetchBaseQuery({
    baseUrl: "https://inn.vercel.app",
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
    approveBazar: builder.mutation<
      void,
      { id: string; updatedBazarData: ApproveBazarAddRequest }
    >({
      query: ({ id, updatedBazarData }) => ({
        url: `/api/add-bazar/${id}`, // Adjust the URL pattern according to your API
        method: "PATCH",
        body: updatedBazarData,
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
    ApproveHomeRentAndBills: builder.mutation<
      void,
      { id: string; expenses: ApproveHomeRentAndBillsRequest }
    >({
      query: ({ id, expenses }) => ({
        url: `/api/add-homerent-bills/${id}`, // Adjust the URL to your API route
        method: "PATCH",
        body: expenses,
      }),
      invalidatesTags: ["homeRent"],
    }),
    GetHomeAndBills: builder.query<any, void>({
      query: () => "/api/add-homerent-bills",
      providesTags: ["homeRent"],
    }),
    getSingleHomeRentAndBills: builder.query<any, void>({
      query: (email) => `/api/add-homerent-bills/get-homerent-bills/${email}`,
      providesTags: ["homeRent"], // Adjust the URL to your API route
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
    AddReportCard: builder.mutation<{ success: boolean }, Data>({
      query: (reportCard) => ({
        url: "/api/report-card", // Adjust the URL to your API route
        method: "POST",
        body: reportCard,
      }),
      invalidatesTags: ["reportCard"],
    }),
    getReportCard: builder.query<any, void>({
      query: () => `/api/report-card`,
      providesTags: ["reportCard"],
    }),

    AddSelectHomeRentAndBills: builder.mutation<{ success: boolean }, any>({
      query: (homeRentAndBills) => ({
        url: "/api/select-homerent-bills", // Adjust the URL to your API route
        method: "POST",
        body: homeRentAndBills,
      }),
      invalidatesTags: ["homeRentAndBills"],
    }),
    getSelectHomeRentAndBills: builder.query<any, void>({
      query: () => `/api/select-homerent-bills`,
      providesTags: ["homeRentAndBills"],
    }),
    getSingleSelectHomeRentAndBills: builder.query<any, void>({
      query: (email) => `/api/select-homerent-bills/${email}`,
      providesTags: ["homeRentAndBills"], // Adjust the URL to your API route
    }),

    AddMealCount: builder.mutation<{ success: boolean }, any>({
      query: (mealCount) => ({
        url: "/api/meal-count", // Adjust the URL to your API route
        method: "POST",
        body: mealCount,
      }),
      invalidatesTags: ["mealCount"],
    }),
    getMealCount: builder.query<any, void>({
      query: () => `/api/meal-count`,
      providesTags: ["mealCount"],
    }),
    RemoveMealCount: builder.mutation<{ success: boolean }, any>({
      query: (id) => ({
        url: `/api/meal-count?id=${id}`, // Adjust the URL to your API route
        method: "DELETE",
      }),
      invalidatesTags: ["mealCount"],
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
  useApproveHomeRentAndBillsMutation,
  useGetSingleHomeRentAndBillsQuery,
  useAddReportCardMutation,
  useGetReportCardQuery,
  useAddSelectHomeRentAndBillsMutation,
  useGetSelectHomeRentAndBillsQuery,
  useGetSingleSelectHomeRentAndBillsQuery,
  useAddMealCountMutation,
  useGetMealCountQuery,
  useRemoveMealCountMutation,
} = addBazarApi;
