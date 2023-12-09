import { useDispatch } from "react-redux";
import { addToCart, removeFromCart, removeSingle } from "../redux/features/CartSlice";

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

export default TableBody;