import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import UserModel from "../models/user.js";

dotenv.config();

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.SECRET, //if doesn't work put 'test'
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  console.log(req.body);
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    if (password !== confirmPassword)
      return res.status(400).json({ message: "password does not match" });
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModel.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });
    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.SECRET, //if doesn't work put 'test'
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const liked = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    console.log(user);
  } catch (error) {
    res.status(404).json({ message: "no liked photos" });
  }
};

export const posted = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    res.status(200).json(user.posted);
  } catch (error) {
    res.status(404).json({ message: "no liked photos" });
  }
};
