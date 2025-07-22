import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/url";
import { ChatMessage } from "@/types/chat.type";

export interface MessageRoom {
  _id: string;
  roomId: string;
  hotelId: string;
  users: string[];
  messages: ChatMessage[];
}
export const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/messages`,
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
    getMyRooms: builder.query<{data: {rooms: MessageRoom[]}}, void>({
      query: () => ({
        url: `/my-rooms`,
        method: "GET",
      }),
    }),
  }),
});

export const {  useGetMyRoomsQuery } = messageApi;
