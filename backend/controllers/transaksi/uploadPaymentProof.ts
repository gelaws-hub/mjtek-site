import { Request, Response } from "express";
import multer from "multer";
import path from "path";
import { uploadFileToGoogleCloud, deleteFileFromGoogleCloud, getFileFromGoogleCloud } from "../../utils/googleStorage";
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

      // Generate the new file name for Google Cloud Storage - simplified to just use transactionId
      const fileName = `payment_proof/${transactionId}${path.extname(req.file.originalname)}`;

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

export const getTransactionProof = async (req: Request, res: Response) => {
  try {
    const transactionId = req.params.transactionId;

    // Get the transaction and verify it exists
    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
      select: {
        id: true,
        payment_proof: true,
      }
    });

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found." });
    }

    if (!transaction.payment_proof) {
      return res.status(404).json({ error: "No payment proof found for this transaction." });
    }

    try {
      // Handle direct Google Cloud Storage URLs
      if (transaction.payment_proof.startsWith('https://storage.googleapis.com/')) {
        return res.redirect(transaction.payment_proof);
      }

      // Get filename from payment_proof URL/path
      const paymentProofFilename = transaction.payment_proof.split('/').pop();
      
      if (!paymentProofFilename) {
        return res.status(404).json({ error: "Invalid payment proof URL." });
      }

      // Verify that the filename contains the transaction ID
      if (!paymentProofFilename.startsWith(transactionId)) {
        console.error('Payment proof filename does not match transaction ID:', {
          transactionId,
          filename: paymentProofFilename
        });
        return res.status(404).json({ error: "Payment proof does not match transaction." });
      }

      // Get file from Google Cloud Storage
      const filePath = `payment_proof/${paymentProofFilename}`;
      console.log('Fetching file:', filePath);
      
      const fileBuffer = await getFileFromGoogleCloud(filePath);
      
      // Set content type based on file extension
      const ext = path.extname(paymentProofFilename).toLowerCase();
      const contentType = 
        ext === '.pdf' ? 'application/pdf' :
        ext === '.png' ? 'image/png' :
        ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' :
        'application/octet-stream';
      
      // Set response headers
      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Disposition', `inline; filename="payment_proof_${transactionId}${ext}"`);
      res.setHeader('Cache-Control', 'public, max-age=31536000');
      
      return res.send(fileBuffer);
    } catch (error) {
      console.error("Error retrieving file from storage:", error);
      // Fallback to direct URL if available
      if (transaction.payment_proof.startsWith('https://storage.googleapis.com/')) {
        return res.redirect(transaction.payment_proof);
      }
      return res.status(404).json({ error: "File not found in storage." });
    }
  } catch (error) {
    console.error("Error retrieving payment proof:", error);
    return res.status(500).json({ error: "Failed to retrieve payment proof." });
  }
};
