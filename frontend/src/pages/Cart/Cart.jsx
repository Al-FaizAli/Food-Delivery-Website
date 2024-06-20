import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';

const Cart = () => {
  const { cartItems, foodList, removeFromCart } = useContext(StoreContext);

  return (
    <div className='cart'>
      <h1>Cart</h1>
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
        <button>Proceed To Checkout</button>

      </div>
    </div>
  );
};

export default Cart;
