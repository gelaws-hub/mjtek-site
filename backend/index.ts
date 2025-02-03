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
import profileRoutes from "./routes/profileRoutes";
import mediaUploaderRouter from "./routes/mediaUploaderRoutes";
import path from "path";
import chartRoutes from "./routes/chart";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Get the allowed origins from the environment variables (comma-separated)
const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS
  ? process.env.CORS_ALLOWED_ORIGINS.split(",")
  : [];

  console.log(allowedOrigins);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Enable sending cookies
  })
);

// app.use(cors());

app.use("/", produkRoutes);
app.use("/", produkDetailRoutes);
app.use("/", simulationRoutes);
app.use("/", transaksiRoutes);
app.use("/", userRoutes);
app.use("/", profileRoutes);
app.use("/", mediaUploaderRouter);
app.use("/", chartRoutes);

// Serve the uploads directory
const uploadsDir = path.join(
  process.cwd(),
  process.env.PRODUCT_UPLOADS_DIR || "uploads"
);
app.use("/uploads", express.static(uploadsDir));

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use((req, res) => {
  res.status(404).send("Not Found");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // console.log(uploadsDir);
});
