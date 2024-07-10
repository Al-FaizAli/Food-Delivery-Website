import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './List.css';
import { toast } from 'react-toastify';
import { url } from './Add';
const Get = () => {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const response = await axios.post(`${url}/getFoods`);
    setItems(response.data.items);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleClick = async (itemId) => {
    try {
      const response = await axios.post(`${url}/deleteFood`, { id: itemId });
      await fetchItems();
      if (response.data.success) {
        toast.success(response.data.message)
      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  return (
    <div className='food-list-admin'>
      <h1>List Food Items</h1>
      <table className="food-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td><img src={`${url}/images/${item.image}`} alt={item.name} className="item-image" /></td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.category}</td>
              <td>{item.price}</td>
              <td><div className='removeButton' onClick={() => handleClick(item._id)}>X</div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Get;
