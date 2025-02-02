import { useNavigate, useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "../../redux/api/userApi";
import LoadingPage from "../../pages/utils/LoadingPage";
import NotFoundPage from "../../pages/utils/NotFoundPage";
import { bookings } from "./bookings";
import { ArrowLeft } from "lucide-react";

const UserDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const {
        data: { data: user } = {},
        isLoading,
        error,
    } = useGetUserByIdQuery(id as string);
    return (
        <div className="flex w-full flex-col">
            {isLoading ? (
                <LoadingPage />
            ) : error ? (
                <NotFoundPage>
                    <pre>{JSON.stringify(error, null, 2)}</pre>
                </NotFoundPage>
            ) : !user ? (
                <NotFoundPage>
                    <p>User not found</p>
                </NotFoundPage>
            ) : (
                <div className="bg-white relative  w-full px-10 overflow-hidden rounded-lg shadow-lg">

                    <div className="border-b flex justify-between border-gray-200 p-6">
                        <button
                            className="self-start"
                            onClick={() => {
                                navigate("/dashboard/users")
                            }}
                        >
                            <ArrowLeft />
                        </button>
                        <div className="mb-6 flex items-center">
                            <img
                                src={user.profilePicture}
                                alt="Profile Picture"
                                className="h-32 w-32 rounded-full border-2 border-gray-200"
                            />
                            <div className="ml-6">
                                <h2 className="text-3xl font-bold text-gray-800">
                                    {user.firstName} {user.lastName}
                                </h2>
                                <p className="text-lg text-gray-600">@{user.username}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Personal Information:
                                </h3>
                                <p className="mt-2 text-gray-600">
                                    <span className="font-semibold">Date of Birth:</span>{" "}
                                    {new Date(user.dateOfBirth).toLocaleDateString()}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-semibold">Gender:</span> {user.gender}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-semibold">Email:</span> {user.email}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-semibold">Phone:</span>{" "}
                                    {user.phoneNumber}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Address:
                                </h3>
                                <p className="mt-2 text-gray-600">
                                    {user.address.street}, {user.address.woreda},{" "}
                                    {user.address.subcity}, {user.address.city}
                                </p>

                                <h3 className="mt-6 text-lg font-semibold text-gray-800">
                                    Role:
                                </h3>
                                <p className="mt-2 capitalize text-gray-600">{user.role}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 w-full">
                        <h3 className="mb-4 text-2xl font-semibold text-gray-800">
                            Booking History
                        </h3>
                        {bookings.length > 0 ? (
                            <div className="max-h-[40vh] overflow-y-auto">
                                <table className="w-full table-auto border-collapse border border-gray-200">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="border border-gray-200 px-4 py-2 text-left text-gray-800">
                                                Booking ID
                                            </th>
                                            <th className="border border-gray-200 px-4 py-2 text-left text-gray-800">
                                                Hotel Name
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
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookings.map((booking) => (
                                            <tr key={booking._id}>
                                                <td className="border border-gray-200 px-4 py-2 text-gray-600">
                                                    {booking._id}
                                                </td>
                                                <td className="border border-gray-200 px-4 py-2 text-gray-600">
                                                    {booking.user}
                                                </td>
                                                <td className="border border-gray-200 px-4 py-2 text-gray-600">
                                                    {new Date(booking.checkIn).toLocaleDateString()}
                                                </td>
                                                <td className="border border-gray-200 px-4 py-2 text-gray-600">
                                                    {new Date(booking.checkOut).toLocaleDateString()}
                                                </td>
                                                <td className="border border-gray-200 px-4 py-2 capitalize text-gray-600">
                                                    {booking.status}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-gray-600">No booking history available.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDetail;
