import express from "express";
import {
  getUserDetails,
  updateUserDetails,
} from "../controllers/user.controller.js";
import { checkUserName } from "../middlewares/checkUsername.js";
const router = express.Router();

router.get("/:id", getUserDetails);
router.patch("/:id", checkUserName, updateUserDetails);

export { router as userRouter };
