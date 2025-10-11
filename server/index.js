import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import path from 'path';
import helmet from "helmet";
import rateLimit from "express-rate-limit";
dotenv.config();
import process from "process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 10000;
const API_URL = process.env.API_URL

if (!API_URL) {
  console.error("FATAL: API_URL environment variable is not defined");
  process.exit(1);
}

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.disable('x-powered-by');


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: "Too many requests, please try again later.",
});
app.use('/convert', limiter);


app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date().toISOString() });
});

if (process.env.NODE_ENV === 'production') {
  const staticPath = path.join(__dirname, '../dist');
  console.log('Static path:', staticPath);
  
  app.use(express.static(staticPath));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  });
}
const formatCurrency = (value, currency) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};


app.post("/convert", async (req, res) => {
  const { amount, from, to } = req.body;
  
  console.log("Received conversion request:", { amount, from, to }); 

  try {
    const date = new Date().toISOString().split("T")[0];
    const apiUrl = `${API_URL}from=${from}&to=${to}&date=${date}&amount=${amount}&format=json`;

    const response = await axios.get(apiUrl, { timeout: 20000 });

    const result = formatCurrency(response.data.result, to);
    res.json({ success: true, result });

  } catch (error) {
    console.error("Full error details:", { 
      message: error.message,
      code: error.code,
      response: error.response?.data,
      stack: error.stack
    });
    
    res.status(500).json({
      success: false,
      error: error.response?.data?.message || "An error occurred during conversion"
    });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});