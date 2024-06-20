import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
    // const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [token, setToken] = useState('');
    const [cartItems, setCartItems] = useState({})
    const [foodList, setFoodList] = useState([]);
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post('http://localhost:5000/addToCart', { itemId }, { headers: { token } })
        }
    }
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post('http://localhost:5000/removeFromCart', { itemId }, { headers: { token } })
        }
    }

    const fetchFoodList = async () => {
        const response = await axios.post('http://localhost:5000/getFoods');
        setFoodList(response.data.items)
    };
    const loadCartData = async (token) => {
        const response = await axios.post('http://localhost:5000/getCart', {}, { headers: { token } });
        setCartItems(response.data.cartData)
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList()
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData();
    }, []);
    const contextValue = {
        token,
        setToken,
        addToCart,
        removeFromCart,
        fetchFoodList,
        cartItems,
        foodList
    };
    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
