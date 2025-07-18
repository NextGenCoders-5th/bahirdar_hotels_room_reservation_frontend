import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IHotel } from "../../types/hotelTypes";
import { ITimeStamp } from "../../types/general";
import { BASE_URL } from "../../utils/url";

export enum RecommendationTags {
  PERSONALIZED_RECOMMENDATIONS = "personalized_recommendations",
  POPULAR_HOTELS = "popular_hotels",
}

export const recommendationsApi = createApi({
  reducerPath: "recommendationsApi",
  tagTypes: [
    RecommendationTags.PERSONALIZED_RECOMMENDATIONS,
    RecommendationTags.POPULAR_HOTELS,
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/recommendations`,
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
    getPersonalizedRecommendations: builder.query<
      { data: (IHotel & ITimeStamp)[] },
      void
    >({
      query: () => `/personal-recommendations`,
      providesTags: [RecommendationTags.PERSONALIZED_RECOMMENDATIONS],
    }),
    getPopularHotels: builder.query<{ data: (IHotel & ITimeStamp)[] }, void>({
      query: () => "/popular-hotels",
      providesTags: [RecommendationTags.POPULAR_HOTELS],
    }),
  }),
});

export const {
  useGetPersonalizedRecommendationsQuery,
  useGetPopularHotelsQuery,
} = recommendationsApi;
