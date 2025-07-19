interface HotelStatistics {
  allRooms: number;
  allBookings: number;
  allUsers: number;
  allReviews: number;
};

//  Generic interface for response data
export interface IResponse<T> {
  status: string;
  message: string;
    data: T;
}

export interface IHotelStatsResponse extends IResponse<HotelStatistics> {
  data: HotelStatistics;
}

