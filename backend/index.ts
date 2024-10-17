<<<<<<< HEAD
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import productRoutes from "./routes/productRoutes"; // Renamed to 'product'
import productDetailRoutes from "./routes/productDetailRoutes"; // Renamed to 'productDetail'
import simulationRoutes from "./routes/simulationRoutes"; // Remains the same
import transactionRoutes from "./routes/transactionRoutes"; // Remains the same
import transactionLogRoutes from "./routes/transactionLogRoutes"; // Remains the same
=======
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import produkRoutes from './routes/productRoutes';
import produkDetailRoutes from './routes/productDetailRoutes'; 
import simulationRoutes from './routes/simulationRoutes';
import transaksiRoutes from './routes/transactionRoutes';

>>>>>>> 3192a890fb93685c491c89f7737b2befeb0ac8bc

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Register routes with prefixes
app.use("/api/products", productRoutes); // Renamed to 'products'
app.use("/api/product-details", productDetailRoutes); // Renamed to 'product-details'
app.use("/api/simulations", simulationRoutes); // Remains the same
app.use("/api/transactions", transactionRoutes); // Remains the same
app.use("/api/transaction-logs", transactionLogRoutes); // Remains the same

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
