import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoute from './routes/userRoute.js';
import { notFound,errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

connectDB();
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Api running at http://localhost:8000')
});

app.use('/api',authRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`Server listening on ${port}`);
})