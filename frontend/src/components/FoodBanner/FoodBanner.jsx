import React from 'react';
import './FoodBanner.css';
import foodBanner from '../../assets/foodBanner.webp';

const FoodBanner = () => {
    return (
        <div className="food-banner" style={{ }}>
            <div className="overlay">
            <h1>Want to pick up your food ?</h1>
            <h1>Just select, order and enjoy your favourite food.</h1>
            </div>
        </div>
    );
};

export default FoodBanner;
