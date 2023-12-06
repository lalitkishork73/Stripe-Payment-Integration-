import stripe from 'stripe';
const Stripe = stripe('sk_test_51OKEkzSBQyUaDqXvuzzuHAPG5n6BExlOWq5ne3yJ3zFfMc34eLQHNaACR6mXDdQgNIWPkEKtsWjI6Eej63ziGAKC004c0qGLcM')

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

        // console.log(session)
        return res.json({ id: session.id })

    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
}
