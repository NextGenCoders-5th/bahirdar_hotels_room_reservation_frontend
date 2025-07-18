import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ILogin } from "../../types/authTypes";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LogInForm from "@/features/auth/form/LoginForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/features/auth/form/schema/LoginSchema";
import { useLoginMutation } from "@/redux/api/authApi";
import { useAuthContext } from "@/context/AuthContext";
import toast from "react-hot-toast";

function SigninPage() {
  const { setUser } = useAuthContext();
  const navigate = useNavigate();
  const formMethods = useForm<ILogin>({
    resolver: zodResolver(LoginSchema),
  });
  const { handleSubmit } = formMethods;

  const [login, { isLoading }] = useLoginMutation();

  const onSubmitHandler = handleSubmit(async (data) => {
    return login(data)
      .unwrap()
      .then((response) => {
        setUser(response.data);
        localStorage.setItem("access-token", response.token || "");
        if (response.data.role === "user") {
          navigate("/");
        } else if (response.data.role === "admin")
          navigate("/dashboard");
      })
      .catch((error) => {
        if (error.status === 401) {
          toast.error("Invalid email or password");
          return;
        }
        toast.error(error.data.message || "Something went wrong");
      });
  });

  return (
    <div className="flex h-[100vh] w-full items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Log In to Your Account</CardTitle>
          <CardDescription>
            Log in to your account to book your favorite hotel.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...formMethods}>
            <LogInForm
              onSubmitHandler={onSubmitHandler}
              isPending={isLoading}
            />
          </FormProvider>
        </CardContent>
        <CardFooter className="flex flex-col">
          {/* <Button variant="outline">Cancel</Button> */}
          <div>
            <CardDescription>
              <div>
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="cursor-pointer text-accent-500 hover:underline"
                >
                  Sign Up
                </Link>
              </div>
              <div>
                <Link
                  to="/forgot-password"
                  className="cursor-pointer text-accent-500 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </CardDescription>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SigninPage;
