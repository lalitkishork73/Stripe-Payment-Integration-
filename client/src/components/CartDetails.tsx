import { useSelector, useDispatch } from "react-redux"
import { emptyCart } from "../redux/features/CartSlice";
import TableFooter from "./TableFooter";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";


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
                                    <TableFooter />
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

export default CartDetails