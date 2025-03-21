import User from "../model/userModels.js";
import { verifyToken } from "../utils/jwt.js";
import AppError from "./Apperror.js";

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(new AppError("Not authenticated", 401));
    }

    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

    if (!token) {
      return next(new AppError("Invalid authentication token", 401));
    }

    const decoded = verifyToken(token, process.env.JWT_SECRET);
    if (!decoded) {
      return next(new AppError("Invalid or expired access token", 403));
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

export default authenticate;
