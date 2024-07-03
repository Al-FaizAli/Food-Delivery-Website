import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../Card/Card';
import './Items.css'
import { StoreContext } from '../../context/StoreContext';

const Items = ({ category }) => {
    const { url } = useContext(StoreContext);
    const [items, setItems] = useState([]);
    const fetchItems = async () => {
        const response = await axios.post(`${url}/getFoods`);
        setItems(response.data.items);
    };
    useEffect(() => {
        fetchItems();
    }, []);
    return (
        <div className='parent-div'>
            <h1>Explore Food Items</h1>
            <div className="parent-item">
                {items.map((item, index) => {
                    if (category === "All" || category === item.category) {
                        return <Card key={index} item={item} />
                    }
                })}
            </div>
        </div>

    )
}

export default Items