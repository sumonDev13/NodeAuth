import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { registerUser } from '../controller/userController.js';

const authRoute = express.Router();

authRoute.post('/signUp',registerUser )

export default authRoute;