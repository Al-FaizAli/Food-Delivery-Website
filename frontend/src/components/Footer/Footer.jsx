import React from 'react'
import './Footer.css'
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-logo">
                    <h2>FoodCorner</h2>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type
                        specimen book.
                    </p>
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-facebook"></i>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-twitter"></i>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-linkedin"></i>
                        </a>
                    </div>
                </div>
                <div className="footer-links">
                    <h3>Company</h3>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About us</a></li>
                        <li><a href="#delivery">Delivery</a></li>
                        <li><a href="#privacy">Privacy policy</a></li>
                    </ul>
                </div>
                <div className="footer-contact">
                    <h3>Get in Touch</h3>
                    <p>+1-212-456-7890</p>
                    <p>contact@foodcorner.com</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>Copyright 2024 © FoodCorner.com - All Right Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer