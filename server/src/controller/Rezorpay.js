import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();


const Key_ID = process.env.RAZORPAY_KEY_ID;
const Secret_KEY = process.env.RAZORPAY_SECRET_KEY;

export async function RazorPayService_Order(req, res) {
    try {
        const { products } = req.body;

        let totalPrice = 0;
        products.map(product => {
            totalPrice += product.price * product.qnty
        })

        let instance = new Razorpay({
            key_id: Key_ID,
            key_secret: Secret_KEY,
        });

        const options = {
            amount: totalPrice * 100,
            currency: "INR",
            receipt: "order_receiptId"
        }

        instance.orders.create(options, (err, order) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            return res.status(200).json({ message: 'Order created', data: order });
        })

    }
    catch (err) {
        return res.status(500).send({ message: err.message });
    }
}


export async function RazorPayService_VerifyOrder(req, res) {
    try {
        console.log(req.body)
        let body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id

        let expecedSignature = crypto.createHmac('sha256', Secret_KEY).update(body.toString()).digest('hex');
        if (expecedSignature === req.body.razorpay_signature) {
            return res.status(200).json({ message: 'signature verified' })
        }
        return res.status(400).json({ message: 'Invalid signature' })


    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
}
