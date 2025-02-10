import HotelCard from "../hotels/HotelCard";
import { Link } from "react-router-dom";
import RecentUsers from "../users/RecentUsers";
import BookingPieChart from "../stats/BookingPieChart";
import AreaChartBox from "../stats/AreaChartBox";
import BarChartBox from "../stats/BarChartBox";
import LineChartBox from "../stats/LineChartBox";
import {
  barChartBookingData,
  barChartBoxVisit,
  bookingRevenueData,
  hotelUserBookingMonthlyStatusData,
  lineChartData,
} from "../../data/stat-data";
import { FaUsersLine } from "react-icons/fa6";
import { LiaHotelSolid } from "react-icons/lia";
import { MdOutlineBedroomParent } from "react-icons/md";
import { BsBookmarksFill } from "react-icons/bs";
import { MdOutlineRateReview } from "react-icons/md";

const Hotels = [
  {
    image: "/hotel-images/img-2.jpg",
    name: "Palm International Hotel ",
    pricePerNight: 542,
  },
  {
    image: "/hotel-images/img-2.jpg",
    name: "Palm Palace International Hotel",
    pricePerNight: 542,
  },
  {
    image: "/hotel-images/img-2.jpg",
    name: "Palm Palace International Hotel",
    pricePerNight: 542,
  },
  {
    image: "/hotel-images/img-2.jpg",
    name: "Palm Palace International Hotel",
    pricePerNight: 542,
  },
  {
    image: "/hotel-images/img-2.jpg",
    name: "Palm Palace International Hotel",
    pricePerNight: 542,
  },
];

function AdminDashboard() {
  const {
    numUsers = 23,
    numHotels = 12,
    numRooms = 98,
    numBookings = 38,
    numReviews = 123,
  } = {};

  const countData = [
    {
      title: "Hotels",
      number: numHotels,
      Icon: <LiaHotelSolid className="size-8" />,
    },
    {
      title: "Users",
      number: numUsers,
      Icon: <FaUsersLine className="size-8" />,
    },
    {
      title: "Rooms",
      number: numRooms,
      Icon: <MdOutlineBedroomParent className="size-8" />,
    },
    {
      title: "Bookings",
      number: numBookings,
      Icon: <BsBookmarksFill className="size-8" />,
    },
    {
      title: "Reviews",
      number: numReviews,
      Icon: <MdOutlineRateReview className="size-8" />,
    },
  ];

  return (
    <div className="flex w-full flex-col">
      <section className="m-3 mb-8 grid grid-cols-1 justify-between gap-4 gap-x-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-10">
        {countData.map(({ title, Icon, number }, i) => (
          <div
            key={i}
            className="text-white flex flex-col items-center rounded bg-gradient-to-br from-[#E0A75E] to-[#E0A75E]/70 p-2 shadow-xl"
          >
            {Icon}
            <span className="text-xl font-semibold md:text-2xl">{number}</span>
            <h3 className="text-sm">{title}</h3>
          </div>
        ))}
      </section>

      <section className="bg-white m-3 my-6 flex justify-between p-4">
        <RecentUsers />
        <BookingPieChart />
      </section>

      <section className="bg-white m-3 my-6 flex h-[500px] p-8">
        <AreaChartBox
          title="Monthly Registered Number of Hotels and Users "
          data={hotelUserBookingMonthlyStatusData}
          dataKeys={["users", "hotels"]}
          colors={["#160ce4", "#15c458"]}
        />
      </section>

      <section className="flex justify-between">
        <div className="bg-white m-3 my-6 h-96 w-full p-6 py-6">
          <BarChartBox data={barChartBoxVisit} />
        </div>
        <div className="bg-white m-3 my-6 h-96 w-full p-6 py-6">
          <BarChartBox data={barChartBookingData} />
        </div>
      </section>
      <section className="bg-white m-3 my-6 flex h-[500px] p-6">
        <AreaChartBox
          title="All Hotels Revenue Analysis"
          data={bookingRevenueData}
          dataKeys={["revenue"]}
          colors={["#15c458"]}
        />
      </section>
      <section className="bg-white mx-3 my-6 flex h-[400px] p-6">
        <LineChartBox data={lineChartData} />
      </section>
      <section className="my-6 flex flex-col">
        <div className="bg-white flex justify-between p-4">
          <h2 className="text-2xl font-bold uppercase">
            Recently added Hotels
          </h2>
          <Link
            to="/dashboard/hotels"
            className="text-white flex items-center rounded-full bg-accent-500 px-2 py-1 text-sm transition-all duration-200 hover:scale-105"
          >
            See more &gt;&gt;
          </Link>
        </div>
        <div className="relative grid md:grid-cols-3 lg:grid-cols-4">
          {Hotels.slice(0, 4).map((room, i) => (
            <HotelCard
              key={i}
              hotelPhoto={room.image}
              hotelName={room.name}
              availableRooms={74}
              pricePerDay={room.pricePerNight}
            />
          ))}
        </div>
      </section>

      <section>
        {/* <BookingTable bookings={RecentBooks} bookingHeaders={bookingHeaders} /> */}
      </section>
    </div>
  );
}

export default AdminDashboard;
