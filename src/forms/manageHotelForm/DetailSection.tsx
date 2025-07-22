import { useFormContext } from "react-hook-form";
import { HOTEL_FACILITIES } from "../../constants/HotelFacilities";
import { IAddHotel } from "../../types/hotelTypes";

function DetailSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<IAddHotel>();

  return (
    <div className="flex flex-col gap-4">
      {/* NAME */}
      <div className="flex flex-col gap-1">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          // defaultValue="Addis International Hotel"
          className="w-full rounded-md border bg-slate-200 px-3 py-2 focus-visible:outline-accent-500 hover:outline-none"
          placeholder="abc international hotel"
          {...register("name", {
            required: "Hotel name is required",
            minLength: {
              value: 3,
              message: "Hotel name should be at least 3 characters",
            },
          })}
        />
        {errors.name && (
          <p className="text-sm font-normal text-red-700">{errors.name.message}</p>
        )}
      </div>

      {/* ADDRESS */}
      <div className="flex md:flex-row flex-col gap-4 w-full">
        <div className="flex flex-col flex-1 gap-1">
          <label className="px-2" htmlFor="city">
            City
          </label>
          <input
            type="text"
            // defaultValue="Bahir Dar"
            className="rounded-md border bg-slate-200 px-3 py-2 focus-visible:outline-accent-500 hover:outline-none"
            placeholder="Bahir Dar, Amhara, 16km from the main straight"
            {...register("address.city", {
              required: "Hotel address is required",
            })}
          />
          {errors.address?.city && (
            <p className="text-sm font-normal text-red-700">{errors.address.city.message}</p>
          )}
        </div>

        <div className="flex flex-col flex-1 gap-1">
          <label className="px-2" htmlFor="sub-city">
            Sub-City
          </label>
          <input
            type="text"
            id="sub-city"
            // defaultValue="Felege Hiwot"
            className="rounded-md border bg-slate-200 px-3 py-2 focus-visible:outline-accent-500 hover:outline-none"
            placeholder="Bahir Dar, Amhara, 16km from the main straight"
            {...register("address.subcity", {
              required: "Hotel sub-city is required",
            })}
          />
          {errors.address?.subcity && (
            <p className="text-sm font-normal text-red-700">{errors.address.subcity.message}</p>
          )}
        </div>

        <div className="flex flex-col flex-1 gap-1">
          <label className="px-2" htmlFor="street">
            Street
          </label>
          <input
            type="text"
            // defaultValue="Street 003"
            className="rounded-md border bg-slate-200 px-3 py-2 focus-visible:outline-accent-500 hover:outline-none"
            placeholder="Bahir Dar, Amhara, 16km from the main straight"
            {...register("address.street")}
          />
        </div>

        <div className="flex flex-col flex-1 gap-1">
          <label className="px-2" htmlFor="woreda">
            Woreda
          </label>
          <input
            type="text"
            id="woreda"
            // defaultValue="Woreda 01"
            className="rounded-md border bg-slate-200 px-3 py-2 focus-visible:outline-accent-500 hover:outline-none"
            placeholder="Bahir Dar, Amhara, 16km from the main straight"
            {...register("address.woreda")}
          />
        </div>
      </div>

      {/* HOTEL STAR */}
      <div className="flex gap-1 flex-col">
        <label htmlFor="hotel-star">Hotel Star</label>
        <select
          className="w-full rounded-md border bg-slate-200 px-3 py-2 focus-visible:outline-accent-500 hover:outline-none"
          {...register("hotelStar", {
            required: "Star rating is required",
            min: { value: 1, message: "Star rating should be at least 1" },
          })}
        >
          <option value={0}>Select Hotel Star</option>
          {[1, 2, 3, 4, 5].map((val) => (
            <option key={val} value={val}>
              {val} Star
            </option>
          ))}
        </select>
        {errors.hotelStar && (
          <p className="text-sm font-normal text-red-700">{errors.hotelStar.message}</p>
        )}
      </div>

      {/* HOTEL FACILITIES */}
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold">Hotel Facilities</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {HOTEL_FACILITIES.map((facility) => (
            <label key={facility} className="flex flex-1 items-center gap-1">
              <input
                type="checkbox"
                value={facility}
                className="p-2 accent-accent-600"
                {...register("facilities", {
                  validate: (facilities) => {
                    if (!facilities || facilities.length < 3)
                    {
                      return "A hotel should have at least 3 facilities";
                    }
                    return true;
                  },
                })}
              />
              <span>{facility}</span>
            </label>
          ))}
        </div>
        {errors.facilities && (
          <p className="text-sm font-normal text-red-700">{errors.facilities.message}</p>
        )}
      </div>

      {/* HOTEL SUMMARY */}
      <div className="flex flex-col gap-1">
        <label>Summary</label>
        <input
          type="text"
          // defaultValue="5-star hotel located in the heart of Addis Ababa, Ethiopia"
          className="w-full rounded-md border bg-slate-200 px-3 py-2 focus-visible:outline-accent-500 hover:outline-none"
          placeholder="Hotel summary"
          {...register("summary", {
            required: "A hotel must have a summary",
            minLength: {
              value: 50,
              message: "A hotel summary must have at least 50 characters",
            },
          })}
        />
        {errors.summary && (
          <p className="text-sm font-normal text-red-700">{errors.summary.message}</p>
        )}
      </div>

      {/* HOTEL DESCRIPTION */}
      <div className="flex flex-col gap-1">
        <label>Description</label>
        <textarea
          rows={5}
          className="w-full rounded-lg border bg-slate-200 px-3 py-2 hover:outline-none"
          placeholder="Hotel description"
          // defaultValue="Addis International Hotel is a 5-star hotel located in the heart of Addis Ababa, Ethiopia. The hotel offers a luxurious experience with its spacious rooms, modern amenities, and exceptional service. Whether you are traveling for business or pleasure, Addis International Hotel is the perfect choice for your stay in Addis Ababa."
          {...register("description", {
            required: "A hotel must have a description",
            minLength: {
              value: 50,
              message: "A hotel description must have at least 50 characters",
            },
          })}
        />
        {errors.description && (
          <p className="text-sm font-normal text-red-700">{errors.description.message}</p>
        )}
      </div>
    </div>
  );
}

export default DetailSection;
