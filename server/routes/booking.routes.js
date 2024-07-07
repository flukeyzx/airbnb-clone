import { Router } from "express";
import { getBookings, newBooking } from "../controllers/booking.controller.js";
import { isAuthorized } from "../controllers/user.controller.js";

const router = Router();

router.post("/booking", newBooking);
router.get("/bookings", isAuthorized, getBookings);

export default router;
