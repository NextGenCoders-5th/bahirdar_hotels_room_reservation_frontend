import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IRoom, IRoomResponse } from "../../types/roomTypes";
import { CreateResponse, ITimeStamp } from "../../types/general";
import { BASE_URL } from "../../utils/url";
import { HotelTags } from "./hotelApi";

export enum RoomTags {
  ROOMS = "rooms",
  ROOM = "room",
  ROOMS_BY_HOTEL = "hotel_rooms",
}
export const roomApi = createApi({
  reducerPath: "roomApi",
  tagTypes: [
    RoomTags.ROOMS,
    RoomTags.ROOM,
    HotelTags.HOTEL_ROOMS,
    RoomTags.ROOMS_BY_HOTEL,
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/rooms`,
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
    getAllRooms: builder.query<IRoomResponse, string | undefined>({
      query: (params) => {
        return params ? `/?${params}` : "/";
      },
      providesTags: [RoomTags.ROOMS],
    }),
    getRoomById: builder.query<{ data: IRoom & ITimeStamp }, string>({
      query: (id) => `/${id}`,
      providesTags: [RoomTags.ROOM],
    }),
    createRoom: builder.mutation<
      CreateResponse,
      { data: FormData; hotelId: string }
    >({
      query: ({ data }) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_, __, { hotelId }) => [
        { type: HotelTags.HOTEL_ROOMS, id: hotelId },
        RoomTags.ROOMS,
        RoomTags.ROOM,
      ],
    }),
    updateRoom: builder.mutation<
      CreateResponse,
      { id: string; data: FormData; hoteldId: string }
    >({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_, __, { hoteldId }) => [
        { type: HotelTags.HOTEL_ROOMS, hoteldId },
        RoomTags.ROOMS,
        RoomTags.ROOM,
      ],
    }),
    deleteRoom: builder.mutation<CreateResponse, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [RoomTags.ROOMS, RoomTags.ROOM],
    }),
  }),
});

export const {
  useCreateRoomMutation,
  useDeleteRoomMutation,
  useGetAllRoomsQuery,
  useGetRoomByIdQuery,
  useUpdateRoomMutation,
} = roomApi;
