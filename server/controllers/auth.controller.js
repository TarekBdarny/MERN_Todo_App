import bcrypt from "bcrypt";

import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const register = async (req, res) => {
  const { fullname, username, password, confirmPassword, age, gender } =
    req.body;
  const user = await User.findOne({ username });
  if (user) {
    return res.status(400).json({ message: "User already exists!" });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "passwords do not match" });
  }
  if (age < 12)
    return res.status(400).json({ message: "age must be above 12" });
  if (gender !== "male" && gender !== "female")
    return res.status(400).json({ message: "gender must be male or female" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    fullname,
    username,
    password: hashedPassword,
    age,
    gender,
  });
  // generateTokenAndSetCookie(newUser._id);
  await newUser.save();
  return res.status(201).json(newUser);
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    const isPasswordsMatch = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordsMatch)
      return res.status(400).json({ message: "Invalid username or password" });

    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      age: user.age,
      gender: user.gender,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      __v: user.__v,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
export const logout = (req, res) => {};
