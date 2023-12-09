import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { loadStripe } from "@stripe/stripe-js";
import { PostApiStripe, PostApiRazorPay, PostApiRazorPayVerify } from "../api/stripeApi";

const TableFooter = () => {
    const { cart }: any = useSelector((state) => state)

    const [totalPrice, setTotalAmount] = useState()
    const [totalqnty, setTotalqnty] = useState()



    const [selectedPayment, setSelectedPayment] = useState('Stripe');

    // Handle the change event when a different option is selected
    const handlePaymentChange = (event: any) => {
        setSelectedPayment(event.target.value);
    };


    const Stripe_KEY = import.meta.env.VITE_REACT_APP_STRIPE_PUBLIC_KEY
    const RZOR_KEY = import.meta.env.VITE_REACT_APP_ROZRPAY_KEY
    useEffect(() => { }, [Stripe_KEY, RZOR_KEY])


    const total = () => {
        try {
            let totalAmount: any = 0;
            let totalqnty: any = 0
            cart.carts.map((item: any) => {
                totalAmount += item.price * item.qnty
                totalqnty += item.qnty;
            })
            setTotalAmount(totalAmount)
            setTotalqnty(totalqnty)
        } catch (err: any) {
            console.error(err)
        }

    }

    useEffect(() => { total() }, [total])




    const handleCheckOut = async () => {
        try {
            console.log('Check')
            if (selectedPayment === "Stripe") stripePaymentSystem();
            if (selectedPayment === "RazorPay") razorPayPaymentSystem();
            if (selectedPayment === "PayTm") PayTmPaymentSystem();

        } catch (err: any) {
            console.error(err)
        }
    }

    const stripePaymentSystem = async () => {
        try {
            console.log('stripe')
            const stripe = await loadStripe(Stripe_KEY);
            const body = {
                products: cart.carts
            }
            const session = await PostApiStripe(body);
            const result: any = stripe?.redirectToCheckout({
                sessionId: session.id
            })
            if (result.error) {
                console.log(result.error)
            }

        } catch (err: any) {
            console.error(err)
        }
    }


    const razorPayPaymentSystem = async () => {
        try {
            console.log("Razorpay")
            const body = {
                products: cart.carts
            }
            const session = await PostApiRazorPay(body)
            handleRazorPayResponse(session)

        }
        catch (err: any) {
            console.error(err)
        }
    }

    const handleRazorPayResponse = ({ data }: any) => {
        try {
            console.log(data)

            const options = {
                key: RZOR_KEY,
                amount: Number(data.amount),
                currency: data.currency,
                name: "Food Plaza",
                description: "Test Transaction",
                image: "https://example.com/your_logo",
                order_id: data.id,
                handler: async (response: any) => {
                    const res = await PostApiRazorPayVerify(response);
                    console.log(res)
                },
                theme: {
                    color: "#3399cc"
                }
            }

            const rzp = new (window as any).Razorpay(options);
            rzp.open()

        } catch (err) {
            console.error(err)
        }
    }


    const PayTmPaymentSystem = () => {
        try {
            console.log("PayTm")
        }
        catch (err: any) {
            console.error(err)
        }
    }



    return <>
        <tfoot className="bg-black">
            <tr className="font-semibold text-gray-900 dark:text-white">
                <th scope="row" className="px-6 py-3 text-base text-center">Total </th>
                <td></td>
                <td></td>
                <td></td>
                <td className="flex justify-center items-center p-2 py-4 text-red-500 text-center">{totalqnty}</td>
                <td className=" px-14 py-3 text-red-500 text-center">{totalPrice}</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td className="text-center">Payment Options</td>
                <td className="p-4"><select name="paymentOptions" id="paymentOptions" value={selectedPayment}
                    onChange={handlePaymentChange}
                    className="bg-transparent w-full">
                    <option value="Stripe">Stripe</option>
                    <option value="RazorPay">RazorPay</option>
                    <option value="PayTm">PayTm</option>
                </select>  </td>
                <td className="flex justify-center p-2"><button className="px-4 bg-green-500 text-white font-bold border-0 rounded-md py-2" onClick={() => { handleCheckOut() }}>CheckOut</button></td>
            </tr>
        </tfoot>
    </>
}

export default TableFooter;