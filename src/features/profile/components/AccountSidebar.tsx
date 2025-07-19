import { Link, useLocation } from "react-router-dom";
import { IDataAccountSidebar } from "../Account";
import { useAuthContext } from "@/context/AuthContext";
import { Role } from "@/enums/roleEnum";
import { useGetAllReviewsQuery } from "@/redux/api/reviewApi";
import { useGetMyBookingsQuery } from "@/redux/api/userApi";

export const AccountSidebar = ({ data }: { data: IDataAccountSidebar[] }) => {
  const { pathname } = useLocation();


  const { user } = useAuthContext()
  const { data: { data: reviews } = {}, isLoading, error } = useGetAllReviewsQuery()
  const { data: { data: { bookings } = {} } = {}, isLoading: loadingBookings, error: bookingLoadErr } = useGetMyBookingsQuery()



  const toBeviewedBookings = bookings?.filter(booking => {
    const hasBeenReviewed = reviews?.some(
      review =>
        review.user === (booking.user as unknown as string) &&
        review.hotel === (booking.hotel as unknown as string)
    );
  
    return new Date(booking.checkIn) < new Date() && !hasBeenReviewed;
  });  return (
    <ul className="hidden md:flex w-[250px] min-w-[250px] flex-col gap-0 space-y-1 border-r-2 border-light-400 text-gray-700">
      {data.filter(data => !(data.pathname === "/account/bookings" && user?.role !== Role.USER)).map((item, i) => (
        <li key={i}>
          <Link
            to={item.to}
            className={`flex w-full items-center rounded-md px-4 py-2 transition-all duration-200 hover:bg-light-200 ${pathname === item.pathname ? "bg-light-300" : ""}`}
          >
            {item.text}
          </Link>
        </li>
      ))}
      {
        (bookingLoadErr || error) && <li className="text-red-500 text-center">Error loading data</li>
      }
      {(loadingBookings || isLoading) && <li className="text-center">Loading...</li>}
      {
        user?.role === Role.USER && toBeviewedBookings && (
          <li>
            <Link
              to="/account/to-review"
              className={`flex w-full items-center rounded-md px-4 py-2 transition-all duration-200 hover:bg-light-200 ${pathname === "/account/reviews" ? "bg-light-300" : ""}`}
            >
              To Reviews ({toBeviewedBookings.length})
            </Link>
          </li>
        )
      }
    </ul>
  );
};
