import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import produkRoutes from './routes/productRoutes';
import produkDetailRoutes from './routes/productDetailRoutes'; 
import simulationRoutes from './routes/simulationRoutes';
import transaksiRoutes from './routes/transactionRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cookieParser());

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Register routes
app.use('/', produkRoutes);
app.use('/', produkDetailRoutes);
app.use('/', simulationRoutes);
app.use('/', transaksiRoutes)

// Root route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
