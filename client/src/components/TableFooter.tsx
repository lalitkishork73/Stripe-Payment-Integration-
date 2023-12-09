import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { loadStripe } from "@stripe/stripe-js";

const TableFooter = () => {
    const { cart }: any = useSelector((state) => state)

    const [totalPrice, setTotalAmount] = useState()
    const [totalqnty, setTotalqnty] = useState()

    const Stripe_KEY = import.meta.env.VITE_REACT_APP_STRIPE_PUBLIC_KEY


    useEffect(() => { }, [Stripe_KEY])
    const total = () => {
        let totalAmount: any = 0;
        let totalqnty: any = 0
        cart.carts.map((item: any) => {
            totalAmount += item.price * item.qnty
            totalqnty += item.qnty;
        })

        setTotalAmount(totalAmount)
        setTotalqnty(totalqnty)

    }

    const handleCheckOut = async () => {
        console.log("clicked")
        const stripe = await loadStripe(Stripe_KEY);
        const body = {
            products: cart.carts
        }
        const headers = {
            "Content-Type": "application/json"
        }

        const response = await fetch('http://localhost:7000/api/stripepay/create-checkout-session', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        })

        const session = await response.json()
        const result: any = stripe?.redirectToCheckout({
            sessionId: session.id
        })


        if (result.error) {
            console.log(result.error)
        }
    }

    useEffect(() => {
        total()
    }, [total])


    return <>
        <tfoot className="bg-black">
            <tr className="font-semibold text-gray-900 dark:text-white">
                <th scope="row" className="px-6 py-3 text-base">Total </th>
                <td></td>
                <td></td>
                <td></td>
                <td className="flex justify-center items-center p-2 py-4 text-red-500">{totalqnty}</td>
                <td className=" px-14 py-3 text-red-500">{totalPrice}</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td className="flex justify-center p-2"><button className="px-4 bg-green-500 text-white font-bold border-0 rounded-md py-2" onClick={() => { handleCheckOut() }}>CheckOut</button></td>
            </tr>
        </tfoot>
    </>
}

export default TableFooter;