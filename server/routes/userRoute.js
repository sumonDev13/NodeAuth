import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { loginUser, registerUser } from '../controller/userController.js';

const authRoute = express.Router();

authRoute.post('/signUp',registerUser )
authRoute.post('/login',loginUser)

export default authRoute;