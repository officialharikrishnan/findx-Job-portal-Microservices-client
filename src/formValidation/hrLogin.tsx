import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export type RegisterData = {
  phone: string;
  password: string;
};

export const schema: ZodType<RegisterData> = z
  .object({
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
