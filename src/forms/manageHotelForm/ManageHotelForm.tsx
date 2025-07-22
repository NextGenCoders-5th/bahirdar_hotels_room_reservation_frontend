import { FormProvider, useForm } from "react-hook-form";
import DetailSection from "./DetailSection";
import ImageSection from "./ImageSection";
import { useEffect, useState } from "react";
import Spinner from "../../ui/Spinner";
import SpinnerMini from "../../ui/SpinnerMini";
import { IHotel } from "../../types/hotelTypes";
import { SelectManager } from "./SelectManagerDrawer";
import { IAddress } from "../../types/addressTypes";
// import CreateUserDialog from "./CreateUserDialog";
import { IUser } from "../../types/userTypes";
import toast from "react-hot-toast";
import { useGetUserByIdQuery } from "../../redux/api/userApi";
import AddLocation from "../../features/hotels/components/AddLocation";
import { LatLngExpression } from "leaflet";
import { useAuthContext } from "../../context/AuthContext";
import { Role } from "../../enums/roleEnum";
interface Props {
  hotel?: IHotel;
  isAdding: boolean;
  isLoading?: boolean;
  isUpdating?: boolean;
  onSubmit: (data: FormData) => Promise<void>;
  isInUpdateMode?: boolean;
}
function ManageHotelForm({
  isAdding,
  isLoading,
  isUpdating = false,
  onSubmit,
  hotel,
  isInUpdateMode = false,
}: Props) {


  const [selectedPosition, setSelectedPosition] = useState<LatLngExpression | null>(null);

  const { user: manger } = useAuthContext();
  const { data: { data: user } = {}, error } = useGetUserByIdQuery(
    (hotel?.manager as string) || "",
    { skip: !hotel?.manager || manger?.role === Role.MANAGER },

  );
  const [selectedManager, setSelectedManager] = useState<IUser | null>(null);
  const formMethods = useForm<
    IHotel & {
      address: IAddress;
      facilities: string[];
      imageCoverFile: string;
      hotelImagesFiles: string[];
      manager: string;
      isInUpdateMode: boolean;
    }
  >();
  const { handleSubmit, reset, setValue } = formMethods;

  useEffect(() => {
    if (manger?.role === Role.MANAGER)
    {
      setSelectedManager(manger);
      return;
    }
    if (error)
    {
      toast.error("An error occurred while fetching the manager");
    }
    if (user)
    {
      setSelectedManager(user);
    }

  }, [error, manger, user]);

  // IF IN UPDATE MODE RESET THE HOTEL DATA TO THE FORM
  useEffect(() => {
    // FIXME: SOMETIMES THE FUNCTION NOT TRIGGERED
    if (hotel)
    {
      reset({
        ...hotel,
        manager: 
          typeof hotel.manager === "string"
            ? hotel.manager
            : hotel.manager?._id || manger?._id || "",
        address: hotel.address || {
          city: "",
          subcity: "",
          street: "",
          woreda: "",
        },
        facilities: hotel.facilities || [],
        imageCoverFile: "",
        hotelImagesFiles: [],
        isInUpdateMode,
        location: {
          coordinates: [hotel.location?.coordinates[0], hotel.location?.coordinates[1]],
        }
      });

      if (hotel.location?.coordinates[0] !== undefined && hotel.location?.coordinates[1] !== undefined)
      {
        setSelectedPosition([hotel.location.coordinates[0], hotel.location.coordinates[1]]);
      }
      setValue("isInUpdateMode", isInUpdateMode);
    }
  }, [reset, hotel, isInUpdateMode, setValue]);

  const onSubmitHandler = handleSubmit((data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("hotelStar", data.hotelStar?.toString() || "");
    formData.append("summary", data.summary);
    formData.append("address[country]", "Ethiopia");
    formData.append("address[city]", data.address.city);
    formData.append("address[subcity]", data.address.subcity);
    formData.append("address[street]", data.address.street);
    formData.append("address[woreda]", data.address.woreda);

    if (selectedPosition)
    {
      formData.append("longitude", selectedPosition.toString().split(',')[0] || "");
      formData.append("latitude", selectedPosition.toString().split(',')[1] || "");
    }
    if (selectedManager?._id) formData.append("manager", selectedManager._id);
    else
    {
      toast.error("Please select manger manager not selected yet");
      return;
    }

    data.facilities.forEach((facility, i) => {
      formData.append(`facilities[${i}]`, facility);
    });

    if (hotel?.imageCover)
    {
      formData.append("imageCover", hotel.imageCover);
    }

    if (hotel?.hotelImages)
    {
      data.hotelImages.forEach((image, i) => {
        formData.append(`hotelImages[${i}]`, image);
      });
    }

    if (data?.imageCoverFile)
      Array.from(data.imageCoverFile).forEach((image) => {
        formData.append(`imageCoverFile`, image);
      });

    if (data?.hotelImagesFiles)
      Array.from(data.hotelImagesFiles).forEach((image) => {
        formData.append(`hotelImagesFiles`, image);
      });

    onSubmit(formData).then(() => {
      reset();
      setSelectedPosition(null);
      setSelectedManager(null);
    });
  });

  return (
    <div className="flex flex-col px-2 md:px-4">
      <FormProvider {...formMethods}>
        <div className="flex w-[90vw] items-center justify-center py-3 md:w-auto">
          <h1 className="w-full cursor-pointer border border-slate-200 py-2 text-center text-2xl font-bold uppercase text-slate-700 shadow-xl">
            {isInUpdateMode ? "Update Hotel" : "Add Hotel"}
          </h1>
        </div>
        {isLoading ? (
          <Spinner />
        ) : isInUpdateMode && !hotel ? (
          <div className="flex items-center justify-center p-6">
              <p className="text-2xl uppercase">There is no hotel to update</p>
          </div>
        ) : (
          <form
                onSubmit={(onSubmitHandler)}
                className="flex flex-col w-full gap-8 rounded bg-slate-100 px-0 shadow-lg md:m-auto md:p-10"
          >
                <div>
              <DetailSection />
                  <ImageSection />

                  {!isInUpdateMode && (
                    <div className="my-4">
                      <p className="w-[90vw] leading-6 tracking-wide text-slate-500 md:w-[30rem]">
                        Does the manager have no account? You can create a new account for the manager and register the hotel after that.
                      </p>
                    </div>
                  )}

                  <div className="flex w-full flex-col items-stretch gap-4 md:w-auto md:flex-row md:items-center">

                    {
                      manger?.role === Role.ADMIN && (
                        <SelectManager
                          selectedManager={selectedManager}
                          setSelectedManager={setSelectedManager}
                        />
                      )
                    }
                    <span>
                      {selectedManager
                        ? `${selectedManager.firstName || selectedManager.email} ${selectedManager.lastName || ""}`
                        : "No manager selected yet"}
                    </span>
                    {/* {
                      manger?.role === Role.ADMIN && (
                        <CreateUserDialog />
                      )
                    } */}
                    <AddLocation
                      selectedPosition={selectedPosition}
                      setSelectedPosition={setSelectedPosition}
                    />
                    {selectedPosition ? (
                      <span className="flex items-center gap-2">
                        <span>Latitude: {selectedPosition.toString().split(',')[0]}</span>
                        <span>Longitude: {selectedPosition.toString().split(',')[1]}</span>
                      </span>
                    ) : (
                      <span>No location selected yet</span>
                    )}
                  </div>
            </div>

            <button
              type="submit"
                  className="w-full rounded bg-accent-500/90 px-3 py-2 text-slate-100 transition-all duration-300 hover:bg-accent-500 disabled:cursor-not-allowed disabled:bg-accent-500"
                  disabled={isAdding || isUpdating}
            >
              {isAdding || isUpdating ? <SpinnerMini /> : "Save Hotel"}
            </button>
          </form>
        )}
      </FormProvider>
    </div>
  );
}

export default ManageHotelForm;
