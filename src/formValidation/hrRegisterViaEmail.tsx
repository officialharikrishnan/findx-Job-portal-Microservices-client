import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export type HrRegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName:string;
};

export const schema: ZodType<HrRegisterData> = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "Firstname must contain at least 2 character(s)" }),
    lastName: z.string().min(1,{message:"Lastname must contain at least 2 character(s)"}),
    email: z
      .string()
      .email({ message: "Please provide a valid email address" }),
    phone: z.string().refine((value) => value.length === 10, {
      message: "Enter valid Number",
    }),
    companyName: z.string().min(2,{message:"Please Enter Company Name"})
  })

export const useValidate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HrRegisterData>({ resolver: zodResolver(schema) });
  return {
    register,
    handleSubmit,
    errors,
  };
};
