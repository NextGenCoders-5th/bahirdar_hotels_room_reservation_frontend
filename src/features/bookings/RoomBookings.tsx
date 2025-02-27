import { IBookingResponse } from "../../types/bookingTypes";
import { IRoom } from "../../types/roomTypes";
import { IPagination, ITimeStamp } from "../../types/general";
import formatDate from "../../utils/formatDate";
import { CustomPagination } from "@/components/Pagination";

interface Props {
  bookings: (IBookingResponse & ITimeStamp)[];
  pagination: IPagination | undefined
}

export default function RoomBookings({ bookings, pagination }: Props) {
  return (
    <div className="overflow-x-auto h-fit py-4 md:w-full max-w-[82vw]  overflow-y-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
        <thead className="bg-gray-100 border-b border-gray-200">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Start Date</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">End Date</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Nights</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Price/Night</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Room ID</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-2 text-sm text-center text-gray-500">
                No bookings available.
              </td>
            </tr>
          ) : (
              bookings.filter(booking => new Date(booking.checkIn) >= new Date()).map((booking, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
              >
                <td className="px-4 py-2 text-sm text-gray-700">
                  {formatDate(booking.checkIn.toString())}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {formatDate(booking.checkOut.toString())}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">{booking.numOfNights}</td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  ${booking.pricePerNight?.toFixed(2)}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {(booking.room as unknown as IRoom)._id}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {pagination && bookings.length > 5 && <CustomPagination
        totalPages={pagination.totalPages}
        page={pagination.page}
        onPageChange={() => {

        }}
      />}
    </div>
  );
}
