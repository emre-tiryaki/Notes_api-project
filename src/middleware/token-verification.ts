import type { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";

export interface JwtPayload {
  userId: Types.ObjectId;
}

export async function tokenVerification(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  const token = req.cookies.token || (authHeader && authHeader.split(" ")[1]);

  if (!token)
    return res
      .status(401)
      .json({ message: "Invalid or missing token. Unauthorized access!" });

  try {
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret) as JwtPayload;

    req.userId = decoded.userId;
    
    next();
  } catch (error) {
    return res.status(500).json({ message: "Token verification error." });
  }
}
