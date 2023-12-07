import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { changePassword, forgotPassword, getUser, getUserProfile, getUsers, loginUser, registerUser, resetPassword, updateUser } from '../controller/userController.js';

const authRoute = express.Router();

authRoute.post('/signUp',registerUser);
authRoute.post('/login',loginUser);

authRoute.get('/getUsers',getUsers);
authRoute.get('/getUserProfile',protect,getUserProfile);
authRoute.get('/getUser/:id',protect,getUser);

authRoute.put('/updateUser',protect,updateUser);
authRoute.post('/changePassword',protect,changePassword);

authRoute.post('/forgotPassword',forgotPassword);
authRoute.put('/resetPassword',resetPassword);


export default authRoute;