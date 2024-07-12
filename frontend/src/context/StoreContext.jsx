import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
    const url = 'https://food-delivery-website-backend-poh1.onrender.com'
    // const url = 'http://localhost:5000'
    const [token, setToken] = useState('');
    const [cartItems, setCartItems] = useState({});
    const [foodList, setFoodList] = useState([]);

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token) {
            await axios.post(`${url}/addToCart`, { itemId }, { headers: { token } });
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            await axios.post(`${url}/removeFromCart`, { itemId }, { headers: { token } });
        }
    };

    const fetchFoodList = async () => {
        const response = await axios.post(url + "/getFoods");
        setFoodList(response.data.items);
    };

    const loadCartData = async (token) => {
        const response = await axios.post(`${url}/getCart`, {}, { headers: { token } });
        setCartItems(response.data.cartData);
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = foodList.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += cartItems[item] * itemInfo.price;
                }
            }
        }
        return totalAmount;
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
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
        foodList,
        getTotalCartAmount,
        url
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
