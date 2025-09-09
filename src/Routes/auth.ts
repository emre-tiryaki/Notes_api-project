import express from "express";
import userModel, { type IUser } from "../models/userModel.js";
import { hashPassword } from "../utils/hashPassword.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcrypt";
import type { Types } from "mongoose";

const authRoute = express.Router();

//for registering a new user
authRoute.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "insufficient parameters" });

  try {
    const existingUser =
      ((await userModel.findOne({ email: email }).exec()) as IUser) || null;

    if (existingUser)
      return res
        .status(409)
        .json({ message: "There is someone with the exact email" });

    const hashedPassword = await hashPassword(password);

    const user = await userModel.create({ email: email, password: hashedPassword });

    const token = generateToken(res, { userId: user._id });

    return res
      .status(201)
      .json({ token ,message: `${user.email} has been created and saved` });
  } catch (error) {
    return res.status(500).json({ message: `(register)Internal server error: ${error}` });
  }
});

//for logging in
authRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "insufficient parameters" });

  try {
    const user =
      ((await userModel.findOne({ email: email })) as IUser) || null;

    if (!user)
      return res
        .status(409)
        .json({ message: "There are no users with that email" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({ message: "Passwords are not matching" });

    const token = generateToken(res, { userId: user._id as Types.ObjectId });

    return res
      .status(200)
      .json({ token ,message: `${user.email} Successfully logged in` });
  } catch (error) {
    return res.status(500).json({ message: `(login)Internal server error: ${error}` });
  }
});

export default authRoute;
