import { useEffect, useState } from "react";
import { redirect } from "react-router-dom";

function Cancel() {
    const [time, setTime] = useState(10);


    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         setTime((prev) => prev - 1);
    //     }, 1000);

    //     return () => {
    //         clearInterval(intervalId);
    //     };
    // }, []);

    // // Redirect to the main page when the timer reaches 0
    // useEffect(() => {
    //     if (time === 0) {
    //         // Use the history object to navigate to the main page
    //         redirect("/"); // Replace "/main-page" with the actual path of your main page
    //     }
    // }, [time, history]);

    return (
        <section className="flex justify-center items-center bg-cyan-100 w-screen h-[95vh] flex-col">
            <h1>Payment Cancel</h1>
            <p>This Page Will Redirect to the main Page in {time} seconds</p>
        </section>
    );
}

export default Cancel;
