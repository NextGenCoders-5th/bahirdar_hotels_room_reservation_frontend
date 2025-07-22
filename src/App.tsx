import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext.jsx";
import AppLayout from "./ui/AppLayout";
import AddHotel from "./features/hotels/AddHotel";
import UpdateHotel from "./features/hotels/UpdateHotel";
import Dashboard from "./features/dashboard/Dashboard";
import DashboardLayout from "./features/dashboard/DashboardLayout";
import AllHotels from "./features/hotels/AllHotels";
import Account from "./features/profile/Account";
import AllBookings from "./features/bookings/AllBookings";
import AllUsers from "./features/users/AllUsers";
import HotelRoomsTable from "./features/rooms/HotelRoomsTable";
import AddRoom from "./features/rooms/AddRoom";
import UpdateRoom from "./features/rooms/UpdateRoom";
import {
  AboutPage,
  HomePage,
  HotelsListPage,
  SigninPage,
  SignupPage,
} from "./pages";
import Profile from "./features/profile/Profile";
import AccountSettings from "./features/profile/AccountSettings";
import MyBookings from "./features/profile/MyBookings";
import ProtectAdminRoutes from "./ui/ProtectAdminRoutes";
import HotelsPage from "./features/hotels/HotelsPage.js";
import HotelDetailPage from "./features/hotels/HotelDetailPage.js";
import { HotelDetail } from "./features/hotels/components/HotelDetail.js";
import RoomDetail from "./features/hotels/RoomDetail.js";
import PublicHotelDetailPage from "./pages/hotel-details/HotelDetailPage.js";
import RoomList from "./features/hotels/HotelRooms.js";
import BookingPage from "./features/bookings/BookingPage.js";
import BookingDetails from "./features/bookings/BookingDetail.js";
import HotelBookings from "./features/hotels/HotelBookings.js";
import CompleteOnboarding from "./features/profile/CompleteOnboarding.js";
import IdentityVerification from "./features/profile/IdentityVerification.js";
import PaymentPage from "./features/payments/MakePayment.js";
import IdentityVerificationRequests from "./features/users/IdentityVerificationRequests.js";
import UserDetailForVerification from "./features/users/UserDetailForVerification.js";
import UserPage from "./features/users/UserPage.js";
import UserDetail from "./features/users/UserDetail.js";
import UserBookings from "./features/users/UserBookings.js";
import MyBookingDetail from "./features/profile/MyBookingDetail.js";
import RoomReview from "./features/reviews/ReviewPage.js";
import HotelCashiers from "./features/hotels/HotelCashiers.js";
import ForgotMyPassword from "./features/auth/ForgotMyPassword.js";
import ResetMyPassword from "./features/auth/ResetMyPassword.js";
import { Role } from "./enums/roleEnum.js";
import HotelsTobeReviewd from "./features/reviews/HotelsTobeReviewed.js";
import ToBePayed from "./features/payments/TobePayed.js";
import MyFavoriteGotels from "./features/reviews/FavoriteHotels.js";
import ChatRoom from "./components/ChatRoom.js";

