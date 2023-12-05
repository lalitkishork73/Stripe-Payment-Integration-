import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"

function Header() {

    const { cart }: any = useSelector((state) => state)
    console.log(cart.carts.length)
    return (
        <nav className="flex bg-black text-white h-[60px] justify-around">
            <div>
                <h1>E commerce</h1>
            </div>

            <ul className="h-full list-none flex items-center ">
                <li className="px-2"><NavLink to='/' className='text-white font-bold no-underline'>Home</NavLink></li>
                <li className="px-2"><NavLink to='/cart' className='text-white font-bold no-underline'>Cart</NavLink></li>
            </ul>

            <div className="relative " >
                <span className="fa-stack fa-2x has-badge" >
                    <i className="fa-solid fa-cart-shopping"></i>
                </span>
                <div className="absolute w-[20px] h-[20px] rounded-full inset-0 left-6 top-1 bg-red-500 ">
                    <p className="text-center text-xs font-bold">{cart.carts.length}</p>
                </div>
            </div>
        </nav>
    )
}

export default Header