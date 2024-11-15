import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1, "Required").max(256),
});

export const registerSchema = z.object({
  first_name: z.string().trim().min(1, "Required"),
  last_name: z.string().trim().min(1, "Required"),
  //   orgName: z.string().trim().min(1, "Required"),
  email: z.string().trim().email(),
  password: z.string().trim().min(8, "Minimum 8 characters required").max(256),
});