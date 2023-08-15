import classes from './Checkout.module.css';
import {useRef,useState} from 'react'

//helper functions
const isEmpty=value =>value.trim()==='';
const isPostalValid =value =>value.trim().length !==5;

const Checkout = (props) => {

  const [formInputsValidity , setFormInputValildity]=useState({
    name:true,
    street:true,
    city:true,
    postalCode:true
  })

  const nameInputRef=useRef();
  const streetInputRef=useRef();
  const postalInputRef=useRef();
  const cityInputRef=useRef();

  const confirmHandler = (event) => {
    //get the user input 
    event.preventDefault();
    const name=nameInputRef.current.value;
    const street=streetInputRef.current.value;
    const city=cityInputRef.current.value;
    const postal=postalInputRef.current.value;

    //validate these inputs 
    //our values is not empty and postal code is 5 digits long
    const nameValid=!isEmpty(name);
    const streetValid=!isEmpty(street);
    const cityValid=!isEmpty(city);
    const postalValid=!isPostalValid(postal);
    //if all inputs are valid then form is valid
    setFormInputValildity({
      name:nameValid,
      street:streetValid,
      city:cityValid,
      postalCode:postalValid

    })
    const formvalid=nameValid && streetValid && cityValid && postalValid;

    if(!formvalid){
      //now we tell user whats wrong we dont want to submit form
      return;
    }
    //submit cart data;
    props.onConfirm({
      name:name,
      street:street,
      city:city,
      postal:postal
    });

  };

  const nameControlClasses=`${classes.control} ${formInputsValidity.name ? '' :classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}> 
        <label htmlFor='name'>Your Name</label>
        <input ref={nameInputRef} type='text' id='name' />
        {!formInputsValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.street ? '' :classes.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input  ref={streetInputRef} type='text' id='street' />
        {!formInputsValidity.street && <p>Please enter a valid street</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.postal ? '' :classes.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input ref={postalInputRef}  type='text' id='postal' />
        {!formInputsValidity.postalCode && <p>Please enter a valid postal code</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.city ? '' :classes.invalid}`}>
        <label htmlFor='city'>City</label>
        <input ref={cityInputRef}  type='text' id='city' />
        {!formInputsValidity.city && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;