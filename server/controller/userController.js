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

    const token = generateToken(user._id);
  
    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  });

  export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    // find user
  
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User not exist" });
    }
    // verify password
  
    const isMatched = await verifyPassword(password, user.password);
    if (!isMatched) {
      return res.json({ message: "Invalid login" });
    } else {
      return res.json({
        token: generateToken(user._id),
        message: "User logged in successfully",
      });
    }
  });
