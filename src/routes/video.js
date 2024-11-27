// src/routes/video.js
import express from "express";
import { uploadToS3 } from "../utils/uploadToS3.js";
import { validateSchema } from "../middleware/validate.js";
import { videoUploadSchema } from "../validation/schemas.js";
import fs from "fs-extra";
import path from "path";

const router = express.Router();

router.post("/upload", validateSchema(videoUploadSchema), async (req, res) => {
  try {
    const { videoPath } = req.body;

    // Remove the file:/// prefix and decode the URI
    let cleanPath = decodeURIComponent(videoPath.replace("file:///", ""));

    // Handle Windows paths properly
    if (process.platform === "win32") {
      // Ensure the drive letter is properly cased (e.g., C:)
      if (cleanPath.match(/^[a-zA-Z]:/)) {
        cleanPath = cleanPath[0].toUpperCase() + cleanPath.slice(1);
      }
      // Convert forward slashes to backslashes for Windows
      cleanPath = cleanPath.replace(/\//g, "\\");
    }

    // Check if file exists
    if (!(await fs.pathExists(cleanPath))) {
      return res.status(404).json({
        error: `Video file not found at path: ${cleanPath}`,
      });
    }

    const videoUrl = await uploadToS3(cleanPath);
    res.json({ videoUrl });
  } catch (error) {
    console.error("Error in video upload:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
