import { BookingStatus } from "../enums/bookingStatusEnum";
import { ITimeStamp } from "./general";
import { Hotel } from "./hotelTypes";
import { Room } from "./roomTypes";
import { User } from "./userTypes";

export interface Booking {
  id: number;
  roomId: number;
  userId: number;
  hotel: Hotel;
  user: User;
  room: Room;
  numOfNights: number;
  checkInDate: string;
  checkOutDate: string;
  status: string;
  [key: string]: unknown;
}

export interface BookingFilter {
  status: string;
  hotelId: string;
}

export interface BookingPayment {
  roomId: string;
  checkIn: string;
  checkOut: string;
  tx_ref?: string;
}

export interface IBooking {
  _id?: string;
  user?: string;
  room: string;
  checkIn: Date;
  checkOut: Date;
  status: BookingStatus;
  numOfNights?: number;
  totalPrice?: number;
  pricePerNight?: number;
}

export interface AvailableDates {
  startDate: Date;
  endDate: Date;
  numberOfNights: number;
  pricePerNight: number;
  room: string;
}

export interface IBookingResponse extends Omit<IBooking, "room" | "user">, ITimeStamp {
  isPaid: boolean;
  user: User;
  room: Room & { hotel: Hotel };
  hotel: Hotel;
}
