import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from "react-router-dom";
import Home from './pages/home/Home';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import Cart from './pages/Cart/Cart';
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyOrders from './pages/Orders/Orders.jsx';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx';
import Verify from './pages/Verify/Verify.jsx';
import Footer from './components/Footer/Footer.jsx';
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
        <Route path='/orders' element={<MyOrders />}></Route>
        <Route path='/placeOrder' element={<PlaceOrder />}></Route>
        <Route path='/verify' element={<Verify />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
