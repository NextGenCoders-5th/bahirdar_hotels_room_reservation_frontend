import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IRoom, IRoomResponse } from "../../types/roomTypes";
import { CreateResponse, ITimeStamp } from "../../types/general";
import { BASE_URL } from "../../utils/url";

export enum RoomTags {
  ROOMS = "rooms",
  ROOM = "room",
}
export const roomApi = createApi({
  reducerPath: "roomApi",
  tagTypes: [RoomTags.ROOMS, RoomTags.ROOM],
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/rooms`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllRooms: builder.query<IRoomResponse, string | undefined>({
      query: (params) => {
        return params ? `/?${params}` : "/";
      },
      providesTags: [RoomTags.ROOMS],
    }),
    getRoomById: builder.query<{ data: { room: IRoom & ITimeStamp } }, string>({
      query: (id) => `/${id}`,
      providesTags: [RoomTags.ROOM],
    }),
    createRoom: builder.mutation<CreateResponse, FormData>({
      query: (newRoom) => ({
        url: "/",
        method: "POST",
        body: newRoom,
      }),
      invalidatesTags: [RoomTags.ROOMS],
    }),
    updateRoom: builder.mutation<CreateResponse, { id: string; data: IRoom }>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [RoomTags.ROOMS, RoomTags.ROOM],
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
