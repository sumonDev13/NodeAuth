import User from "../model/userModel.js";
import verifyToken from "../utils/verifyToken.js";
import asyncHandler from 'express-async-handler';

export const protect = asyncHandler(async (req, res, next) => {
    // get token
    const headerObj = req.headers;
    const token = headerObj?.authorization?.split(" ")[1];
    // verify token
    const verifiedToken = verifyToken(token);
    if (verifiedToken) {
      const user = await User.findById(verifiedToken.id).select(
        "name email role"
      );
      req.userAuth = user;
      // console.log(req.userAuth);
      next();
    } else {
      const err = new Error("Token expired/invalid");
      next(err);
    }
  });