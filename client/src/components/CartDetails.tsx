
function CartDetails({ items }: any) {
    return (
        <>
            <div className=" w-[290px] h-[400px] bg-black text-white rounded-lg p-1 ">
                <div className="w-[280px] h-[250px] rounded-lg my-2">
                    <img src={items.imgdata} alt={items.dish} className="w-[100%] h-[100%] rounded-lg " />
                </div>
                <div className="flex justify-between px-2 h-auto">
                    <p className="font-bold ">{items.dish}</p>
                    <p className="bg-green-600 rounded-md px-2 text-sm font-bold text-center">{items.rating} <span> <i className="fa-solid fa-star" style={{ color: 'white', fontSize: 11 }}></i></span></p>
                </div>
                <div className="flex justify-between px-2 text-sm ">
                    <p>{items.address} </p>
                    <p className="text-green-500 font-bold">{items.price} ₹</p>
                </div>
                <div className="w-auto h-[1px] bg-white mx-2 "></div>
                <div className="flex justify-around px-2 my-3 items-center">
                    <div>
                        <img src={items.arrimg} alt="arrImage" className="w-[20px] h-[20px]" />
                    </div>
                    <div>
                        <button className="bg-cyan-500 text-white bottom-0 font-bold rounded-md px-6 hover:drop-shadow-md ">Add To Cart</button>
                    </div>
                    <div>
                        <img src={items.delimg} alt="delImg" className="w-[45px] h-[15px]"/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartDetails