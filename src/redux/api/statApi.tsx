import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/url";
import {  IHotelStatsResponse } from "../../types/stat.type";

export const statsApi = createApi({
  reducerPath: "statsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/stats`,
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
    getHotelStat: builder.query<IHotelStatsResponse, string>({
      query: (id) => ({
        url: `/hotels/${id}`,
        method: "GET",
      }),
    }),
    getAdminStat: builder.query<IHotelStatsResponse, void>({
      query: () => ({
        url: `/admin`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetHotelStatQuery, useGetAdminStatQuery } = statsApi;
