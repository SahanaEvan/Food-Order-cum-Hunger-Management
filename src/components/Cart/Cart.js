import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import { Fragment, useContext,useState } from 'react'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'
import Checkout from './Checkout'
const Cart = props => {
    const [isSubmitting,setIsSubmitting]=useState()
    const [didSubmit,setDidSubmit]=useState(false);
    const cartCtx=useContext(CartContext)

    const totalAmount=`$${cartCtx.totalAmount.toFixed(2)}`

    const hasItems=cartCtx.items.length>0;
    const cartItemRemoveHandler= id =>{
        cartCtx.removeItem(id);
    }
    const cartItemAddHandler =item =>{
        cartCtx.addItem({...item,amount:1})
    }
    const submitOrderHandler=async (userData)=>{
        setIsSubmitting(true);
        console.log(userData)
        const response=await fetch('https://food-app-29959-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json',{
            method:'POST',
            body:JSON.stringify({
                user:userData,
                orderedItems:cartCtx.items
            })
        })
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }
    const cartItems =
        <ul className={classes['cart-items']}>{
            cartCtx.items.map(item =>(
            <CartItem
             key={item.id}
              name={item.name}
               amount={item.amount}
                price={item.price}
                 onRemove={cartItemRemoveHandler.bind(null,item.id)} onAdd={cartItemAddHandler.bind(null,item)} >

                 </CartItem>))}
        </ul>
    const [isCheckout,setIsCheckout]=useState(false);
    const orderHandler=()=>{
        setIsCheckout(true)
    }

    const modalactions=<div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
    {hasItems && <button className={classes.button}
    onClick={orderHandler}>Order</button>}</div>

    const cartModalContent=<Fragment>
        {cartItems}
            
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
            {!isCheckout && modalactions}
    </Fragment>
    // const isSubmittingModalConstant=<p>Sending order data...</p>
    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting &&  !didSubmit &&cartModalContent}
            {isSubmitting && <p>Submitting order data...</p>}
            {!isSubmitting && didSubmit && <p>Successfully sent order</p>}
        </Modal>
    )
}
export default Cart