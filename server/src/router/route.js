import { Router } from "express";
const router = Router()
import StripeMethod from "../controller/stripe.js";
import { RazorPayService_Order } from "../controller/Rezorpay.js";

router.post('/api/stripepay/create-checkout-session', StripeMethod)
router.post('/api/rezorpay/order-create-checkout-session', RazorPayService_Order)
router.post('/api/paytmpay/create-checkout-session', StripeMethod)

export default router;