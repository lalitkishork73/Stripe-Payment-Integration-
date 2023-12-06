import { Router } from "express";
const router = Router()
import StripeMethod from "../controller/stripe.js";

router.post('/api/stripepay/create-checkout-session', StripeMethod)
router.post('/api/rezorpay/create-checkout-session', StripeMethod)
router.post('/api/paytmpay/create-checkout-session', StripeMethod)

export default router;