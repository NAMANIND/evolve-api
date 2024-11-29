import express from "express";
import { uploadToS3 } from "../utils/uploadToS3.js";
import { validateSchema } from "../middleware/validate.js";
import { videoUploadSchema } from "../validation/schemas.js";
import fs from "fs-extra";
import path from "path";

const router = express.Router();

router.post("/upload", validateSchema(videoUploadSchema), async (req, res) => {
  try {
    const { fileData, fileName } = req.body;
    console.log(fileData);

    // Decode Base64 file data and write to a temporary file
    const tempFilePath = path.join(__dirname, `../../temp/${fileName}`);
    const fileBuffer = Buffer.from(fileData, "base64");

    await fs.writeFile(tempFilePath, fileBuffer);

    // Upload to S3
    const videoUrl = await uploadToS3(tempFilePath);

    // Cleanup temporary file
    await fs.unlink(tempFilePath);

    res.json({ videoUrl });
  } catch (error) {
    console.error("Error in video upload:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
