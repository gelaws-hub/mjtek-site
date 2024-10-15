import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import produkRoutes from "./routes/productRoutes";
import produkDetailRoutes from "./routes/productDetailRoutes";
import simulationRoutes from "./routes/simulationRoutes";
import transaksiRoutes from "./routes/transactionRoutes";
import transactionLogRoutes from "./routes/transactionLogRoutes"; // Import the transaction logs routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Register routes with prefixes
app.use("/api/products", produkRoutes);
app.use("/api/product-details", produkDetailRoutes);
app.use("/api/simulations", simulationRoutes);
app.use("/api/transactions", transaksiRoutes);
app.use("/api/transaction-logs", transactionLogRoutes); // Register transaction logs route

// Root route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).send("Not Found");
});

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
