
const headers = {
    "Content-Type": "application/json"
}

export async function PostApiStripe(body:any){

    try {
        const response = await fetch('http://localhost:7000/api/stripepay/create-checkout-session', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        })
    
        const session = await response.json();
        return session 

    }catch(e:any) {
        console.error(e)
    }
    
}

export async function PostApiRazorPay(body:any){
    try {
        const response = await fetch('http://localhost:7000/api/rezorpay/order-create-checkout-session', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        })
    
        const session = await response.json();
        return session 
        

    }
    catch(err:any){

    }
}

export async function PostApiRazorPayVerify(body:any){
    try {
        const response = await fetch('http://localhost:7000/api/rezorpay/verify-create-checkout-session', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        })
    
        const session = await response.json();
        return session 
        

    }
    catch(err:any){

    }
}