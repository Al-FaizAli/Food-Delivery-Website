import express from 'express'
import cors from 'cors'
import './middlewares/db.js'
import signUpUser from './middlewares/SignUpUser.js'
import logInUser from './middlewares/LoginUser.js'
import addFood from './middlewares/AddFood.js'
import multer from 'multer';
import getAllFood from './middlewares/GetAllFood.js'
import deleteFood from './middlewares/DeleteFood.js'
import path from 'path'
import { fileURLToPath } from 'url';
import { addToCart, getCart, removeFromCart } from './controller/cartControllser.js'
import { authMiddleware } from './middlewares/auth.js'
import { placeOrder, verifyOrder } from './controller/orderController.js'

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json({ limit: '50mb' }))

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true
}));
app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    res.send("Hello World")
})
app.post('/login', logInUser)
app.post('/signup', signUpUser)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });
//Admin 
app.post('/addFood', upload.single('image'), addFood);
app.post('/getFoods', getAllFood)
app.post('/deleteFood', deleteFood)

//Cart
app.post('/addToCart', authMiddleware, addToCart);
app.post('/removeFromCart', authMiddleware, removeFromCart)
app.post('/getCart', authMiddleware, getCart)

//PlaceOrder
app.post("/placeOrder", authMiddleware, placeOrder)
app.post("/verifyOrderPayment", verifyOrder)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`App running on port http://localhost:${PORT}`)
})