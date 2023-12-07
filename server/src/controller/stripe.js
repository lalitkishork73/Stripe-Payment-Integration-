import stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const Secret_KEY = process.env.Stripe_Secrete;  
const Stripe = stripe(Secret_KEY)

export default async function StripeMethod(req, res, next) {
    try {
        const { products } = req.body;

        const linItems = products.map((product) => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: product.dish,
                },
                unit_amount: product.price * 100,
            },
            quantity: product.qnty
        }))


        const session = await Stripe.checkout.sessions.create(
            {
                payment_method_types: ['card'],
                line_items: linItems,
                mode: 'payment',
                success_url: `http://localhost:5173/success`,
                cancel_url: `http://localhost:5173/cancel`,
            }
        );

        return res.json({ id: session.id })

    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
}

