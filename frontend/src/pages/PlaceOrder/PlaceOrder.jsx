import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './PlaceOrder.css';
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext.jsx';

const PlaceOrder = () => {

    const { token, foodList, cartItems, getTotalCartAmount } = useContext(StoreContext);
    const [data, setData] = useState({
        fullName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    });
    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const placeOrder = async (event) => {
        event.preventDefault();
        let orderItems = [];

        if (foodList && cartItems) {
            foodList.forEach((item) => {
                if (cartItems[item._id] > 0) {
                    let itemInfo = { ...item, quantity: cartItems[item._id] };
                    orderItems.push(itemInfo);
                }
            });
        }

        let orderData = {
            address: data,
            items: orderItems,
            amount: 0,
        };

        try {
            let response = await axios.post("http://localhost:5000/placeOrder", orderData, { headers: { token } });
            console.log(response);
            if (response.data.success) {
                const { session_url } = response.data;
                window.location.replace(session_url);
            } else {
                alert("Error: " + (response.data.message || "Unknown error occurred"));
            }
        } catch (error) {
            console.error("Error placing order:", error);
            alert("There was an error placing your order. Please try again.");
        }
    };
    const navigate = useNavigate()
    useEffect(() => {
        if (!token || !getTotalCartAmount()) {
            navigate('/cart')
        }
    }, [token])

    return (
        <div className='placeorder'>
            <form onSubmit={placeOrder}>
                <div className='delivery-information'>
                    <h1>Delivery Information</h1>
                    <input name='fullName' type='text' placeholder='Full Name' onChange={onChangeHandler} value={data.fullName} required />
                    <input name='email' type='text' placeholder='Email' onChange={onChangeHandler} value={data.email} required />
                    <input name='street' type='text' placeholder='Street' onChange={onChangeHandler} value={data.street} required />
                    <div className='inputs'>
                        <input name='city' type='text' placeholder='City' onChange={onChangeHandler} value={data.city} required />
                        <input name='state' type='text' placeholder='State' onChange={onChangeHandler} value={data.state} required />
                    </div>
                    <div className='inputs'>
                        <input name='zipcode' type='text' placeholder='Zipcode' onChange={onChangeHandler} value={data.zipcode} required />
                        <input name='country' type='text' placeholder='Country' onChange={onChangeHandler} value={data.country} required />
                    </div>
                    <input name='phone' type='text' placeholder='Phone' onChange={onChangeHandler} value={data.phone} required />
                </div>
                <div className='cart-total'>
                    <h2>Cart Totals</h2>
                    <div className='cart-total-div'><p>Subtotal</p><p>${getTotalCartAmount()}</p></div>
                    <div className='cart-total-div'><p>Delivery Fee</p><p>${getTotalCartAmount() > 0 ? 2 : 0}</p></div>
                    <div className='cart-total-div'><p>Total</p><p>${getTotalCartAmount() > 0 ? getTotalCartAmount() + 2 : 0}</p></div>
                    <button type='submit'>Proceed To Payment</button>
                </div>
            </form>
        </div>
    );
};

export default PlaceOrder;
