// src/validation/schemas.js
import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1),
  weight: z.number().min(1),
  age: z.number().min(1),
  height: z.number().min(1),
  targetWeight: z.number().min(1),
});

export const exerciseSchema = z.object({
  date: z.string().datetime(),
  exerciseType: z.enum([
    "RUNNING",
    "YOGA",
    "CYCLING",
    "STRENGTH",
    "SWIMMING",
    "HIIT",
  ]),
  duration: z.number().min(1),
  intensity: z.enum(["LIGHT", "MODERATE", "INTENSE"]),
  calories: z.number().min(1),
  videoUrl: z.string().url().optional(),
});

export const videoUploadSchema = z.object({
  fileData: z
    .string()
    .min(1, "File data is required")
    .refine(
      (data) => {
        try {
          Buffer.from(data, "base64"); // Check if it is a valid Base64 string
          return true;
        } catch {
          return false;
        }
      },
      { message: "Invalid Base64 file data" }
    ),
  fileName: z.string().min(1, "File name is required"),
});
