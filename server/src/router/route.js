import { Router } from "express";
const router = Router()
import StripeMethod from "../controller/stripe.js";
import { RazorPayService_Order, RazorPayService_VerifyOrder } from "../controller/Rezorpay.js";

router.post('/api/stripepay/create-checkout-session', StripeMethod)
router.post('/api/rezorpay/order-create-checkout-session', RazorPayService_Order)
router.post('/api/rezorpay/verify-create-checkout-session', RazorPayService_VerifyOrder)

export default router;