import React, { useContext } from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';

const Cart = () => {
  const { cartItems, foodList, removeFromCart } = useContext(StoreContext);
  const navigate = useNavigate()
  return (
    <div className='cart'>
      <div className='cart-heading'>
        <p>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Status</p>
      </div>
      <div className="cart-parent-item">
        {foodList.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index} className='cart-table'>
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>{item.price * cartItems[item._id]}</p>
                <p className='remove' onClick={() => removeFromCart(item._id)}>X</p>
              </div>
            )
          }
          return null;
        })}
      </div>
      <div className='checkout'>
        <div className='cart-total'>
          <h2>Cart Totals</h2>
          <div className='cart-total-div'><p>Subtotal</p><p>${10}</p></div>
          <div className='cart-total-div'><p>Delivery Fee</p><p>${2}</p></div>
          <div className='cart-total-div'><p>Total</p><p>${12}</p></div>
          <button onClick={() => navigate('/placeOrder')}>Proceed To Checkout</button>
        </div>
        <div>
          <p>If you have a promo code, Enter it here</p>
          <div className='promo'>
            <input placeholder='Enter promo code'/>
            <button className='promo-button'>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
