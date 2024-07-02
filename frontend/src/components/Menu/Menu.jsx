import React, { useState } from 'react';
import './Menu.css';

import mealImage from '../../assets/Meal.jpg';
import saladImage from '../../assets/Salad.jpg';
import biryaniImage from '../../assets/Biryani.jpg';
import dinnerImage from '../../assets/Dinner.jpg';
import appetizerImage from '../../assets/Appetizer.jpg';
import mainCourseImage from '../../assets/MainCourse.jpg';
import dessertImage from '../../assets/Dessert.jpg';
import beverageImage from '../../assets/Beverage.jpeg';

const menu_list = [
    { name: "Meal", image: mealImage },
    { name: "Salad", image: saladImage },
    { name: "Biryani", image: biryaniImage },
    { name: "Dinner", image: dinnerImage },
    { name: "Appetizer", image: appetizerImage },
    { name: "Main Course", image: mainCourseImage },
    { name: "Dessert", image: dessertImage },
    { name: "Beverage", image: beverageImage }
];

const Menu = ({ category, setCategory }) => {
    const [active, setActive] = useState(null);

    const toggle = (index) => {
        if (index === active) {
            setActive(null);
            setCategory("All"); 
        } else {
            setActive(index);
            setCategory(menu_list[index].name);
        }
    }

    return (
        <div className='parent-div'>
            <h1>Explore Menu</h1>
            <div className='parent-card'>
                {menu_list.map((item, index) => (
                    <div className='card' key={index}>
                        <img
                            onClick={() => toggle(index)}
                            src={item.image}
                            alt={item.name}
                            className={active === index ? 'Active' : ''}
                        />
                        <p>{item.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Menu;
