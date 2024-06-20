import React from 'react'
import './PlaceOrder.css'
const PlaceOrder = () => {
    return (
        <div className='placeorder'>
            <form>
                <h1>Delivery Information</h1>
                <input type='text' placeholder='Full Name' />
                <input type='text' placeholder='Email' />
                <input type='text' placeholder='Street' />
                <div className='inputs'>
                    <input type='text' placeholder='City' />
                    <input type='text' placeholder='State' />
                </div>
                <div className='inputs'>
                    <input type='text' placeholder='Zipcode' />
                    <input type='text' placeholder='Country' />
                </div>
                <input type='text' placeholder='Phone' />
            </form>
            <div className='cart-total'>
                <h2>Cart Totals</h2>
                <div className='cart-total-div'><p>Subtotal</p><p>${10}</p></div>
                <div className='cart-total-div'><p>Delivery Fee</p><p>${2}</p></div>
                <div className='cart-total-div'><p>Total</p><p>${12}</p></div>
                <button onClick={() => navigate('/placeOrder')}>Proceed To Payment</button>
            </div>
        </div>
    )
}

export default PlaceOrder