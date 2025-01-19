import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SpinnerMini from "../../ui/SpinnerMini";
import apiUsers from "../../services/apiUsers";
import toast from "react-hot-toast";
import QueryKey from "../../constants/QueryKey";
import { useAuthContext } from "../../context/AuthContext";
import Logo from "../../ui/Logo";
import { ResetPassInterface } from "../../types/userTypes";

function ResetMyPassword() {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm<ResetPassInterface>();

  const { mutate, isPending } = useMutation({
    mutationFn: apiUsers.resetPassword,
    onSuccess: () => {
      toast.success("user password reset successfully");
      navigate("/account/profile");
      queryClient.invalidateQueries({
        queryKey: [QueryKey.USER],
      });
    },
    onError: (err) => {
      if ('response' in err)
      {
        const { data: { message } } = err.response as { data: { message: string } };
        toast.error(
          message ||
          "unable to reset user password, please try again",
        );
        if (
          message === "Token is invalid or has expired" &&
          user
        )
        {
          navigate("/account/settings");
        }
      }
      else
        toast.error(
          "unable to reset user password, please try again",
        );

    },
  });

  const onSubmitHandler = handleSubmit((data) => {
    mutate({ resetToken: location.pathname?.split("/")[2], data });
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-300">
      <div className="w-[95vw] rounded-xl bg-slate-200 p-4 shadow-xl sm:mx-auto sm:w-[30rem] lg:mt-4">
        <div className="mx-auto flex items-center justify-center p-3 sm:p-6">
          <Logo />
        </div>
        <div className="mx-auto">
          <form
            onSubmit={onSubmitHandler}
            className="mt-2 flex w-full flex-col gap-6"
          >
            <h1 className="mb-2 text-center text-xl tracking-wider text-gray-800 lg:text-3xl">
              Reset Your Password
            </h1>

            <label className="flex flex-1 flex-col tracking-wider text-gray-900">
              <span className="ml-2 md:text-lg">Password</span>
              <input
                type="password"
                className="w-full rounded-xl p-2 shadow-md focus:outline-none"
                placeholder="**********"
                {...register("password", {
                  required: "password is a required",
                })}
              />
              {errors.password && (
                <p className="text-sm text-red-700">
                  {errors.password.message}
                </p>
              )}
            </label>
            <label className="flex flex-1 flex-col tracking-wider text-gray-900">
              <span className="ml-2 md:text-lg">Password Confirm</span>
              <input
                type="password"
                className="w-full rounded-xl p-2 shadow-md focus:outline-none"
                placeholder="**********"
                // required
                {...register("passwordConfirm", {
                  validate: (val) => {
                    if (!val) return "password confirm is required.";
                    else if (val !== getValues("password"))
                      return "password confirm must match password.";
                    return true;
                  },
                })}
              />
              {errors.passwordConfirm && (
                <p className="text-sm text-red-700">
                  {errors.passwordConfirm.message}
                </p>
              )}
            </label>
            <button
              disabled={isPending}
              className="rounded bg-accent-600 px-3 py-2 text-white hover:bg-accent-500 disabled:cursor-not-allowed disabled:bg-accent-400"
              type="submit"
            >
              {isPending ? <SpinnerMini /> : "reset my password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetMyPassword;
