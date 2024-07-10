import mongoose from "mongoose";
import User from "../models/user.model.js";

export const getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "server error" });
  }
};

export const updateUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, username, age, gender } = req.body;
    const userToUpdate = await User.findById(id);

    if (!userToUpdate) res.status(404).json({ message: "User not found" });
    if (username !== userToUpdate.username) {
      const findUsername = await User.findOne({ username });
      if (findUsername)
        res.status(400).json({ message: "Username already in use" });
    }
    userToUpdate.fullname = fullname;
    userToUpdate.username = username;
    userToUpdate.gender = gender;
    userToUpdate.age = age;
    userToUpdate.save();
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "server error" });
  }
};
