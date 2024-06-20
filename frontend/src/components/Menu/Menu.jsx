import React, { useState } from 'react'
import './Menu.css'
import foodimg from './food.png'
const Menu = () => {
    const categories = ["Appetizers", "Main Courses", "Desserts", "Drinks"];
    // const [category, setCategory] = useState('');
    const [active, setActive] = useState(null);
    // const [items,setItems]=useState([])
    const toggle = (index) => {
        if (index === active) {
            setActive(null);
            // setCategory(''); // Reset category when deselected
        } else {
            setActive(index);
            // setCategory(categories[index]);
        }
    }
    return (

        <div className='parent-div'>
            <h1>Menu</h1>
            <div className='parent-card' >
                {categories.map((item, index) => (
                    <div className='card' key={index}>
                        <img onClick={() => toggle(index)} src={foodimg} alt='card' className={active === index ? 'Active' : ''} />
                        <p>{item}</p>
                    </div>))}
            </div>
        </div>
    )
}

export default Menu;