import { useFormContext } from "react-hook-form";

function RoomPricePerNight() {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ pricePerNight: number }>();

  return (
    <label className="">
      Price Per Night
      <input
        type="number"
        defaultValue={350}
        className="w-full rounded-md border bg-slate-100 px-3 py-2 hover:outline-none focus:outline-none"
        placeholder="350"
        {...register("pricePerNight", {
          required: "price per night is required",
        })}
      />
      {errors.pricePerNight && (
        <p className="text-sm font-normal text-red-700">
          {errors.pricePerNight.message}
        </p>
      )}
    </label>
  );
}

export default RoomPricePerNight
