import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../Card/Card';
import './Items.css'
const Items = () => {
    const [items, setItems] = useState([]);
    const fetchItems = async () => {
        const response = await axios.post('http://localhost:5000/getFoods');
        setItems(response.data.items);
    };
    useEffect(() => {
        fetchItems();
    }, []);
    return (
        <div className="parent-item">
            {items.map((item, index) => (<Card key={index} item={item} />))}
        </div>

    )
}

export default Items