import { useFormContext } from "react-hook-form";
import "react-phone-number-input/style.css";
import flags from "react-phone-number-input/flags";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import parsePhoneNumberFromString from "libphonenumber-js";
import { ISignup } from "@/types/userTypes";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import SpinnerMini from "@/ui/SpinnerMini";

interface Props {
  onSubmitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  isPending: boolean;
}
function SignUpForm({ onSubmitHandler, isPending }: Props) {
  const { control , formState: {errors}} = useFormContext<ISignup>();
  
  return (
    <form onSubmit={onSubmitHandler} className="flex w-full flex-col">
      <FormField
        control={control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder="my_username" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />{" "}
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="your_name@abc.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
            <PhoneInputWithCountry
              flags={flags}
              {...field}
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
           
            </FormControl>
            {errors.phoneNumber && (
              <p className="text-sm font-light tracking-wide text-red-500">
                {errors.phoneNumber.message}
              </p>
            )}
            </FormItem>
        )}
      />
       <FormField
        control={control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" placeholder="**********" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="passwordConfirm"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password Confirm</FormLabel>
            <FormControl>
              <Input type="password" placeholder="**********" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        disabled={isPending}
        type="submit"
        className="mt-2 w-full bg-accent-500/95 hover:bg-accent-500 text-light-200"
      >
        {isPending ? <SpinnerMini /> : "Sign Up"}
      </Button>
    </form>
  );
}

export default SignUpForm;
