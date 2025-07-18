import { z } from "zod";

export const SignupSchema = z
  .object({
    username: z
      .string({ message: "username is required" })
      .min(4, { message: "username should be at least 4 characters" })
      .max(255, { message: "username should be at most 255 characters" }),

    email: z
      .string({ message: "email is required" })
      .email({ message: "invalid email" }),
    phoneNumber: z
      .string({ message: "phone number is required" })
      .min(10, { message: "phone number should be at least 10 characters" })
      .max(15, { message: "phone number should be at most 15 characters" }),
    password: z
      .string({ message: "password is required" })
      .min(8, { message: "password should be at least 8 characters" }),
    passwordConfirm: z.string({ message: "password confirm is required" }),
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        code: "custom",
        path: ["passwordConfirm"],
        message: "Passwords do not match",
      });
    }
  });
