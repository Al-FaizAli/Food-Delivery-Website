import React, { useState } from 'react'
import './App.css'
import Add from './components/Add'
import Get from './components/List'
import AdminOrder from './components/AdminOrders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const [add, setAdd] = useState(false)
  const [get, setGet] = useState(false)
  const [orders, setOrders] = useState(false)
  const [state, setState] = useState('')
  return (
    <div className='main'>
      <ToastContainer />
      <div className='sidebar'>
        <div className='buttons'>
          <button className={state === 'add' ? 'active btn' : 'btn add-item'} onClick={() => { setAdd(true), setGet(false), setOrders(false), setState('add') }}>Add Food Item</button>
          <button className={state === 'list' ? 'active btn' : 'btn get-items'} onClick={() => { setAdd(false), setGet(true), setOrders(false), setState('list') }}>List Food Items</button>
          <button className={state === 'orders' ? 'active btn' : 'btn delete-item'} onClick={() => { setAdd(false), setGet(false), setOrders(true), setState('orders') }}>Orders</button>
        </div>
      </div>
      <div className='forms'>
        {!add && !get && !orders && <div className="fade-in">
          <h1>Welcome To Admin Panel</h1>
        </div>}
        {
          add && <Add /> ||
          get && <Get /> ||
          orders && <AdminOrder />
        }
      </div>
    </div>

  )
}

export default App