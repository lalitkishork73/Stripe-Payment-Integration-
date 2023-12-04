import Card from "./CartDetails"
import Cardsdata from "./CardData"

function Home() {
    return (
        <main className="bg-gray-700 h-screen flex items-center justify-center">
            <div className="max-w-screen-2xl  w-[100%] h-full bg-white flex gap-3 p-2 flex-wrap ">

                {Cardsdata.map((items) => <div key={items.id}>
                    <Card items={items} />
                </div>)}
            </div>
        </main>
    )
}

export default Home