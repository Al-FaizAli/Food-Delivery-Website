import React, { useContext, useState, useRef, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Login from '../Login/Login';
import cartimg from './cart.svg';
import { StoreContext } from '../../context/StoreContext';
import 'primeicons/primeicons.css';

const Navbar = () => {
    const [current, setCurrent] = useState('home');
    const [signup, setSignup] = useState(false);
    const { token, setToken } = useContext(StoreContext);
    const [userMenuVisible, setUserMenuVisible] = useState(false);
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false); // New state for hamburger menu
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 400);

    const navigate = useNavigate();
    const location = useLocation();
    const userMenuRef = useRef(null);

    const toggleUserMenu = () => {
        setUserMenuVisible(!userMenuVisible);
    };

    const handleClickOutside = (event) => {
        if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
            setUserMenuVisible(false);
        }
    };

    useEffect(() => {
        if (userMenuVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [userMenuVisible]);

    useEffect(() => {
        const path = location.pathname;
        if (path === '/') {
            setCurrent('home');
        } else if (path === '/about') {
            setCurrent('about');
        } else if (path === '/contact') {
            setCurrent('contact');
        } else if (path === '/cart') {
            setCurrent('cart');
        } else if (path === '/orders') {
            setCurrent('orders');
        }
    }, [location.pathname]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 400);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    };

    return (
        <>
            {signup && <Login setSignup={setSignup} />}
            <nav>
                <ul className="navbar">
                    <li className="name" onClick={() => navigate('/')}>FoodCorner.</li>
                    {isMobileView ? (
                        <>
                            <li className="hamburger" onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}>
                                <i className="pi pi-bars" style={{ fontSize: '2.5rem', cursor: 'pointer' }} />
                            </li>
                            {isHamburgerOpen && (
                                <div className="hamburgerMenu">
                                    <li key="home">
                                        <Link to="/" onClick={() => { setCurrent('home'); setIsHamburgerOpen(false); }} className={current === 'home' ? 'home' : 'link'}>
                                            Home
                                        </Link>
                                    </li>
                                    <li key="about">
                                        <Link to="/about" onClick={() => { setCurrent('about'); setIsHamburgerOpen(false); }} className={current === 'about' ? 'home' : 'link'}>
                                            About
                                        </Link>
                                    </li>
                                    <li key="contact">
                                        <Link to="/contact" onClick={() => { setCurrent('contact'); setIsHamburgerOpen(false); }} className={current === 'contact' ? 'home' : 'link'}>
                                            Contact
                                        </Link>
                                    </li>
                                    <li key="cart">
                                        <Link to="/cart" onClick={() => { setCurrent('cart'); setIsHamburgerOpen(false); }} className={current === 'cart' ? 'home' : 'link'}>
                                            <img src={cartimg} alt="Cart" />
                                        </Link>
                                    </li>
                                    {!token ?
                                        <li>
                                            <button className="loginBtn" onClick={() => { setSignup(true); setIsHamburgerOpen(false); }}>SignIn</button>
                                        </li> :
                                        (
                                            <div className="userMenu">
                                                <li onClick={() => { navigate('/orders'); setIsHamburgerOpen(false); }}>Orders</li>
                                                <li onClick={() => { logout(); setIsHamburgerOpen(false); }}>Logout</li>
                                            </div>
                                        )
                                    }
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <li key="home">
                                <Link to="/" onClick={() => setCurrent('home')} className={current === 'home' ? 'home' : 'link'}>
                                    Home
                                </Link>
                            </li>
                            <li key="about">
                                <Link to="/about" onClick={() => setCurrent('about')} className={current === 'about' ? 'home' : 'link'}>
                                    About
                                </Link>
                            </li>
                            <li key="contact">
                                <Link to="/contact" onClick={() => setCurrent('contact')} className={current === 'contact' ? 'home' : 'link'}>
                                    Contact
                                </Link>
                            </li>
                            <li key="cart">
                                <Link to="/cart" onClick={() => setCurrent('cart')} className={current === 'cart' ? 'home' : 'link'}>
                                    <img src={cartimg} alt="Cart" />
                                </Link>
                            </li>
                            {!token ?
                                <li>
                                    <button className="loginBtn" onClick={() => setSignup(true)}>SignIn</button>
                                </li> :
                                (
                                    <div className="userMenu">
                                        <i className="pi pi-user" onClick={toggleUserMenu} style={{ fontSize: '2.5rem', cursor: 'pointer' }} />
                                        {userMenuVisible && (
                                            <div className="dropdownMenu" ref={userMenuRef}>
                                                <li onClick={() => navigate('/orders')}>Orders</li>
                                                <li onClick={logout}>Logout</li>
                                            </div>
                                        )}
                                    </div>
                                )
                            }
                        </>
                    )}
                </ul>
            </nav>
        </>
    );
};

export default Navbar;
