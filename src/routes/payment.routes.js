import { Router } from "express";
import { initiatePayment, paymentFailed, paymentSuccess } from "../controllers/payment.controller.js";
const router = Router();

router.route("/").post(initiatePayment);
router.route("/success").post(paymentSuccess);
router.route("/failed").post(paymentFailed);

export default router;