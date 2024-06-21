import React, { useState, useContext, useEffect } from 'react';
import './Card.css';
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import { StoreContext } from '../../context/StoreContext';

const Card = ({ index, item }) => {
  const { addToCart, removeFromCart, cartItems } = useContext(StoreContext);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(cartItems[item._id] || 0);
  }, [cartItems, item._id]);

  const handleAdd = () => {
    setCount(prev => prev + 1);
    addToCart(item._id);
  };

  const handleRemove = () => {
    if (count > 0) {
      setCount(prev => prev - 1);
      removeFromCart(item._id);
    }
  };

  return (
    <div key={index} className="item-card">
      <img src={`http://localhost:5000/images/${item.image}`} alt={item.name} className="item-image" />
      <div className="item-content">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <p className="item-category">{item.category}</p>
        <p className="item-price">${item.price}</p>
      </div>
      {!count ? (
        <IoIosAddCircle onClick={handleAdd} className='add-btn' />
      ) : (
        <div className='add-box'>
          <IoIosRemoveCircle onClick={handleRemove} className='add-btn-in' />
          <button className='cnt-btn'>{count}</button>
          <IoIosAddCircle onClick={handleAdd} className='add-btn-in' />
        </div>
      )}
    </div>
  );
};

export default Card;
