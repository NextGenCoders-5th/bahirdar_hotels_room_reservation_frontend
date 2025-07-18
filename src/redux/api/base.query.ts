import { BASE_URL } from "@/utils/url";
import {  fetchBaseQuery } from "@reduxjs/toolkit/query/react";

  export const baseQuery = fetchBaseQuery({
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    baseUrl: `${BASE_URL}/users`,
    credentials: "include",
  });