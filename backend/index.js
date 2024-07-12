import express from 'express'
import cors from 'cors'
import './middlewares/db.js'
import signUpUser from './middlewares/SignUpUser.js'
import logInUser from './middlewares/LoginUser.js'
import addFood from './middlewares/AddFood.js'
import multer from 'multer';
import getAllFood from './middlewares/GetAllFood.js'
import deleteFood from './middlewares/DeleteFood.js'
import { addToCart, getCart, removeFromCart } from './controller/cartControllser.js'
import { authMiddleware } from './middlewares/auth.js'
import { listAllOrders, placeOrder, updateStatus, userOrders, verifyOrder } from './controller/orderController.js'
import dotenv from 'dotenv';

dotenv.config();


const app = express()
app.use(express.json())

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'https://food-delivery-website-frontend-0xby.onrender.com', 'https://food-delivery-website-admin-tr5c.onrender.com'],
    credentials: true
}));

app.use('/images', express.static("uploads"));

//user
app.post('/login', logInUser)
app.post('/signup', signUpUser)

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });
//Admin 
app.post('/addFood', upload.single("image"), addFood);
app.post('/getFoods', getAllFood)
app.post('/deleteFood', deleteFood)

//Cart
app.post('/addToCart', authMiddleware, addToCart);
app.post('/removeFromCart', authMiddleware, removeFromCart)
app.post('/getCart', authMiddleware, getCart)

//PlaceOrder
app.post("/placeOrder", authMiddleware, placeOrder)
app.post("/verifyOrderPayment", verifyOrder)
app.post("/userOrders", authMiddleware, userOrders)
app.get("/listAllOrders", listAllOrders)
app.post("/updateStatus", updateStatus)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`App running on port http://localhost:${PORT}`)
})