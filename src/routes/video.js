import express from "express";
import multer from "multer";
import { uploadToS3 } from "../utils/uploadToS3.js";
import { validateSchema } from "../middleware/validate.js";
import fs from "fs-extra";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "tmp/uploads/"); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
const router = express.Router();

router.post("/upload", upload.single("video"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No video file provided" });
    }

    const filePath = req.file.path;
    const videoUrl = await uploadToS3(filePath);

    res.json({ videoUrl });
  } catch (error) {
    console.error("Error in video upload:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
