import { Router } from "express";
import { getBookingData, updateBookingData, getBookingDataById, getHotelBookingDataById, getHotelBookingData, updateHotelBookingData,getStats} from "../controllers/booking.controller.js";

const router = Router();

router.route("/").get(getBookingData);
router.route("/hotel").get(getHotelBookingData);
router.route("/getStats").get(getStats);
router.route("/getbookingdatabyid/:id").get(getBookingDataById);
router.route("/gethotelbookingdatabyid/:id").get(getHotelBookingDataById);
router.route("/updateBookingData/:bookingId/passenger/:passengerId").put(updateBookingData);
router.route("/updateHotelBookingData/:bookingId/passenger/:passengerId").put(updateHotelBookingData);


export default router;