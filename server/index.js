import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();

connectDB();
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port,()=>{
    console.log(`Server listening on ${port}`);
})