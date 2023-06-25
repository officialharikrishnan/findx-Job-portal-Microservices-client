import { number, string, z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export const schema: ZodType<RegisterData> = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "Firstname must contain at least 2 character(s)" }),
    lastName: z.string(),
    email: z
      .string()
      .email({ message: "Please provide a valid email address" }),
    phone: z.string().refine((value) => value.length === 10, {
      message: "Enter valid Number",
    }),
    password: z
      .string()
      .min(5, { message: "password must contain atleast 5 characters" })
      .max(16, { message: "password cannot exceed 16 characters" })
      .regex(/[A-Z]/, {
        message: "password must contain atleast one Uppercase",
      }),
    confirmPassword: z.string(),
  })
  .refine((str) => str.password === str.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export const useValidate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({ resolver: zodResolver(schema) });
  return {
    register,
    handleSubmit,
    errors,
  };
};
