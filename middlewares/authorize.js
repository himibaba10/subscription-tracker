import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

export const authorize = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const decoded = jwt.verify(token, JWT_SECRET);

  if (!decoded) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  req.user = decoded;
  next();
};
