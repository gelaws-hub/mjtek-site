import { Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import prisma from "../../utils/database";

// Configure multer for local file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(process.cwd(), "uploads", "transactions");

    // Ensure the directory exists
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
      console.log(`Directory created: ${uploadsDir}`);
    }

    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const transactionId = req.params.transactionId || "unknown";
    const timestamp = Date.now();
    const extension = path.extname(file.originalname);
    const fileName = `${transactionId}-${timestamp}${extension}`;
    cb(null, fileName);
  },
});

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

      // Delete the existing proof file if it exists
      if (transaction.payment_proof) {
        const existingFilePath = path.join(process.cwd(), transaction.payment_proof);
        if (fs.existsSync(existingFilePath)) {
          fs.unlinkSync(existingFilePath);
          // console.log(`Deleted existing file: ${existingFilePath}`);
        }
      }

      // Save the new file path to the database
      const filePath = `/uploads/transactions/${req.file.filename}`;
      const updatedTransaction = await prisma.transaction.update({
        where: { id: transactionId },
        data: {
          payment_proof: filePath,
          status_id: 3,
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
