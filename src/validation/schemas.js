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
  videoPath: z
    .string()
    .min(1, "Video path is required")
    .refine((path) => path.startsWith("file:///"), {
      message: "Invalid video path format. Must start with file:///",
    })
    .refine((path) => path.endsWith(".mp4"), {
      message: "Only MP4 videos are supported",
    }),
});
