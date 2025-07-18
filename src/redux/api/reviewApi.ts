import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateResponse, ITimeStamp } from "../../types/general";
import { BASE_URL } from "../../utils/url";
import { IReview, IReviewResponse } from "@/types/reviewType";

enum ReviewTags {
  REVIEWS = "reviews",
  REVIEW = "review",
}
export const reviewApi = createApi({
  reducerPath: "reviewApi",
  tagTypes: [ReviewTags.REVIEWS, ReviewTags.REVIEW],
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/reviews`,
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
    getAllReviews: builder.query<{ data: IReview[] }, void>({
      query: () => "/",
      providesTags: [ReviewTags.REVIEWS],
    }),
    reviewRoom: builder.mutation<
      CreateResponse & { data: IReview & ITimeStamp },
      IReview
    >({
      query: (reviewData) => ({
        url: "/",
        method: "POST",
        body: reviewData,
      }),
    }),
    getHotelReviews: builder.query<
      {
        data: {
          reviews: IReviewResponse[];
        };
      },
      string
    >({
      query: (id) => `/hotel/${id}`,
      providesTags: [ReviewTags.REVIEW],
    }),
  }),
});

export const {
  useGetAllReviewsQuery,
  useReviewRoomMutation,
  useGetHotelReviewsQuery,
} = reviewApi;
