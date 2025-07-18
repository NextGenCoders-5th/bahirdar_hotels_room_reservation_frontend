import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IBooking, IBookingResponse } from "../../types/bookingTypes";
import { CreateResponse, IPagination, ITimeStamp } from "../../types/general";
import { BASE_URL } from "../../utils/url";
import { IHotel } from "../../types/hotelTypes";
import { BookingStatus } from "../../enums/bookingStatusEnum";
import { IRoom } from "@/types/roomTypes";

export enum BookingTags {
  BOOKINGS = "bookings",
  BOOKING = "booking",
  HOTEL_BOOKINGS = "hotel_bookings",
  ROOM_BOOKINGS = "room_bookings",
}
export const bookingApi = createApi({
  reducerPath: "bookingApi",
  tagTypes: [
    BookingTags.BOOKINGS,
    BookingTags.BOOKING,
    BookingTags.HOTEL_BOOKINGS,
    BookingTags.ROOM_BOOKINGS,
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/bookings`,
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
    getAllBookings: builder.query<
      {
        data: IBookingResponse[];
        pagination: IPagination;
      },
      string | undefined
    >({
      query: (params) => {
        return params
          ? `/all-bookings-with-room-user-hotel-detail?${params}`
          : "/all-bookings-with-room-user-hotel-detail";
      },
      providesTags: [BookingTags.BOOKINGS],
    }),
    getBookingById: builder.query<{ data: IBookingResponse }, string>({
      query: (id) => `/booking-with-room-user-hotel-detail/${id}`,
      providesTags: [BookingTags.BOOKING],
    }),
    createBooking: builder.mutation<
      { data: IBooking } & Omit<CreateResponse, "data">,
      IBooking & { hotelId: string }
    >({
      query: (newBooking) => ({
        url: "/",
        method: "POST",
        body: newBooking,
      }),
      invalidatesTags: (_, __, { room, hotelId }) => {
        return [
          {
            id: room,
            type: BookingTags.ROOM_BOOKINGS,
          },
          BookingTags.BOOKINGS,
          BookingTags.HOTEL_BOOKINGS,
          {
            id: hotelId,
            type: BookingTags.HOTEL_BOOKINGS,
          },
        ];
      },
    }),
    updateBooking: builder.mutation<
      CreateResponse,
      { id: string; data: IBooking }
    >({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [BookingTags.BOOKINGS, BookingTags.BOOKING],
    }),
    deleteBooking: builder.mutation<CreateResponse, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [BookingTags.BOOKINGS, BookingTags.BOOKING],
    }),
    getHotelBookings: builder.query<
      {
        pagination: IPagination;
        hotel: IHotel & ITimeStamp;
        data: (IBookingResponse & ITimeStamp)[];
      },
      { hotelId: string; params: string }
    >({
      query: ({ hotelId, params }) => {
        return `/all-bookings-of-a-hotel/${hotelId}?${params ? params : ""}`;
      },
      providesTags: (_, __, { hotelId }) => {
        return [
          {
            id: hotelId,
            type: BookingTags.HOTEL_BOOKINGS,
          },
          BookingTags.HOTEL_BOOKINGS,
        ];
      },
    }),
    updateBookingStatus: builder.mutation<
      { data: IBooking } & Omit<CreateResponse, "data">,
      {
        bookingId: string;
        userId: string;
        status: BookingStatus;
      }
    >({
      query: ({ userId, bookingId, status }) => {
        const getUrl = () => {
          switch (status) {
            case BookingStatus.CONFIRMED:
              return `/confirm-user-booking/${userId}`;
            case BookingStatus.CHECKED_IN:
              return `/checkin-user-booking/${userId}`;
            case BookingStatus.CHECKED_OUT:
              return `/checkout-user-booking/${userId}`;
            case BookingStatus.REJECTED:
              return `/reject-user-booking/${userId}`;
            default:
              return "";
          }
        };
        return {
          url: `/${bookingId}${getUrl()}`,
          method: "PATCH",
          body: { status },
        };
      },
      invalidatesTags: [BookingTags.BOOKINGS, BookingTags.BOOKING],
    }),
    getRoomBookingsByRoomId: builder.query<
      {
        data: (IBookingResponse & ITimeStamp)[];
        pagination: IPagination;
        room: IRoom & ITimeStamp;
      },
      {
        roomId: string;
        params?: string;
      }
    >({
      query: ({ roomId, params }) => {
        return `/all-bookings-of-a-room/${roomId}?${params ? params : ""}`;
      },
      providesTags: (_, __, { roomId }) => {
        return [
          {
            id: roomId,
            type: BookingTags.ROOM_BOOKINGS,
          },
        ];
      },
    }),
    getUserBookingsByUserId: builder.query<
      {
        data: (IBookingResponse & ITimeStamp)[];
        pagination: IPagination;
      },
      {
        userId: string;
        params?: string;
      }
    >({
      query: ({ userId, params }) =>
        `/all-bookings-of-a-user/${userId}?${params ? params : ""}`,
      providesTags: (_, __, { userId }) => {
        return [
          {
            id: userId,
            type: BookingTags.BOOKINGS,
          },
        ];
      },
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useDeleteBookingMutation,
  useGetAllBookingsQuery,
  useGetBookingByIdQuery,
  useUpdateBookingMutation,
  useGetHotelBookingsQuery,
  useLazyGetHotelBookingsQuery,
  useUpdateBookingStatusMutation,
  useGetRoomBookingsByRoomIdQuery,
  useGetUserBookingsByUserIdQuery,
} = bookingApi;
