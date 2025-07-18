import "react-phone-number-input/style.css";
import flags from "react-phone-number-input/flags";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import parsePhoneNumberFromString from "libphonenumber-js";

interface PhoneInputProps {
  control: any;
  errors: any;
}

function PhoneInput({control, errors}: PhoneInputProps) {


  return (
    <label className="flex flex-1 flex-col tracking-wider text-gray-900">
      <span className="ml-2 font-normal">Phone Number</span>
      <PhoneInputWithCountry
        flags={flags}
        name="phoneNumber"
        control={control}
        international
        placeholder="Enter phone number"
        defaultCountry="ET"
        rules={{
          required: "Phone number is required",
          validate: (value: string) => {
            const phoneNumberInstance = parsePhoneNumberFromString(value || "");
            return (
              phoneNumberInstance?.isValid() ||
              "Invalid phone number. Please try a valid one!"
            );
          },
        }}
      />
      {errors.phoneNumber && (
        <p className="text-sm font-light tracking-wide text-red-500">
          {errors.phoneNumber.message}
        </p>
      )}
    </label>
  );
}

export default PhoneInput;
