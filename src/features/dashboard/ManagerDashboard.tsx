import { Link } from "react-router-dom"
import BookingCard from "../bookings/BookingCard"
import { useAuthContext } from "../../context/AuthContext"
import CustomLabeledPieChart from "../stats/CustomLabeledPieChart"
import { barChartBookingData, lineChartData } from "../../data/stat-data"
import BarChartBox from "../stats/BarChartBox"
import LineChartBox from "../stats/LineChartBox"
import { useGetHotelBookingsQuery } from "@/redux/api/bookingApi"
import { useGetHotelRoomsQuery } from "@/redux/api/hotelApi"
import LoadingPage from "@/pages/utils/LoadingPage"
import { useGetHotelStatQuery } from "@/redux/api/statApi"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Hotel, TrendingUp, ArrowRight, BarChart3, PieChart, Activity } from "lucide-react"
import { Skeleton } from "@/@components/components/ui/skeleton"

function ManagerDashboard() {
  const { user } = useAuthContext()

  const {
    data: { data: bookings } = {},
    isLoading,
    error,
  } = useGetHotelBookingsQuery(
    {
      hotelId: user?.hotel?._id || "",
      params: "",
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      skip: !user?.hotel?._id,
    },
  )

  const {
    data: {
      data: { rooms } = {},
    } = {},
    isLoading: fetchingRooms,
    error: roomError,
  } = useGetHotelRoomsQuery(user?.hotel?._id as string, {
    skip: !user?.hotel?._id,
  })

  const {
    data: { data: stat } = {},
    isLoading: statFetching,
  } = useGetHotelStatQuery(user?.hotel?._id as string, {
    skip: !user?.hotel?._id,
  })

  if (isLoading || fetchingRooms || statFetching) {
    return <LoadingPage />
  }

  const {
    allBookings: numBookings = 0,
    allUsers: numUsers = 0,
    allRooms: numRooms = 0,
    allReviews: numReviews = 0,
  } = stat || {
    allBookings: 0,
    allReviews: 0,
    allRooms: 0,
    allUsers: 0,
  }

  

  const managerStats = [
    {
      icon:  <img
      src="/icons/room.png"
      alt="booking"
      className="w-16 h-16"
    />,
      title: "Total Rooms",
      number: numRooms,
      description: "Available rooms",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon:  <img
      src="/icons/booked.png"
      alt="booking"
      className="w-16 h-16"
    />,
      title: "Total Bookings",
      number: numBookings,
      description: "All time bookings",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      icon:  <img
      src="/icons/users.png"
      alt="booking"
      className="w-16 h-16"
    />,
      title: "Booked Users",
      number: numUsers,
      description: "Unique customers",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      icon: <img
      src="/icons/reviews.png"
      alt="booking"
      className="w-16 h-16"
    />,
      title: "Reviews",
      number: numReviews,
      description: "Customer feedback",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ]

  console.log("Manager Dashboard Stats: ", stat)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-600">Welcome back, {user?.firstName || "Manager"}</p>
          </div>
          <Badge variant="secondary" className="px-4 py-2">
            <Activity className="mr-2 h-4 w-4" />
            Live Data
          </Badge>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {managerStats.map(({ icon: Icon, number, description, color, bgColor }, i) => (
            <Card
              key={i}
              className="group relative overflow-hidden border-0 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
              />
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`rounded-full p-3 ${bgColor}`}>
                    {Icon }
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-slate-900">{number}</p>
                    <p className="text-sm text-slate-600">{description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Pie Chart */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-blue-600" />
                Distribution Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <CustomLabeledPieChart />
              </div>
            </CardContent>
          </Card>

          {/* Bar Chart */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-green-600" />
                Booking Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <BarChartBox data={barChartBookingData} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Line Chart */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              Trends Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <LineChartBox data={lineChartData} title="Stats for Booked Users and Bookings over Time" />
            </div>
          </CardContent>
        </Card>

        {/* Recently Booked Rooms */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Hotel className="h-5 w-5 text-blue-600" />
                Recently Booked Rooms
              </CardTitle>
              <Button asChild variant="outline" size="sm">
                <Link to="/dashboard/bookings" className="flex items-center gap-2">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading || fetchingRooms ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <div className="p-4 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </Card>
                ))}
              </div>
            ) : error || roomError ? (
              <div className="flex items-center justify-center h-32">
                <p className="text-red-600 font-medium">Error fetching rooms</p>
              </div>
            ) : !rooms?.length || !bookings?.length ? (
              <div className="flex items-center justify-center h-32">
                <p className="text-slate-600">No rooms available</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {rooms
                  ?.filter((room) => bookings.some((booking) => booking.room._id === room._id))
                  .slice(0, 8)
                  .map((room, i) => (
                    <div key={i} className="transform transition-all duration-300 hover:scale-105">
                      <BookingCard
                        photo={room.images[0]}
                        roomNumber={room.roomNumber}
                        pricePerNight={room.pricePerNight}
                        type={room.roomType}
                      />
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ManagerDashboard
