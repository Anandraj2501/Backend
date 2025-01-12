import { Router } from "express";
import { getBookingData, updateBookingData } from "../controllers/booking.controller.js";

const router = Router();

router.route("/").get(getBookingData);
router.route("/updateBookingData/:id").put(updateBookingData);

export default router;