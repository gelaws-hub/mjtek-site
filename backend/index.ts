import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import produkRoutes from './routes/produkRoutes'; // Ensure the path is correct

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Register routes
app.use('/', produkRoutes); // Prefix all routes with /api

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
