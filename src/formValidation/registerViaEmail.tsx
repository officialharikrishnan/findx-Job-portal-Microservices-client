import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  phone:string
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
    
  })
  

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
