import generateToken from "../utils/generateToken.js";
import { hashPassword,verifyPassword } from "../utils/helper.js";
import asyncHandler from 'express-async-handler';
import User from "../model/userModel.js";


export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
  
    const userExist = await User.findOne({ email });
  
    if (userExist) {
      res.status(400);
      throw new Error("User already exist");
    }
    const user = await User.create({
      name,
      email,
      password: await hashPassword(password),
    });
  
    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  });
