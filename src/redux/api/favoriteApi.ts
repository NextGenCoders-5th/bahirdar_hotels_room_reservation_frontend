import { IHotel } from "@/types/hotelTypes";
import { BASE_URL } from "@/utils/url";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// import { Types } from "mongoose";

export interface IFavoriteBody {
  hotelId: string;
}

export interface IFavorite {
  _id: string;
  user: string;
  hotel: IHotel;
}

export enum FavoriteTags {
  Favorites = "favorites",
  favorite = "favorite",
}

export const favoritesApi = createApi({
  reducerPath: "favoritesApi",
  tagTypes: [FavoriteTags.Favorites, FavoriteTags.favorite],
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/favorites`,
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
    getMyFavorites: builder.query<{ data: IFavorite[] }, void>({
      query: () => "/user",
      providesTags: [FavoriteTags.Favorites],
    }),
    createFavorite: builder.mutation<{ data: IFavorite }, string>({
      query: (hotel) => ({
        url: "/",
        method: "POST",
        body: {
          hotel,
        },
      }),
      invalidatesTags: [FavoriteTags.Favorites, FavoriteTags.favorite],
    }),
    deleteFavorite: builder.mutation<{ data: IFavorite }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
        body: {},
      }),
    }),
  }),
});

export const {
  useGetMyFavoritesQuery,
  useCreateFavoriteMutation,
  useDeleteFavoriteMutation,
} = favoritesApi;
