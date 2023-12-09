import Razorpay from 'razorpay';
import dotenv from 'dotenv';
dotenv.config();

const Key_ID = process.env.RAZORPAY_KEY_ID;
const Secret_KEY = process.env.RAZORPAY_SECRET_KEY;

export async function RazorPayService_Order(req, res) {
    try {
        let instance = new Razorpay({
            key_id: Key_ID,
            key_secret: Secret_KEY,
        });


        const options = {
            amount: 1,
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

    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
}
