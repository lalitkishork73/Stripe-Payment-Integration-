import { useSelector, useDispatch } from "react-redux"
import { addToCart, removeFromCart, removeSingle, emptyCart } from "../redux/features/CartSlice";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

function CartDetails() {
    const { cart }: any = useSelector((state) => state)
    const dispatch = useDispatch()

    const handleEmptyCart = () => {
        dispatch(emptyCart())
    }
    const data = cart.carts;
    return (
        <>
            <section className="flex justify-center h-[90vh] w-screen ">
                <div className="w-full px-1 md:px-0 md:w-[60%]  mt-[100px] rounded-md ">
                    <div className="bg-[#110c4d] text-white flex justify-between items-center px-5 h-[70px] rounded-t-md ">
                        <p className="font-bold text-lg md:text-2xl mt-3">Cart Calculation ({data.length})</p>
                        {data.length > 0 ? <button onClick={handleEmptyCart} className="bg-red-500 text-sm font-bold px-2 py-2 rounded-md"><span><i className="fa-solid fa-trash" style={{ color: '#ffffff' }}></i></span> Empty Cart</button> : null}
                    </div>
                    <div className="border-[#110c4d] border-1 rounded-b-md">

                        {data.length !== 0 ? <>
                            <div className="relative overflow-x-auto shadow-md sm:rounded-b-md">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <TableHeader />
                                    {
                                        data.map((item: any) => <>
                                            <TableBody item={item} />
                                        </>)
                                    }
                                    <TableFooter item={data} />
                                </table>
                            </div>

                        </>
                            : <div className="flex flex-col justify-center items-center h-[200px]">
                                <span><i className="fa-solid fa-cart-shopping" style={{ color: '#bdd5ff', fontSize: 30 }}></i></span>
                                <p className="text-[#bdd5ff] text-2xl">Your Cart Is Empty</p>
                            </div>}

                    </div>

                </div>
            </section >
        </>
    )
}


const TableBody = ({ item }: any) => {
    const dispatch = useDispatch();
    const handleAdditem = (item: any) => {
        dispatch(addToCart(item))
    }
    const handleRemoveitem = (item: any) => {
        dispatch(removeFromCart(item))
    }

    const handleRemoveSingleitems = (items: any) => {
        dispatch(removeSingle(items))
    }
    return (<>
        <tbody className="bg-[#1F2937]">
            <tr className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-8">
                    <span className="bg-red-200 p-2 px-3 rounded-md " onClick={() => { handleRemoveitem(item) }}>
                        <i className="fa-solid fa-trash" style={{ color: '#f73b3b' }}></i>
                    </span>
                </td>
                <td className="p-4">
                    <img src={item.imgdata} className="w-16 max-w-full h-16 max-h-full" alt="Apple Watch" />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-100 dark:text-whitey">{item.dish}</td>
                <td className="px-7 text-green-500 font-medium">{item.price}</td>
                <td className="flex justify-center px-1 py-10">
                    <div className="flex items-center w-32">
                        <button type="button" onClick={() => { item.qnty > 1 ? handleRemoveSingleitems(item) : handleRemoveitem(item) }}>
                            <span className="px-2 py-2">
                                <i className="fa-solid fa-minus"></i>
                            </span>

                        </button>
                        <div >
                            <input type="number" id="first_product" className="bg-gray-50 w-16 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required value={item.qnty} />
                        </div>
                        <button type="button" onClick={() => { handleAdditem(item) }}>
                            <span className="px-2 py-2">
                                <i className="fa-solid fa-plus"></i>
                            </span>

                        </button>
                    </div>
                </td>
                <td className="px-14 font-semibold text-green-500">{item.qnty * item.price}</td>
            </tr>
        </tbody>
    </>)
}


const TableHeader = () => <>
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
            <th scope="col" className="px-4 py-3">Action</th>
            <th scope="col" className="px-6 py-3">Product</th>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Price</th>
            <th scope="col" className="px-20 py-3">Qty</th>
            <th scope="col" className="px-6 py-3">Total Amount</th>
        </tr>
    </thead>

</>



// Table Footer 

const TableFooter = ({ item }: any) => {
    const { cart }: any = useSelector((state) => state)

    const [totalPrice, setTotalAmount] = useState()
    const [totalqnty, setTotalqnty] = useState()

    const Stripe_KEY = JSON.stringify(import.meta.env.VITE_REACT_APP_STRIPE_PUBLIC_KEY)


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

        // console.log(response)

        const session = await response.json()



        console.log(session)

        const result: any = stripe?.redirectToCheckout({
            sessionId: session.id
        })
        // console.log(result)

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

export default CartDetails