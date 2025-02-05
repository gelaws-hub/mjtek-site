import { Request, Response } from "express";
import multer from "multer";
import prisma from "../../utils/database"; // Adjust the path as needed
import { uploadToCloudinary } from "../../utils/cloudinary"; // Import the reusable Cloudinary module

// Configure multer to handle file uploads in memory
const storage = multer.memoryStorage();
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimeTypes = ["image/jpeg", "image/png"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type. Only JPEG and PNG are allowed."));
  }
};
const upload = multer({ storage, fileFilter }).single("profile_pic");

// Controller function
export const uploadProfilePicture = async (req: Request, res: Response) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("File upload error:", err);
      return res.status(400).json({ error: err.message });
    }

    try {
      const userId = req.params.userId;

      if (!req.file) {
        return res.status(400).json({ error: "No file provided." });
      }

      // Upload the file to Cloudinary
      const uploadResult = await uploadToCloudinary(
        req.file.buffer,
        "profile_pictures", // Specify Cloudinary folder
        `${userId}-${Date.now()}` // Optional custom public ID
      );

      // Update the user's profile picture in the database
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          profile_pic: uploadResult.secure_url, // Save the Cloudinary URL
        },
      });

      return res.status(200).json({
        message: "Profile picture updated successfully.",
        user: updatedUser,
      });
    } catch (error: any) {
      console.error("Error updating profile picture:", error);
      res.status(500).json({ error: "Failed to update profile picture." });
    }
  });
};
