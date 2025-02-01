import { Router } from "express";
import { initiatePayment, paymentFailed, paymentSuccess, initiateHotelPayment, hotelpaymentSuccess, hotelpaymentFailed } from "../controllers/payment.controller.js";
const router = Router();

router.route("/").post(initiatePayment);
router.route("/hotel").post(initiateHotelPayment);
router.route("/success").post(paymentSuccess);
router.route("/hotelpaymentSuccess").post(hotelpaymentSuccess);
router.route("/failed").post(paymentFailed);
router.route("/hotelpaymentFailed").post(hotelpaymentFailed);

export default router;