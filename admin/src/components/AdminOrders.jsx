import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminOrders.css';
import { url } from './Add';

const AdminOrders = () => {
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.get(`${url}/listAllOrders`);
    setData(response.data.data);
  };
  const statusHandler = async (event, orderId) => {
    const response = await axios.post(`${url}/updateStatus`, { orderId, status: event.target.value });
    if (response.data.success) {
      await fetchOrders()
    }
  }
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h1>All Orders</h1>
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
          <div className="order-address">
            <p className="order-item-name">{order.address.fullName} </p>
            <p>{order.address.email}</p>
            <p className="order-item-address">{order.address.street}</p>
            <p>{order.address.city}, {order.address.state}, {order.address.zipcode}</p>
            <p>{order.address.phone}</p>
          </div>
          <p>
            <span></span> <b>
              <select onChange={(e) => statusHandler(e, order._id)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </b>
          </p>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
