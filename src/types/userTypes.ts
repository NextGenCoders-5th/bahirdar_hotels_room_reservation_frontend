import { Gender } from "../enums/genderEnum";
import { Role } from "../enums/roleEnum";
import { IAddress } from "./addressTypes";
import { Booking } from "./bookingTypes";
import { ITimeStamp } from "./general";
import { Hotel, IHotel } from "./hotelTypes";

export interface User {
  id?: string;
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  photo: string;
  phoneNumber: string;
  hotel?: Hotel;
  bookings?: Booking[];
  [key: string]: unknown;
}

export interface UserFilter {
  search: string;
  role: string;
  limit: string;
}

export interface ResetPassInterface {
  token: string;
  password: string;
  passwordConfirm: string;
}

export interface UpdatePasswordForm {
  passwordCurrent: string;
  password: string;
  passwordConfirm: string;
}

export interface IUpdateMeForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  photo: FileList;
  phone: string;
}

export interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  username: string;
  dateOfBirth: Date;
  gender: Gender;
  email: string;
  isOnboarding: boolean;
  phoneNumber: string;
  role: Role;
  hotel?: IHotel;
  profilePicture: string;
  idPhoto_back: string;
  idPhoto_front: string;
  address: IAddress;
  isVerified: boolean;
  isVerificationRequested: boolean;
  token?: string;
}

export interface IUserResponse {
  data: (IUser & ITimeStamp)[];
}

export interface UserRegistrationData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender;
  phoneNumber: string;
  address: IAddress;
  idPhoto_back: FileList | string | null;
  idPhoto_front: FileList | string | null;
  profilePicture: FileList | string | null;
}

export interface IOnboardingUser {
  _id: string;
  username: string;
  email: string;
  role: Role;
  isOnboarding: boolean;
  isVerified: boolean;
  isVerificationRequested: boolean;

  isCreated: boolean;
  isUpdated: boolean;
}

export interface ISignup {
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  passwordConfirm: string;
}

export interface ISignupRes {
  status: string;
  isOnboarding: true;
  message: string;
  data: IOnboardingUser;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginRes {
  status: string;
  message: string;
  data: IOnboardingUser;
}
