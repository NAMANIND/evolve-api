import { PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs-extra";
import path from "path";
import { s3Client } from "../config/s3Config.js";
export const uploadToS3 = async (filePath) => {
  try {
    // Read the file
    const fileContent = await fs.readFile(filePath);
    const fileName = `videos/${Date.now()}-${path.basename(filePath)}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: fileContent,
      ContentType: "video/mp4",
    });

    await s3Client.send(command);

    // Generate the URL for the uploaded video
    const videoUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    // Clean up the temporary file
    // await fs.unlink(filePath);

    return videoUrl;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw error;
  }
};
