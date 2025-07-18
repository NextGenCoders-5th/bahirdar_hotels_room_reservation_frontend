import { FormProvider, useForm } from "react-hook-form";
import SignUpForm from "./form/SignUpForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ISignup } from "@/types/userTypes";
import { SignupSchema } from "@/features/auth/form/schema/SignupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "@/redux/api/authApi";
import toast, { Renderable, Toast, ValueFunction } from "react-hot-toast";

function SignupPage() {
  const formMethods = useForm<ISignup>({
    resolver: zodResolver(SignupSchema),
  });
  const { handleSubmit } = formMethods;
  const [signup, { isLoading }] = useSignupMutation();
  const navigate = useNavigate();

  const onSubmitHandler = handleSubmit(async (data) => {
    return signup(data)
      .unwrap()
      .then((response: { message: Renderable | ValueFunction<Renderable, Toast>; }) => {
        console.log(response);
        toast.success(response.message);
        navigate("/login");
      })
      .catch((error: { data: Error; }) => {
        console.log(error);
        toast.error((error.data as Error).message);
      });
  });

  return (
    <div className="flex h-[100vh] w-full items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>
            Create an account to book your favorite hotel.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...formMethods}>
            <SignUpForm
              onSubmitHandler={onSubmitHandler}
              isPending={isLoading}
            />
          </FormProvider>
        </CardContent>
        <CardFooter className="flex flex-col">
          {/* <Button variant="outline">Cancel</Button> */}
          <div>
            <CardDescription>
              have an account?{" "}
              <Link to="/login" className="cursor-pointer text-accent-500 hover:underline ">
                Sign in
              </Link>
            </CardDescription>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SignupPage;
