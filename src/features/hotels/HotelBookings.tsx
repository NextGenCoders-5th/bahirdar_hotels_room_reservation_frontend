import {
    useLocation,
    useNavigate,
    useParams,
    useSearchParams,
} from "react-router-dom";
import { BookingStatus } from "../../enums/bookingStatusEnum";
import LoadingPage from "../../pages/utils/LoadingPage";
import NotFoundPage from "../../pages/utils/NotFoundPage";
import {
    useGetHotelBookingsQuery,
} from "../../redux/api/bookingApi";
import { CustomPagination } from "../../components/Pagination";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useClickOutside } from "../../components/lib/useClickOutSide";
import { useAuthContext } from "@/context/AuthContext";
const HotelBookings = () => {

    const { user } = useAuthContext();
    const [openDropdown, setOpenDropdown] = useState(false);
    const modalRef = useClickOutside<HTMLDivElement>(() => setOpenDropdown(false));
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { hotelId } = useParams<{ hotelId: string }>();

    const bookingStatuses = Object.values(BookingStatus);
    const {
        data: { data: bookings, pagination } = {},
        isLoading,
        error,
    } = useGetHotelBookingsQuery({
        hotelId: (hotelId || user?.hotel?._id) as string,
        params: searchParams.toString() || "",
    }, {
        refetchOnMountOrArgChange: true,
        skip: !hotelId && !user?.hotel?._id,
    });

    const getStatusButtonColor = (status: BookingStatus) => {
        switch (status) {
            case BookingStatus.PENDING:
                return "bg-yellow-500/80 hover:bg-yellow-500";
            case BookingStatus.CONFIRMED:
                return "bg-green-500/80 hover:bg-green-500";
            case BookingStatus.CANCELLED:
                return "bg-red-500/80 hover:bg-red-500";
            case BookingStatus.CHECKED_IN:
                return "bg-accent-500/80 hover:bg-accent-500";
            case BookingStatus.CHECKED_OUT:
                return "bg-slate-300/80 hover:bg-slate-300";
            default:
                return "bg-gray-500/80 hover:bg-gray-500";
        }
    };

    const getBgColor = (status: BookingStatus) => {
        switch (status) {
            case BookingStatus.PENDING:
                return "text-yellow-500/90 ";
            case BookingStatus.CONFIRMED:
                return "text-green-500/90 ";
            case BookingStatus.CANCELLED:
                return "text-red-500/90 ";
            case BookingStatus.CHECKED_IN:
                return "text-accent-500/90 ";
            case BookingStatus.CHECKED_OUT:
                return "text-slate-500/90";
            default:
                return "text-gray-500/90 ";
        }
    };

    return (
        <div className="w-full relative bg-gray-100 px-6 py-10">
            <div className="mx-auto overflow-hidden rounded-lg bg-white">
                <div className="flex  items-center justify-between gap-4 border-b border-gray-200 md:p-6">
                    <h2 className="w-full text-3xl font-bold text-slate-800 md:w-auto">
                        Hotel Bookings
                    </h2>
                    <div className="hidden md:flex w-full items-center justify-end gap-1 md:w-auto">
                        {bookingStatuses.map((status) => (
                            <button
                                onClick={() => {
                                    searchParams.set("status", status);
                                    setSearchParams(searchParams);
                                }}
                                key={status}
                                className={`flex ${ searchParams.get('status') === status ? ' !py-3 ' :'' } items-center justify-center rounded-sm px-4 py-2 text-[#333333] ${getStatusButtonColor(status)}`}
                            >
                                {status.replace(/-/g, " ").toUpperCase()}
                            </button>
                        ))}
                    </div>
                    <div className="flex md:hidden">
                        <button
                            onClick={() => setOpenDropdown(prev => !prev)}
                            className="flex items-center justify-center rounded-sm px-4 py-2 text-accent-500 bg-gray-200">
                            {
                                openDropdown ? <X /> : <Menu />
                            }
                        </button>
                        {openDropdown && (
                            <div ref={modalRef} className=" absolute top-20 left-0 right-0 bg-slate-100 shadow-md flex flex-col w-[94%] items-stretch justify-end gap-1 md:w-auto">
                                {bookingStatuses.map((status) => (
                                    <button
                                        onClick={() => {
                                            setSearchParams({ status });
                                            setOpenDropdown(false);
                                        }}
                                        key={status}
                                        className={`flex items-center justify-center rounded-sm px-4 py-2 text-[#333333] ${getStatusButtonColor(status)}`}
                                    >
                                        {status.replace(/-/g, " ").toUpperCase()}
                                    </button>
                                ))}
                            </div>)}
                    </div>
                </div>

                <div className="p-6">
                    {isLoading ? (
                        <LoadingPage />
                    ) : error ? (
                        <NotFoundPage>
                            <pre>{JSON.stringify(error, null, 2)}</pre>
                        </NotFoundPage>
                    ) : !bookings?.length ? (
                        <NotFoundPage>
                            <p>Bookings not found</p>
                        </NotFoundPage>
                    ) : (
                        <>
                            <div className="max-h-[70vh] overflow-x-auto overflow-y-auto">
                                <table className="w-full table-auto border-collapse border border-gray-200">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="border border-gray-200 px-4 py-2 text-left text-gray-800">
                                                Booking ID
                                            </th>
                                            <th className="border border-gray-200 px-4 py-2 text-left text-gray-800">
                                                User
                                            </th>
                                            <th className="border border-gray-200 px-4 py-2 text-left text-gray-800">
                                                Phone
                                            </th>
                                            <th className="border border-gray-200 px-4 py-2 text-left text-gray-800">
                                                Room
                                            </th>
                                            <th className="border border-gray-200 px-4 py-2 text-left text-gray-800">
                                                Check-In
                                            </th>
                                            <th className="border border-gray-200 px-4 py-2 text-left text-gray-800">
                                                Check-Out
                                            </th>
                                            <th className="border border-gray-200 px-4 py-2 text-left text-gray-800">
                                                Status
                                            </th>
                                            <th className="border border-gray-200 px-4 py-2 text-left text-gray-800">
                                                Payment Status
                                            </th>

                                            <th className="border border-gray-200 px-4 py-2 text-left text-gray-800">
                                                Total Price
                                            </th>
                                            <th className="border border-gray-200 px-4 py-2 text-left text-gray-800">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {bookings?.map((booking) => (
                                            <tr key={booking._id}>
                                                <td className="border border-gray-200 px-2 py-2 text-gray-600">
                                                    {booking?._id && booking?._id.slice(0, 5)}
                                                </td>
                                                <td className="border border-gray-200 px-2 py-2 text-gray-600">{`${booking.user?.firstName} ${booking.user?.lastName}`}</td>
                                                <td className="border border-gray-200 px-2 py-2 text-gray-600">
                                                    {booking.user.phoneNumber}
                                                </td>
                                                <td className="border border-gray-200 px-2 py-2 text-gray-600">
                                                    Room {booking?.room?.roomNumber}
                                                </td>
                                                <td className="border border-gray-200 px-2 py-2 text-gray-600">
                                                    {new Date(booking.checkIn).toLocaleDateString()}
                                                </td>
                                                <td className="border border-gray-200 px-2 py-2 text-gray-600">
                                                    {new Date(booking.checkOut).toLocaleDateString()}
                                                </td>
                                                <td
                                                    className={`border border-gray-200 px-2 py-2 capitalize text-gray-600 ${getBgColor(booking.status as BookingStatus)}`}
                                                >
                                                    {booking.status}
                                                </td>
                                                <td
                                                    className={`border border-gray-200 px-2 py-2 capitalize text-gray-600 ${getBgColor(booking.status as BookingStatus)}`}
                                                >
                                                    {booking.isPaid ?
                                                        <span className="text-green-500">Paid</span> :
                                                        <span className="text-red-500">Not Paid</span>
                                                    }
                                                </td>
                                                <td className="border border-gray-200 px-2 py-2 text-gray-600">
                                                    ${booking.totalPrice}
                                                </td>
                                                <td className="border border-gray-200 px-2 py-2 text-gray-600">
                                                    <button
                                                        onClick={() => navigate(pathname + `/${booking._id}`)}
                                                        className="text-accent-500/90 hover:text-accent-500 hover:underline"
                                                    >
                                                        View
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {bookings.length > 5 && pagination && (
                                <CustomPagination
                                    totalPages={pagination.totalPages}
                                    page={pagination?.page}
                                    onPageChange={(page) => {
                                        searchParams.set("page", page.toString());
                                    }}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HotelBookings;
