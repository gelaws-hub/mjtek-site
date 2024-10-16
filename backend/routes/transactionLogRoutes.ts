// src/routes/transactionLogs.ts
import express from "express";
import {
  getTransactionLogs,
  authenticateAdmin,
  getUniqueTransactionCount,
} from "../controllers/transaction/transactionLogController";

const router = express.Router();

// Get transaction logs with filtering
router.get(
  "/",
  authenticateAdmin,
  getTransactionLogs,
  getUniqueTransactionCount
);

export default router; // Ensure to export the router instance
