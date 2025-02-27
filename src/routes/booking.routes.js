import { Router } from "express";
import { getBookingData, updateBookingData, getBookingDataById, getHotelBookingDataById } from "../controllers/booking.controller.js";

const router = Router();

router.route("/").get(getBookingData);
router.route("/getbookingdatabyid/:id").get(getBookingDataById);
router.route("/gethotelbookingdatabyid/:id").get(getHotelBookingDataById);
router.route("/updateBookingData/:bookingId/passenger/:passengerId").put(updateBookingData);


export default router;