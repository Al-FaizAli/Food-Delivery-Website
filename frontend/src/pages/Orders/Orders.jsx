import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import './Orders.css'
const MyOrders = () => {
    const [data, setData] = useState([])
    const { token } = useContext(StoreContext)
    const fetchOrders = async () => {
        const response = await axios.post("http://localhost:5000/userOrders", {}, { headers: {token} })
        setData(response.data.data)
    }
    useEffect(() => {
        if (token) {
            fetchOrders()
        }
    }, [token])
    return (
        <div>
            {data.map((order, index) => (
                <div key={index} className="order-card">
                    <p>Order #{index + 1}</p>
                    <div className="order-items">
                        {order.items.map((item, itemIndex) => (
                            <p key={itemIndex}>
                                {item.name} x {item.quantity}
                            </p>
                        ))}
                    </div>
                    <p>Total Amount: ${order.amount}.00</p>
                    <p>Items: {order.items.length}</p>
                    <p>
                        <span>&#x25cf;</span> <b>{order.status}</b>
                    </p>
                    <button onClick={fetchOrders}>Track Order</button>
                </div>
            ))}
        </div>
    );
};

export default MyOrders;
