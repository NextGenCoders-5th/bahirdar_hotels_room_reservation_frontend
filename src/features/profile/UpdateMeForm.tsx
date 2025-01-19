import flags from "react-phone-number-input/flags";
import SpinnerMini from "../../ui/SpinnerMini";
import { useUpdateMe } from "./useUpdateMe";
import { FormProvider, useForm } from "react-hook-form";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import parsePhoneNumberFromString from "libphonenumber-js";
import { useAuthContext } from "../../context/AuthContext";
import { IUpdateMeForm } from "../../types/userTypes";
function UpdateMeForm() {
  const { user } = useAuthContext();
  const formMethods = useForm<IUpdateMeForm>();
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = formMethods;

  const { mutate, isPending } = useUpdateMe();

  const onSubmitHandler = handleSubmit((data) => {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("phone", data.phone);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    Array.from(data.photo).forEach((image) => {
      formData.append("photoFile", image);
    });

    mutate(formData);
  });

  return (
    <div className="mx-auto mt-10 max-w-4xl rounded-md bg-white p-6 shadow-md">
      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className="mt-6 flex-grow md:mt-0">
          <FormProvider {...formMethods}>
            <form onSubmit={onSubmitHandler}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                  <input
                    type="text"
                    {...register("firstName")}
                    defaultValue={user?.firstName}
                    disabled={isPending}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-accent-300 focus:outline-none focus:ring disabled:cursor-wait disabled:bg-slate-300"
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                  <input
                    type="text"
                    disabled={isPending}
                    defaultValue={user?.lastName}
                    {...register("lastName")}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-accent-300 focus:outline-none focus:ring disabled:cursor-wait disabled:bg-slate-300"
                  />
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  email
                  <input
                    type="email"
                    disabled={isPending}
                    defaultValue={user?.email}
                    {...register("email")}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-accent-300 focus:outline-none focus:ring disabled:cursor-wait disabled:bg-slate-300"
                  />
                </label>
              </div>
              <label className="flex flex-1 flex-col tracking-wider text-gray-900">
                <span className="ml-2 font-normal md:text-xl">
                  Phone Number
                </span>
                <PhoneInputWithCountry
                  name="phoneNumber"
                  control={control}
                  flags={flags}
                  international
                  placeholder="Enter phone number"
                  defaultValue={user?.phoneNumber}
                  defaultCountry="ET"
                  rules={{
                    required: "Phone number is required",
                    validate: (value: string) => {
                      const phoneNumberInstance = parsePhoneNumberFromString(
                        value || "",
                      );
                      return (
                        phoneNumberInstance?.isValid() ||
                        "Invalid phone number. Please try a valid one!"
                      );
                    },
                  }}
                  className="w-full rounded-xl p-2 focus:outline-none"
                />
                {errors.phoneNumber && (
                  <p className="text-sm font-light tracking-wide text-red-500">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </label>

              {/* USER IMAGE */}
              <label className="flex flex-col border hover:cursor-pointer">
                <span>Update profile picture</span>
                <input
                  type="file"
                  accept="image/*"
                  // hidden
                  className="hover:cursor-pointer"
                  {...register("photo")}
                />
              </label>

              <div className="my-2 flex justify-end p-2">
                <button
                  disabled={isPending}
                  type="submit"
                  className="flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-700 via-accent-600 to-accent-400 px-4 py-2 text-2xl text-slate-200 disabled:cursor-wait"
                >
                  Update Profile {isPending && <SpinnerMini />}
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}

export default UpdateMeForm;
