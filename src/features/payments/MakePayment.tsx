import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useAcceptPaymentQuery } from "../../redux/api/paymentsApi";
import LoadingPage from "@/pages/utils/LoadingPage";

const PaymentPage = () => {
  const { bookingId, hotelId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useAcceptPaymentQuery(
    bookingId as string,
  );

  if (isLoading) {
    return <LoadingPage/>;
  }
  console.log("data", data);

  if (isError || !data) {
    console.log(error);
    toast.error("Failed to fetch booking details, try again later");
    if (hotelId) navigate(`/hotels/${hotelId}`);
    else
    {
      navigate("/account/bookings/" + bookingId);
    }
    return null;
  }

  // if (true) return <pre>{JSON.stringify(data, null, 2)}</pre>;

  const {
    room: { capacity, description: roomDescription, roomNumber, roomType } = {},
    user: { firstName, lastName, email, phoneNumber } = {},
    hotel: { name, imageCover, description: hotelDescription } = {},
    checkIn,
    checkOut,
    numOfNights,
    pricePerNight,
    totalPrice,
  } = data.data;

  return (
    <section className="min-h-screen w-[90vw] bg-gray-100 p-4">
      <span>Payment page</span>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        {/* Hotel */}
        <Card className="col-span-3 space-y-2 p-4">
          <CardHeader>
            <CardTitle>{name}</CardTitle>
            <CardDescription>{hotelDescription}</CardDescription>
          </CardHeader>
          <CardContent className="">
            <img
              src={imageCover}
              alt={name}
              className="h-[300px] w-full object-cover object-center"
            />
          </CardContent>
        </Card>
        {/* User */}
        <div className="col-span-2 grid grid-cols-1 gap-4">
          <Card className="space-y-2 p-4">
            <CardTitle>User</CardTitle>
            <CardContent>
              <p>
                <span className="text-primary">Full name:</span> {firstName}{" "}
                {lastName}
              </p>
              <p>
                <span className="text-primary">Email:</span> {email}
              </p>
              <p>
                <span className="text-primary">Phone number:</span>{" "}
                {phoneNumber}
              </p>
            </CardContent>
          </Card>
          {/* Room */}
          <Card className="space-y-2 p-4">
            <CardTitle>Room</CardTitle>
            <CardContent>
              <p>
                <span className="text-primary">Room number:</span> {roomNumber}
              </p>
              <p>
                <span className="text-primary">Room type:</span> {roomType}
              </p>
              <p>
                <span className="text-primary">Capacity:</span> {capacity}
              </p>
              <p>
                <span className="text-primary">Description:</span>{" "}
                {roomDescription}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Booking */}
        <Card className="col-span-2 space-y-2 p-4">
          <CardTitle>Booking</CardTitle>
          <CardContent>
            <div className="flex justify-between">
              <p>Check-in:</p>
              <p>{new Date(checkIn).toDateString()}</p>
            </div>
            <div className="flex justify-between">
              <p>Check-out:</p>
              <p>{new Date(checkOut).toDateString()}</p>
            </div>
            <div className="flex justify-between">
              <p>Number of nights:</p>
              <p>{numOfNights}</p>
            </div>
            <div className="flex justify-between">
              <p>Price per night:</p>
              <p>${pricePerNight}</p>
            </div>
            <div className="flex justify-between">
              <p>Total Price:</p>
              <p>${totalPrice}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3 w-full space-y-2 p-4">
          <CardTitle>Payment Methods</CardTitle>
          <CardContent className="w-full">
            <div className="flex w-full flex-col gap-y-2">
              <div className="flex">
                <img
                  src="/chapa.png"
                  className="hidden h-[100px] w-[200px] sm:block"
                />
                <p>
                  <span className="font-extrabold">
                    Seamless Payments, Endless Opportunities!
                  </span>{" "}
                  <br />
                  Empowering businesses in Ethiopia to securely accept online
                  payments from international and local customers by providing
                  fast and easy payment experience{" "}
                  <a href="https://chapa.co/" className="text-primary">
                    website
                  </a>
                  .
                </p>
              </div>

              <a
                href={data.checkout_url}
                target="_blank"
                onClick={() => {
                  toast.success("Redirecting to Chapa payment gateway");
                  navigate("/account/bookings");
                }}
                className="rounded-lg bg-accent-500/95 hover:bg-accent-500 px-4 py-2 text-center text-slate-100"
              >
                Continue Payment With Chapa
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PaymentPage;
