import { startSession } from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { hashPassword } from "../utils/hashPassword.js";
import { createToken } from "../utils/createToken.js";
import { comparePassword } from "../utils/comparePassword.js";

export const signUp = async (req, res, next) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error("User already available");
      error.statusCode = 409;
      throw error;
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    const newUsers = await User.create(
      [{ name, email, password: hashedPassword }],
      { session }
    );

    const token = createToken({ userId: newUsers[0]._id });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { token, user: newUsers[0] },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("Email or password is invalid!");
      error.status = 404;
      throw error;
    }

    // Validate hashed password
    const isPasswordValidate = await comparePassword(password, user.password);

    if (!isPasswordValidate) {
      const error = new Error("Email or password is invalid!");
      error.status = 404;
      throw error;
    }

    const token = createToken({ userId: user._id });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: { user, token },
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  const { name, email, password } = req.body;
};
