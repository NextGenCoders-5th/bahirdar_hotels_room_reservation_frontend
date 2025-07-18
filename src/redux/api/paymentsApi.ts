import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/url";
import { IAcceptPayment } from "../../types/paymentsType";

export const paymentsApi = createApi({
  reducerPath: "paymentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/payments`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    // acceptPayment: builder.mutation<{ data: IAcceptPayment }, string>({
    //   query: (id) => ({
    //     url: `/chapa/accept-booking-payment/${id}`,
    //     method: "PATCH",
    //     body: {},
    //   }),
    // }),
    acceptPayment: builder.query<IAcceptPayment, string>({
      query: (id) => ({
        url: `/chapa/accept-booking-payment/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAcceptPaymentQuery } = paymentsApi;
