import { Router } from "express";
import {
  addNewPlace,
  getAllPlaces,
  getAllUserPlaces,
  getPlace,
  updatePlace,
} from "../controllers/place.controller.js";

const router = new Router();

router.post("/places/new", addNewPlace);
router.get("/user-places", getAllUserPlaces);
router.get("/place/:id", getPlace);
router.put("/place/update", updatePlace);
router.get("/places", getAllPlaces);

export default router;
