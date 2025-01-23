import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from "cloudinary";
import { Readable } from "stream";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, 
});

/**
 * Upload a file buffer directly to Cloudinary.
 * @param fileBuffer - The file buffer to upload.
 * @param folder - The folder in Cloudinary where the file will be stored.
 * @param publicId - A custom public ID for the file (optional).
 * @returns {Promise<UploadApiResponse>} - The response from Cloudinary.
 */
export const uploadToCloudinary = (
  fileBuffer: Buffer,
  folder: string,
  publicId?: string
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto", // Automatically detect file type
        public_id: publicId,
      },
      (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (error) {
          return reject(error);
        }
        resolve(result!);
      }
    );

    const readableStream = Readable.from(fileBuffer);
    readableStream.pipe(uploadStream);
  });
};
