import * as z from "zod";

export const registerSchema = z.object({
    name: z.string().nonempty("Name is required")
      .min(3, "Name must be at least 3 characters long") .max(20, "Name must be at most 20 characters long"),

    email: z.string().nonempty("Email is required")
      .email("Invalid email format"),

    password: z.string().nonempty("Password is required").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Invalid password format"),

    rePassword: z.string().nonempty("Confirm Password is required"),

    dateOfBirth: z.string().nonempty("Birth date is required")
    .refine((dateOfBirth) => {
      let currentDate = new Date().getFullYear();
      let ageYear = new Date(dateOfBirth).getFullYear();
      return currentDate - ageYear >= 18;
    },"Must be at least 18 years old"),

    gender: z.string().nonempty("Gender is required"),

  }).refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export const loginSchema = z.object({
  email: z.string().nonempty("Email is required"),
  password: z.string().nonempty("Password is required"),
});