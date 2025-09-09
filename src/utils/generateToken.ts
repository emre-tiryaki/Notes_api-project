import type { Response } from "express";
import type { JwtPayload } from "../middleware/token-verification.js";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

export function generateToken(res: Response, payload: JwtPayload) {
  const secret = process.env.JWT_SECRET;
  if (!secret)
    throw new Error("JWT_SECRET is not defined in environment variables");
  const token = jwt.sign(payload, secret, { expiresIn: "30d" });

  res.cookie("token", token, {
    httpOnly: true, // JS tarafından okunmaz sadece http isteklerinde
    secure: process.env.NODE_ENV === "production", // deploy zamanı https zorunlu olsun diye
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // farklı sitelere veri falan
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 gün
  });

  return token;
}
