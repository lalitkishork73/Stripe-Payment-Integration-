
function Header() {
    return (
        <nav className="flex bg-black text-white h-[60px] justify-around">
            <div>
                <h1>E commerce</h1>
            </div>
            <div className="relative " >
                <span className="fa-stack fa-2x has-badge" >
                    <i className="fa-solid fa-cart-shopping"></i>
                </span>
                <div className="absolute w-[20px] h-[20px] rounded-full inset-0 left-6 top-1 bg-red-500 ">
                    <p className="text-center text-xs font-bold">1</p>
                </div>
            </div>
        </nav>
    )
}

export default Header