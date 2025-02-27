
export interface CreateResponse {
  status: string;
  message: string;
  data: {
    id: string;
  };
}

export interface ErrorResponse {
  status: string;
  message: string;
}

export interface ITimeStamp {
  createdAt: string;
  updatedAt: string;
}

export interface IPagination {
  totalPages: number;
  limit: number;
  page: number;
}


