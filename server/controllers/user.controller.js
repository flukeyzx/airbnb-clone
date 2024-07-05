import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const isAuthorized = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isAlreadyUser = await User.findOne({ email });

    if (isAlreadyUser) {
      return res
        .status(400)
        .json({ success: false, message: "This Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    return res.status(201).json({
      success: true,
      message: "Registration successfull",
      user,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUserRegistered = await User.findOne({ email });
    if (!isUserRegistered) {
      return res
        .status(404)
        .json({ success: false, message: "This Email is not registered" });
    }
    const isPasswordMatch = await bcrypt.compare(
      password,
      isUserRegistered.password
    );

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Wrong password try again!" });
    }

    const token = jwt.sign(
      {
        userId: isUserRegistered._id,
      },
      process.env.JWT_SECRET
    );

    res
      .cookie("token", token, { httpOnly: true, expiresIn: "1h" })
      .status(200)
      .json({
        success: true,
        message: "Logged In Successfully",
        isUserRegistered,
      });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const logoutUser = async (_, res) => {
  try {
    res.cookie("token", "", { expires: new Date(0), httpOnly: true });
    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const userProfile = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { _id, email, name } = await User.findById(decoded.userId);
    return res.status(200).json({ name, email, _id });
  }
  return res.status(404).json(null);
};
