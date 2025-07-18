import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IHotel } from "../../types/hotelTypes";
import { CreateResponse, IPagination, ITimeStamp } from "../../types/general";
import { BASE_URL } from "../../utils/url";
import { IRoom } from "../../types/roomTypes";
import { IUser } from "@/types/userTypes";

export enum HotelTags {
  HOTELS = "hotels",
  HOTEL = "hotel",
  HOTEL_ROOMS = "hotel_rooms",
  HOTEL_CASHIERS = "hotel_cashiers",
}
export const hotelApi = createApi({
  reducerPath: "hotelApi",
  tagTypes: [
    HotelTags.HOTELS,
    HotelTags.HOTEL,
    HotelTags.HOTEL_ROOMS,
    HotelTags.HOTEL_CASHIERS,
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/hotels`,
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
    getAllHotels: builder.query<
      { data: (IHotel & ITimeStamp)[]; pagination: IPagination },
      string | undefined
    >({
      query: (params) => {
        const searchParams = new URLSearchParams(params);
        return params ? `/?${searchParams}` : "/";
      },
      providesTags: [HotelTags.HOTELS],
    }),
    getHotelById: builder.query<
      { data: { hotel: IHotel & ITimeStamp } },
      string
    >({
      query: (id) => `/${id}`,
      providesTags: [HotelTags.HOTEL],
    }),
    createHotel: builder.mutation<CreateResponse, FormData>({
      query: (newHotel) => ({
        url: "/",
        method: "POST",
        body: newHotel,
      }),
      invalidatesTags: [HotelTags.HOTELS],
    }),
    updateHotel: builder.mutation<
      CreateResponse,
      { id: string; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [HotelTags.HOTELS, HotelTags.HOTEL],
    }),
    deleteHotel: builder.mutation<CreateResponse, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [HotelTags.HOTELS, HotelTags.HOTEL],
    }),
    getHotelRooms: builder.query<{ data: IHotel & { rooms: IRoom[] } }, string>(
      {
        query: (id) => `/with-rooms/${id}`,
        providesTags: (result, error, id) => [{ type: HotelTags.HOTEL_ROOMS, id }],
      },
    ),
    createCashier: builder.mutation<
      CreateResponse,
      { hotelId: string; userId: string }
    >({
      query: ({ hotelId, userId }) => ({
        url: `/${hotelId}/create-cashiers/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: [HotelTags.HOTELS],
    }),
    deleteCashier: builder.mutation<
      CreateResponse,
      { hotelId: string; userId: string }
    >({
      query: ({ hotelId, userId }) => ({
        url: `/${hotelId}/delete-cashiers/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: [HotelTags.HOTELS],
    }),
    getHotelCashiers: builder.query<
      { data: IUser[]; pagination: IPagination },
      { hotelId: string; params: string }
    >({
      query: ({ params, hotelId }) =>
        `/${hotelId}/all-cashiers${params ? `?${params}` : ""}`,
    }),
  }),
});

export const {
  useCreateHotelMutation,
  useDeleteHotelMutation,
  useGetAllHotelsQuery,
  useGetHotelByIdQuery,
  useUpdateHotelMutation,
  useGetHotelRoomsQuery,
  useCreateCashierMutation,
  useDeleteCashierMutation,
  useGetHotelCashiersQuery,
} = hotelApi;

