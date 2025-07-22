import { useEffect } from "react";
import Spinner from "../../ui/Spinner";
import SpinnerMini from "../../ui/SpinnerMini";
import {
  RoomAmenities,
  RoomCapacity,
  RoomDescription,
  RoomImages,
  RoomNumber,
  RoomPricePerNight,
  RoomType,
} from "./index";
import { FormProvider, useForm } from "react-hook-form";
import { IRoom } from "../../types/roomTypes";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

interface Props {
  onSubmit: (room: FormData) => Promise<void> ;
  room?: IRoom,
  isLoading?: boolean,
  isAdding?: boolean,
  isUpdating?: boolean,
  isInUpdateMode?: boolean
}
function ManageRoomForm({
  onSubmit,
  room,
  isLoading,
  isAdding,
  isUpdating,
  isInUpdateMode = false,
}: Props) {


  const { hotelId } = useParams<{ hotelId: string }>();

  const { roomId } = useParams<{ roomId: string }>();
  const formMethods = useForm<IRoom & { RoomImageFiles: FileList, "isInUpdateMode": boolean }>();
  const { handleSubmit, reset, setValue } = formMethods;

  // RESET THE ROOM TO BE UPDATED
  useEffect(() => {
    if (room && roomId)
    {
      reset(room);
      setValue("isInUpdateMode", isInUpdateMode);
    }
  }, [reset, room, roomId, isInUpdateMode, setValue]);

  const onSubmitHandler = handleSubmit(async (data) => {
    const formData = new FormData();

    if (!hotelId)
    {
      toast.error("Cannot add room without hotel id");
      return;
    }
    formData.append("roomNumber", data.roomNumber);
    formData.append("roomType", data.roomType);
    formData.append("pricePerNight", data.pricePerNight.toString());
    formData.append("capacity", data.capacity.toString());
    formData.append("description", data.description);
    formData.append("hotel", hotelId)
    data.roomFacilities.forEach((amenity, i) => {
      formData.append(`roomFacilities[${i}]`, amenity);
    });

    if (data?.RoomImageFiles)
    {
      Array.from(data.RoomImageFiles).forEach((image) => {
        formData.append("images", image);
      });
    }

    if (data?.images)
    {
      data.images.forEach((image, i) => {
        formData.append(`images[${i}]`, image);
      });
    }

    await onSubmit(formData).then(() => {
      reset();
      setValue("isInUpdateMode", false);
    }).catch((err) => {
      console.error(err);
      toast.error("Failed to submit form");
    })
  });

  return (
    <FormProvider {...formMethods}>
      <div className="flex w-full md:px-6 flex-col items-center justify-center p-3">
        <div className="flex w-full items-center justify-center py-3">
          <div className="w-full relative flex items-center justify-center cursor-pointer rounded-sm text-slate-800  py-2 text-center text-2xl font-bold shadow-xl">
            {/* <button
            className="absolute left-4"
            onClick={() => navigate(room?._id ? "/dashboard/rooms/" + room._id : "/dashboard/rooms")}
          >
            <ArrowLeft size={20} />
          </button> */}
            <h1 className="w-full">
            {isInUpdateMode ? "Update Room" : "Add Room"}
          </h1>
        </div>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <form
          onSubmit={onSubmitHandler}
              className="w-full  flex flex-col gap-8 rounded py-4 px-4 md:p-10 shadow-lg"
          >
          <div className="flex flex-col gap-4">
            {/* ROOM NUMBER */}
              <RoomNumber />



            {/* ROOM TYPE */}
            <RoomType />

            {/* PRICE PER NIGHT */}
            <RoomPricePerNight />

            {/* CAPACITY */}
            <RoomCapacity />

            {/* ROOM DESCRIPTION */}
            <RoomDescription />

            {/* ROOM AMENITIES */}
            <RoomAmenities />

            {/* ROOM IMAGES */}
            <RoomImages />
          </div>

          <button
            type="submit"
              className="w-full rounded bg-accent-500/90 px-3 py-2 text-slate-100 transition-all duration-300 hover:bg-accent-500 disabled:cursor-not-allowed disabled:bg-accent-600"
            disabled={isAdding || isUpdating}
          >
            {isAdding || isUpdating ? <SpinnerMini /> : "Save Room"}
          </button>
        </form>
        )}
      </div>
    </FormProvider>
  );
}

export default ManageRoomForm;