function App() {
  const { role, isLoggedIn, user } = useAuthContext();

  return (
    <>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#f8fafc",
            color: "#0f172a",
          },
        }}
      />

      <BrowserRouter>
        <Routes>
          {/* HOME ROUTES */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="hotels" element={<HotelsListPage />} />
            <Route path="hotels/:hotelId" element={<PublicHotelDetailPage />}>
              <Route index element={<HotelDetail />} />
              <Route path="rooms" element={<RoomList />} />
            </Route>
            <Route
              path="hotels/:hotelId/rooms/:roomId"
              element={<RoomDetail />}
            />
            <Route
              path="hotels/:hotelId/rooms/:roomId/book"
              element={<BookingPage />}
            />
            <Route
              path="hotels/:hotelId/rooms/:roomId/:bookingId/pay"
              element={<PaymentPage />}
            />

            {isLoggedIn && (
              <Route path="account" element={<Account />}>
                <Route path="profile" index element={<Profile />} />
                <Route path="settings" element={<AccountSettings />} />
                <Route path="chat" element={<ChatRoom />} />
                <Route path="bookings" element={<MyBookings />} />
                <Route path="favorites" element={<MyFavoriteGotels />} />
                <Route
                  path="bookings/:bookingId"
                  element={<MyBookingDetail />}
                />
                <Route
                  path="bookings/:bookingId/pay"
                  element={<PaymentPage />}
                />
                <Route
                  path="bookings/:bookingId/review"
                  element={<RoomReview />}
                />

                <Route
                  path={
                    user?.isVerified ? "edit-profile" : "complete-onboarding"
                  }
                  element={<CompleteOnboarding />}
                />

                <Route
                  path="identity-verification"
                  element={<IdentityVerification />}
                />
                {
                  role === Role.USER && (
                    <Route path="to-review" element={<HotelsTobeReviewd />} />
                  )
                }
              </Route>
            )}
          </Route>
          {/* DASHBOARD ROUTES */}
          <Route
            path="/dashboard"
            element={
              <ProtectAdminRoutes>
                <DashboardLayout />
              </ProtectAdminRoutes>
            }
          >
            <Route index element={<Dashboard />} />
            {role === "admin" ? (
              <>

                <Route path="hotels" element={<HotelsPage />}>
                  <Route index element={<AllHotels />} />
                  <Route path="add-hotel" element={<AddHotel />} />
                  <Route path=":hotelId" element={<HotelDetailPage />}>
                    <Route index element={<HotelDetail />} />
                    <Route path="rooms" element={<HotelRoomsTable />} />
                    <Route path="rooms/:roomId" element={<RoomDetail />} />
                    <Route path="add-room" element={<AddRoom />} />
                    <Route path="rooms/:roomId/edit" element={<UpdateRoom />} />
                    <Route path="bookings" element={<HotelBookings />} />
                    <Route
                      path="bookings/:bookingId"
                      element={<BookingDetails />}
                    />
                  </Route>
                  <Route path=":hotelId/edit" element={<UpdateHotel />} />
                </Route>
                <Route path="bookings" element={<AllBookings />} />
                <Route path="to-be-payed" element={<ToBePayed />} />
                <Route
                  path="bookings/:bookingId"
                  element={<BookingDetails />}
                />
                <Route path="users" element={<AllUsers />} />
                <Route path="users/:userId" element={<UserPage />}>
                  <Route index element={<UserDetail />} />
                  <Route path="bookings" element={<UserBookings />} />
                  <Route
                    path="bookings/:bookingId"
                    element={<BookingDetails />}
                  />
                </Route>
                  <Route path="add-hotel" element={<AddHotel />} />
                  <Route
                    path="identity-verification-requests"
                    element={<IdentityVerificationRequests />}
                  />
                  <Route
                    path="identity-verification-requests/:userId"
                    element={<UserDetailForVerification />}
                  />
                </>
            ) : (role === Role.MANAGER || role === Role.CASHIER) ? (
                <>
                  <Route path=":hotelId" element={<HotelDetailPage />}>
                    <Route index element={<HotelDetail />} />
                    <Route path="rooms" element={<HotelRoomsTable />} />
                    <Route path="add-room" element={<AddRoom />} />
                    <Route path="rooms/:roomId" element={<RoomDetail />} />
                    {
                      role === Role.MANAGER ? (
                        <>
                          <Route path="add-room" element={<AddRoom />} />
                          <Route path="rooms/:roomId/edit" element={<UpdateRoom />} /></>
                      ) : null
                    }

                    <Route path="bookings" element={<AllBookings />} />
                  </Route>
                  {
                    role === Role.MANAGER &&
                    <Route path="cashiers" element={<HotelCashiers />} />
                  }

                  <Route
                    path="bookings/:bookingId"
                    element={<BookingDetails />}
                  />
                  {
                    role === Role.MANAGER && (
                      <Route path=":hotelId/edit" element={<UpdateHotel />} />
                    )
                  }
                    <Route path="bookings" element={<HotelBookings />} />
                </>
              ) : null}
          </Route>
          {!isLoggedIn && (
            <>
              <Route path="/forgot-password" element={<ForgotMyPassword />} />
              <Route
                path="/reset-password/:resetToken"
                element={<ResetMyPassword />}
              />

              <Route path="/login" element={<SigninPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </>
          )}
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
