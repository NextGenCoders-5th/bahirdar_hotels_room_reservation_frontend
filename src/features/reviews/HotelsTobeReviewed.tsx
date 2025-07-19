import { Card } from "@/components/ui/card";
import LoadingPage from "@/pages/utils/LoadingPage";
import { useGetAllHotelsQuery } from "@/redux/api/hotelApi";
import { useGetAllReviewsQuery } from "@/redux/api/reviewApi";
import { useGetMyBookingsQuery } from "@/redux/api/userApi";
import { cn } from "@/utils/cn";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const HotelsTobeReviewd = () => {
  const navigate = useNavigate();
  const { data: { data: hotels } = {}, isLoading: fetchingHotels, error: fetchHotelError } = useGetAllHotelsQuery("")
  const { data: { data: reviews } = {}, isLoading, error } = useGetAllReviewsQuery()
  const { data: { data: { bookings } = {} } = {}, isLoading: loadingBookings, error: bookingLoadErr } = useGetMyBookingsQuery()

  if (loadingBookings || isLoading || fetchingHotels) {
    return <LoadingPage />;
  }
  if (fetchHotelError || error || bookingLoadErr) {
    console.error("Error fetching data:", fetchHotelError || error || bookingLoadErr);
  }
  const toBeviewedBookings = bookings?.filter(booking => {
    const hasBeenReviewed = reviews?.some(
      review =>
        review.user === (booking.user as unknown as string) &&
        review.hotel === (booking.hotel as unknown as string)
    );
  
    return new Date(booking.checkIn) < new Date() && !hasBeenReviewed;
  });
    return (
    <div className="p-6 space-y-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900">Hotels To be Reviewed</h2>
      {
        (bookingLoadErr || error || fetchHotelError) && <p className="text-red-500">Error loading data</p>
      }
      {(loadingBookings || isLoading || fetchingHotels) && <LoadingPage />
      }
      {toBeviewedBookings && toBeviewedBookings?.length > 0 ? (
        hotels?.filter(hotel => toBeviewedBookings.some(booking => booking.hotel as unknown as string === hotel._id)).map((hotel) => (
          <Card key={hotel._id} className=" relative p-4 rounded-xl w-full flex shadow-md justify-start gap-4 flex-col md:flex-row items-stretch md:items-center bg-white">
            <div className="flex flex-col">
              <img src={hotel.imageCover} alt={hotel.name} className="w-60 h-32 rounded-md object-cover" />
              <div className="w-[200px]">
                <h3 className=" text-slate-700 font-bold">{hotel.name}</h3>
                <p className="text-sm text-gray-500">Hotel Star{hotel.hotelStar}/5</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Min Price Per Night: {hotel.minPricePerNight}</h3>
                <p className="text-sm text-gray-500">Description: {new Date(hotel.description).toLocaleDateString()}</p>
                <p className="text-sm text-gray-500 flex gap-2 items-center">
                  <span>
                    Average Rating:
                  </span>
                  <span className="flex items-center">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <FaStar key={index} className={cn("", index < hotel.avgRating ? "text-yellow-500" : "text-slate-700")} />
                    ))}
                  </span>
                </p>
                <p className="text-sm text-gray-500">Facilities: <span className="font-medium text-accent-500">{hotel.facilities.join(",")}</span></p>
              </div>
            </div>
            <button
              className="absolute bottom-2 right-2 bg-accent-500/95 hover:bg-accent-500 text-white px-4 py-2 rounded-md mt-4 md:mt-0"
              onClick={() => {
                navigate("/account/bookings/"+toBeviewedBookings.find(booking=>booking.hotel as unknown as string === hotel._id)?._id+ "/review");
              }}
            >
              Review
            </button>
          </Card>
        ))
      ) : (
        <p className="text-gray-500">No hotels to be reviewed available.</p>
      )}
    </div>
  );
};

export default HotelsTobeReviewd;
