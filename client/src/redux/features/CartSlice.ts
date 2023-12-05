import { createSlice } from "@reduxjs/toolkit";


const initialState:any={
    carts:[]}

const cartSlice:any=createSlice({
    name:'cartSlice',
    initialState,
    reducers:{
        addToCart:(state:any,action:any)=>{
            const ItemIndex=state.carts.findIndex((item:any)=>item.id===action.payload.id);
            // console.log(ItemIndex);
            if(ItemIndex>=0){
                state.carts[ItemIndex].qnty+=1
            }else{
                const temp={...action.payload,qnty:1}
                state.carts=[...state.carts,temp]}
            },
        removeFromCart:(state:any,action:any)=>{ 
                let result=state.carts.filter((item:any)=>item.id!==action.payload.id)
                state.carts=[...result]
            
            },
        removeSingle:(state:any,action:any)=>{
            const ItemIndex=state.carts.findIndex((item:any)=>item.id===action.payload.id);
            if(ItemIndex>=1){
                state.carts[ItemIndex].qnty-=1
            }
        }    ,
        emptyCart:(state:any,action:any)=>{
            state.carts.length=0
        }

    },  
    
})

export const {addToCart,removeFromCart,removeSingle,emptyCart} =cartSlice.actions;
export default cartSlice.reducer;