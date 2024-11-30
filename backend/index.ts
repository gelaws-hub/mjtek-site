import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import produkRoutes from "./routes/productRoutes";
import produkDetailRoutes from "./routes/productDetailRoutes";
import simulationRoutes from "./routes/simulationRoutes";
import transaksiRoutes from "./routes/transactionRoutes";
import userRoutes from "./routes/userRoutes";
import mediaUploaderRouter from "./routes/mediaUploaderRoutes";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const allowedOrigin = process.env.CORS_ALLOWED_ORIGIN || "";
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origin === allowedOrigin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/", produkRoutes);
app.use("/", produkDetailRoutes);
app.use("/", simulationRoutes);
app.use("/", transaksiRoutes);
app.use("/", userRoutes);
app.use("/", mediaUploaderRouter);

// Serve the uploads directory
const uploadsDir = path.join(process.cwd(), process.env.PRODUCT_UPLOADS_DIR || "uploads/products");
app.use("/uploads/products", express.static(uploadsDir));

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use((req, res) => {
  res.status(404).send("Not Found");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(uploadsDir);
});
