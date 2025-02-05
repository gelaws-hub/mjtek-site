import { Request, Response } from "express";
import multer from "multer";
import path from "path";
import { uploadFileToGoogleCloud } from "../../utils/googleStorage";
import prisma from "../../utils/database";

// Set up multer to handle file uploads in memory (for Google Cloud Storage)
const upload = multer({ storage: multer.memoryStorage() }).single("proof");

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

      // Generate the file name for Google Cloud Storage
      const fileName = `payment_proof/${transactionId}-${Date.now()}${path.extname(req.file.originalname)}`;

      // Upload the file to Google Cloud Storage using the utility function
      const fileUrl = await uploadFileToGoogleCloud(req.file.buffer, fileName, req.file.mimetype);

      // Save the new file URL to the database
      const updatedTransaction = await prisma.transaction.update({
        where: { id: transactionId },
        data: {
          payment_proof: fileUrl,
          status_id: 3, // Example: updating the status to "proof uploaded"
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
