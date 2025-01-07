import { Request, Response } from "express";
import multer from "multer";
import prisma from "../../utils/database"; // Adjust this path as needed
import { uploadToCloudinary } from "../../utils/cloudinary"; // Import the reusable module

// Configure multer to handle file uploads in memory
const storage = multer.memoryStorage();
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "application/pdf"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type. Only JPEG, PNG, and PDF are allowed."));
  }
};
const upload = multer({ storage, fileFilter }).single("proof");

// Controller function
export const uploadTransactionProof = async (req: Request, res: Response) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("File upload error:", err);
      return res.status(400).json({ error: err.message });
    }

    try {
      const transactionId = req.params.transactionId;

      if (!req.file) {
        return res.status(400).json({ error: "No file provided." });
      }

      // Check if the transaction exists
      const transaction = await prisma.transaction.findUnique({
        where: { id: transactionId },
      });

      if (!transaction) {
        return res.status(404).json({ error: "Transaction not found." });
      }

      // Upload the file to Cloudinary using the reusable module
      const uploadResult = await uploadToCloudinary(
        req.file.buffer,
        "transactions", // Specify Cloudinary folder
        `${transactionId}-${Date.now()}` // Optional custom public ID
      );

      // Update the transaction record with the Cloudinary URL
      const updatedTransaction = await prisma.transaction.update({
        where: { id: transactionId },
        data: {
          payment_proof: uploadResult.secure_url, // Save the Cloudinary URL
        },
      });

      return res.status(200).json({
        message: "Transaction proof uploaded successfully.",
        transaction: updatedTransaction,
      });
    } catch (error: any) {
      console.error("Error updating transaction:", error);
      res.status(500).json({ error: "Failed to upload transaction proof." });
    }
  });
};
