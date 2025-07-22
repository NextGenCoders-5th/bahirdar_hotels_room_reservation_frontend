import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import { hotelApi } from "./api/hotelApi";
import { roomApi } from "./api/roomsApi";
import { bookingApi } from "./api/bookingApi";
import { paymentsApi } from "./api/paymentsApi";
import { authApi } from "./api/authApi";
import { reviewApi } from "./api/reviewApi";
import { recommendationsApi } from "./api/recommendationsApi";
import { favoritesApi } from "./api/favoriteApi";
import { statsApi } from "./api/statApi";
import {messageApi} from "./api/messageApi"; // Importing messageApi for side effects
import chatReduser from "./reducers/chat.slice"; // Importing chat slice reducer
export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [hotelApi.reducerPath]: hotelApi.reducer,
    [roomApi.reducerPath]: roomApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    [paymentsApi.reducerPath]: paymentsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [recommendationsApi.reducerPath]: recommendationsApi.reducer,
    [favoritesApi.reducerPath]: favoritesApi.reducer,
    [statsApi.reducerPath]: statsApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer, // Adding messageApi reducer
    chat: chatReduser, // Adding chat slice reducer to the store
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(hotelApi.middleware)
      .concat(roomApi.middleware)
      .concat(bookingApi.middleware)
      .concat(paymentsApi.middleware)
      .concat(authApi.middleware)
      .concat(reviewApi.middleware)
      .concat(recommendationsApi.middleware)
      .concat(favoritesApi.middleware)
      .concat(statsApi.middleware)
      .concat(messageApi.middleware), // Adding messageApi middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
