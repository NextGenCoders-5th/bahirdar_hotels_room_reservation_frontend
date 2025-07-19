import { Link } from "react-router-dom";

import BookingCard from "../bookings/BookingCard";
import { useAuthContext } from "../../context/AuthContext";
import CustomLabeledPieChart from "../stats/CustomLabeledPieChart";
import {
  barChartBookingData,
  lineChartData,
} from "../../data/stat-data";
import BarChartBox from "../stats/BarChartBox";
import LineChartBox from "../stats/LineChartBox";
import MaxWidthWrapper from "../../ui/MaxWidthWrapper";
import { useGetHotelBookingsQuery } from "@/redux/api/bookingApi";
import { useGetHotelRoomsQuery } from "@/redux/api/hotelApi";
import LoadingPage from "@/pages/utils/LoadingPage";
import { useGetHotelStatQuery } from "@/redux/api/statApi";


function ManagerDashboard() {
  const { user } = useAuthContext();



  const { data: { data: bookings } = {}, isLoading, error } = useGetHotelBookingsQuery({ hotelId: user?.hotel?._id || "", params: "" }, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    skip: !user?.hotel?._id,
  });
 
  const { data: { data: { rooms } = {} } = {}, isLoading: fetchingRooms, error: roomError } = useGetHotelRoomsQuery(user?.hotel?._id as string, {
    skip: !user?.hotel?._id,
  });

  const {data: {data: stat} ={}, isLoading: statFetching} = useGetHotelStatQuery(user?.hotel?._id as string, {
    skip: !user?.hotel?._id,
  });


  if (isLoading || fetchingRooms || statFetching) {
    return <LoadingPage />;
  }




  const { allBookings: numBookings = 0,
    allUsers: numUsers = 0,
    allRooms: numRooms = 0,
    allReviews: numReviews = 0
   } = stat || {
    allBookings: 0,
    allReviews: 0,
    allRooms: 0,
    allUsers: 0,
  };

  const managerStats = [
    {
      icon: <img
        src="/icons/room.png"
        alt="booking"
        className="w-16 h-16"
      />,
      title: "Rooms",
      number: numRooms,
    },
    {
      icon: <img
        src="/icons/booked.png"
        alt="booking"
        className="w-16 h-16"
      />,
      title: "Bookings",
      number: numBookings,
    },
    {
      icon: <img
        src="/icons/users.png"
        alt="booking"
        className="w-16 h-16"
      />,
      title: "Booked Users",
      number: numUsers,
    },
    {
      icon: <img
        src="/icons/reviews.png"
        alt="booking"
        className="w-16 h-16"
      />,
      title: "Reviews",
      number: numReviews,
    },
  ];

  console.log("Manager Dashboard Stats: ", stat);

  return (
    <>
      <div className="flex w-[80vw]   flex-col gap-5 overflow-hidden">
        <div className="border-black/7   w-full border bg-black/5">
          <section className="m-3  mb-8 grid w-full grid-cols-1 gap-4   gap-x-3 sm:grid-cols-2  lg:grid-cols-4 lg:gap-x-4">
            {managerStats.map(({ title, icon, number }, i) => (
              <div
                key={i}
                className="flex  items-center  px-6 h-[7rem] shadow-slate-200 w-full md:w-[17rem]  justify-between rounded bg-gradient-to-br p-4 text-slate-800 shadow-lg"
              >
                <div className="flex">
                  {icon}
                </div>
                <div className="flex flex-col items-center justify-between">
                  <span className="text-xl font-semibold md:text-2xl">
                    {number}
                  </span>
                  <h3 className="text-sm">{title}</h3>
                </div>
              </div>
            ))}
          </section>
        </div>

        <MaxWidthWrapper className="border-black/7 w-full border bg-black/5">
          <section className="h-96 w-full">
            <CustomLabeledPieChart />
          </section>
        </MaxWidthWrapper>

        <MaxWidthWrapper className="border-black/7 w-full border bg-black/5">
          <section className="flex justify-between">
            <div className="m-3 my-6 h-96 w-full p-6 py-6">
              <BarChartBox data={barChartBookingData} />
            </div>
          </section>
        </MaxWidthWrapper>


        <section className="mx-3 my-6 flex h-[400px] p-6">
          <LineChartBox
            data={lineChartData}
            title={"Stats for Booked  Users and Bookings over Time"}
          />
        </section>

        <section className="my-6 flex flex-col">
          <div className="flex justify-between p-4">
            <h2 className="text-2xl font-bold uppercase">
              Recently Booked Rooms
            </h2>
            <Link
              to="/dashboard/bookings"
              className="flex items-center rounded-full bg-accent-500 px-2 py-1 text-sm text-white transition-all duration-200 hover:scale-105"
            >
              See more &gt;&gt;
            </Link>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4">
            {
              (isLoading || fetchingRooms)
                ?
                <LoadingPage />
                :
                (error || roomError)
                  ?
                  <p className="text-red-600">Error fetching rooms</p>
                  :
                  (!rooms?.length || !bookings?.length)
                    ?
                    <p className="text-red-600">No rooms available</p>
                    :
                    rooms?.filter(room => bookings.some(booking => booking.room._id === room._id)).map((room, i) => (
                      <BookingCard
                        key={i}
                        photo={room.images[0]}
                        roomNumber={room.roomNumber}
                        pricePerNight={room.pricePerNight}
                        type={room.roomType}
                      />
                    ))
            }

          </div>
        </section>


      </div>
      {/* {Array.isArray(hotel.rooms) && hotel?.hotel.rooms.length < 1 && <ModalAddRoom hotel={hotel.hotel} />} */}
    </>
  );
}

export default ManagerDashboard;
