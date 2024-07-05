import { Router } from "express";
import {
  uploadFromDevice,
  uploadImageByLink,
} from "../controllers/upload.controller.js";
import photosMiddleware from "../middleware/multer.middleware.js";

const router = Router();

router.post("/upload-by-link", uploadImageByLink);
router.post("/upload", photosMiddleware.array("photo", 100), uploadFromDevice);

export default router;
