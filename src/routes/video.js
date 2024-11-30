import express from "express";
import multer from "multer";
import { uploadToS3 } from "../utils/uploadToS3.js";

const upload = multer({
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
});

const router = express.Router();

router.post("/upload", upload.single("video"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload directly from the uploaded file
    const videoUrl = await uploadToS3(req.file.path);

    res.json({ videoUrl });
  } catch (error) {
    console.error("Error in video upload:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
