import { Request, Response } from "express";
import multer from "multer";
import path from "path";
import { uploadFileToGoogleCloud, deleteFileFromGoogleCloud } from "../../utils/googleStorage";
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

      // Delete previous proof if it exists
      if (transaction.payment_proof) {
        const previousFilePath = transaction.payment_proof.split("/").pop(); // Extract file name
        if (previousFilePath) {
          await deleteFileFromGoogleCloud(`payment_proof/${previousFilePath}`);
        }
      }

      // Generate the new file name for Google Cloud Storage
      const fileName = `payment_proof/${transactionId}-${Date.now()}${path.extname(req.file.originalname)}`;

      // Upload the new file to Google Cloud Storage
      const fileUrl = await uploadFileToGoogleCloud(req.file.buffer, fileName, req.file.mimetype);

      // Update the transaction record with the new proof URL
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
