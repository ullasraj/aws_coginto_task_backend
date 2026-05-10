import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

export const verifyOtpSchema = z.object({
  email: z.string().email(),
  otp: z.string().min(4),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
