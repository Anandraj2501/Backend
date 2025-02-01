import { Router } from "express";
import { getBookingData, updateBookingData, getBookingDataById } from "../controllers/booking.controller.js";

const router = Router();

router.route("/").get(getBookingData);
router.route("/getbookingdatabyid/:id").get(getBookingDataById);
router.route("/updateBookingData/:id").put(updateBookingData);

export default router;