import CartContext from './cart-context'
import { useReducer } from 'react'

const defaultCartState={
    items:[],
    totalAmount:0
}
const cartReducer= (state,action)=>{
    if(action.type==='ADD'){
        // const updatedItems=state.items.concat(action.item)
        const updatedTotalAmount=state.totalAmount+action.item.price*action.item.amount;//amount here is quantity of food item purchased like 1 packet or 2 plates etc

        const existingCartItemIndex=state.items.findIndex(
            (item) => item.id===action.item.id
        )
        const existingCartItem=state.items [existingCartItemIndex]
        let updatedItems;
        
        if(existingCartItem){
            const updatedItem={
                ...existingCartItem,
                amount:existingCartItem.amount +action.item.amount
            }
            // console.log(action.item.name)
             updatedItems=[... state.items]
            updatedItems[existingCartItemIndex]=updatedItem;
        }else{
            console.log(action.item.name)
            
            updatedItems=state.items.concat(action.item)
        }
    return{
        items:updatedItems,
        totalAmount:updatedTotalAmount
    }
}
    if(action.type=='REMOVE' ){
        
        const existingCartItemIndex=state.items.findIndex(
            (item) => item.id===action.id
        )
        const existingCartItem=state.items[existingCartItemIndex]
        const updatedTotalAmount=state.totalAmount-existingCartItem.price;
        let updatedItems

        if(existingCartItem.amount==1){
            updatedItems=state.items.filter(
                item => item.id!==action.id
            )
        }else{
            const updatedItem={...existingCartItem,amount:existingCartItem.amount -1}
            updatedItems=[...state.items]
            updatedItems[existingCartItemIndex]=updatedItem;
        }
        return{
            items:updatedItems,
            totalAmount:updatedTotalAmount
        }
        

    }
    if(action.type==='CLEAR'){
        return defaultCartState;
    }
    
    return defaultCartState;
}
const CartProvider =props =>{
    const [cartState,dispatchCartAction]=useReducer(cartReducer,defaultCartState);
    const addItemToCartHandler=item=>{
        dispatchCartAction({type:'ADD' ,item:item})
    }
    const removeItemToCartHandler= id =>{
        dispatchCartAction({type:'REMOVE' ,id:id})
    }
    const clearCartHandler=()=>{
        dispatchCartAction({type:'CLEAR'})
    }
    const cartContext={
    items:cartState.items,
    totalAmount:cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem:removeItemToCartHandler,
    clearCart:clearCartHandler
    }
    return (
        <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
    )
}
export default CartProvider