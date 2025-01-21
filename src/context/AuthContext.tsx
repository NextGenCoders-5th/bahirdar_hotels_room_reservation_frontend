/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";
import LoadingSkeleton from "../ui/LoadingSkeleton";
import { IUser } from "../types/userTypes.js";
import { IHotel } from "../types/hotelTypes.js";
import { useGetCurrentUserQuery } from "../redux/api/userApi.js";

interface Props {
  children: React.ReactNode
}
export interface AuthContextType {
  isLoggedIn: boolean;
  isOpenModal: boolean;
  handleOpenModal: () => void;
  user: IUser | null;
  role: string | null;
  currentHotel: IHotel | null;
  setCurrentHotelHandler: (hotel: IHotel) => void;
  handleOpenModalWindow: () => void;
  openModalWindow: boolean;
  handleSetUserOnLogout: () => void;
}
const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isOpenModal: false,
  handleOpenModal: () => { },
  user: null,
  role: null,
  currentHotel: null,
  setCurrentHotelHandler: () => { },
  handleOpenModalWindow: () => { },
  openModalWindow: false,
  handleSetUserOnLogout: () => { },
});

function AuthContextProvider({ children }: Props) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentHotel, setCurrentHotel] = useState<IHotel | null>(null);
  const [openModalWindow, setOpenModalWindow] = useState(false);

  // TODO: send request to the '/auth/validateToken' route to check if user is loggedIn or not.
  // and then get user
  const { data: { data } = {}, isLoading, isError } = useGetCurrentUserQuery();

  if (isLoading)
  {
    return (
      <div className="mx-auto flex min-h-screen justify-center lg:w-1/4">
        <div className="mt-5 p-4 lg:mt-12">
          <LoadingSkeleton className="h-3 w-[10rem]" />
          <LoadingSkeleton className="h-3 w-[30rem]" />
          <LoadingSkeleton className="h-3 w-[20rem]" />
          <LoadingSkeleton className="h-3 w-[15rem]" />
          <LoadingSkeleton className="h-3 w-[25rem]" />
          <LoadingSkeleton className="h-3 w-[10rem]" />
        </div>
      </div>
    );
  }

  let user = data || null;

  const handleSetUserOnLogout = () => {
    user = null;
  };

  const handleOpenModal = () => {
    setIsOpenModal((prev) => !prev);
  };

  const handleOpenModalWindow = () => {
    setOpenModalWindow(!openModalWindow);
  };

  const setCurrentHotelHandler = (hotel: IHotel) => {
    setCurrentHotel(hotel);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !isError,
        isOpenModal,
        handleOpenModal,
        user,
        role: user?.role || null,
        currentHotel: currentHotel,
        setCurrentHotelHandler,
        handleOpenModalWindow,
        openModalWindow,
        handleSetUserOnLogout,
      }}
    >

      {children}
    </AuthContext.Provider>
  );
}

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
  {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
};

export { AuthContextProvider, useAuthContext };
