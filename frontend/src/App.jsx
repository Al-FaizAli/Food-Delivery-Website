import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from "react-router-dom";
import Home from './pages/home/Home';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import Cart from './pages/Cart/Cart';
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Order from './pages/Orders/Orders.jsx';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx';
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/orders' element={<Order />}></Route>
        <Route path='/placeOrder' element={<PlaceOrder />}></Route>
      </Routes>
    </div>
  );
}

export default App;
