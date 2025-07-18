import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser, User } from "../../types/userTypes";
import { CreateResponse, IPagination, ITimeStamp } from "../../types/general";
import { BASE_URL } from "../../utils/url";
import { IBookingResponse } from "@/types/bookingTypes";

export enum UserTags {
  USERS = "users",
  USER = "user",
}
export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: [UserTags.USERS, UserTags.USER],
  
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    baseUrl: `${BASE_URL}/users`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<
      {
        data: (IUser & ITimeStamp)[];
        pagination: IPagination;
      },
      string | undefined
    >({
      query: (params) => {
        return params ? `/?${params}` : "/";
      },
      providesTags: [UserTags.USERS],
    }),
    getUserById: builder.query<{ data: IUser }, string>({
      query: (id) => `/${id}`,
      providesTags: [UserTags.USER],
    }),
    createUser: builder.mutation<CreateResponse, IUser>({
      query: (newUser) => ({
        url: "/",
        method: "POST",
        body: {
          ...newUser,
          password: "test1234",
          passwordConfirm: "test1234",
        },
      }),
      invalidatesTags: [UserTags.USERS],
    }),
    updateUser: builder.mutation<
      CreateResponse,
      { id: string; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [UserTags.USERS, UserTags.USER],
    }),
    deleteUser: builder.mutation<CreateResponse, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [UserTags.USERS, UserTags.USER],
    }),
    getCurrentUser: builder.query<{ data: IUser }, void>({
      query: () => "/current-user",
      providesTags: [UserTags.USER],
    }),
    completeOnboarding: builder.mutation<User, FormData>({
      query: (data) => ({
        url: "/complete-onboarding",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [UserTags.USERS, UserTags.USER],
    }),
    requestIdentityVerification: builder.mutation<{ data: User }, void>({
      query: () => ({
        url: "/request-identity-verification",
        method: "PATCH",
        body: {},
      }),
      invalidatesTags: [UserTags.USERS, UserTags.USER],
    }),
    verifyUserAccount: builder.mutation<{ data: User }, string>({
      query: (id: string) => ({
        url: `/verify-user-account/${id}`,
        method: "PATCH",
        body: {},
      }),
      invalidatesTags: [UserTags.USERS, UserTags.USER],
    }),
    verificationRequestedUsers: builder.query<{ data: IUser[] }, void>({
      query: () => ({
        url: "/verification-requests",
        method: "GET",
      }),
      providesTags: [UserTags.USERS, UserTags.USER],
    }),
    declineVerificationRequest: builder.mutation<{ data: IUser }, string>({
      query: (id: string) => ({
        url: `/decline-verification-request/${id}`,
        method: "PATCH",
        body: {},
      }),
      invalidatesTags: [UserTags.USERS, UserTags.USER],
    }),
    getMyBookings: builder.query<
      {
        data: {
          user: IUser;
          bookings: (IBookingResponse & ITimeStamp)[];
        };
      },
      void
    >({
      query: () => "/user-with-bookings",
    }),
    addCashier: builder.mutation<CreateResponse, { id: string; data: IUser }>({
      query: ({ id, data }) => ({
        url: `/add-cashier/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useGetCurrentUserQuery,
  useCompleteOnboardingMutation,
  useRequestIdentityVerificationMutation,
  useVerifyUserAccountMutation,
  useVerificationRequestedUsersQuery,
  useDeclineVerificationRequestMutation,
  useGetMyBookingsQuery,
} = userApi;
