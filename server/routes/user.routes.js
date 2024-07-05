import { Router } from "express";
import {
  isAuthorized,
  loginUser,
  logoutUser,
  registerUser,
  userProfile,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", isAuthorized, logoutUser);
router.get("/profile", isAuthorized, userProfile);

export default router;
