import User from "../models/user.model.js";

export const checkUserName = async (req, res, next) => {
  try {
    const { username } = req.body;
    const { id } = req.params;
    const userToUpdate = await User.findById(id);
    if (!userToUpdate) res.status(404).json({ message: "User not found" });
    if (username !== userToUpdate.username) {
      const findUsername = await User.findOne({ username });
      if (findUsername)
        return res.status(400).json({ message: "Username already in use" });
    }

    next();
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "server error" });
  }
};
