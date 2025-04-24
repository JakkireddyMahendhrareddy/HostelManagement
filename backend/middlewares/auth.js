import jwt from "jsonwebtoken";
import {User} from "../models/userModel.js";

export const auth = async (req, res, next) => {
  try {
    const cookie = req.cookies;
    const { jwtToken } = cookie;
  
    // if token is not present then return Unauthorized
    if (!jwtToken) {
      throw new Error("Unauthorized User");
    }
    // Verify the token
    const decodedToken = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
   
    const { id } = decodedToken;
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User Not Found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

