import React, { useState } from 'react'
import './App.css'
import Add from './components/Add'
import Get from './components/List'
import Delete from './components/Orders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const [add, setAdd] = useState(false)
  const [get, setGet] = useState(false)
  const [remove, setRemove] = useState(false)
  const [state, setState] = useState('')
  return (
    <div className='main'>
      <ToastContainer />
      <div className='sidebar'>
        <div className='buttons'>
          <button className={state === 'add' ? 'active btn' : 'btn add-item'} onClick={() => { setAdd(true), setGet(false), setRemove(false), setState('add') }}>Add Food Item</button>
          <button className={state === 'list' ? 'active btn' : 'btn get-items'} onClick={() => { setAdd(false), setGet(true), setRemove(false), setState('list') }}>List Food Items</button>
          <button className={state === 'orders' ? 'active btn' : 'btn delete-item'} onClick={() => { setAdd(false), setGet(false), setRemove(true), setState('orders') }}>Orders</button>
        </div>
      </div>
      <div className='forms'>
        {!add && !get && !remove && <div className="fade-in">
          <h1>Welcome To Admin Panel</h1>
        </div>}
        {
          add && <Add /> ||
          get && <Get /> ||
          remove && <Delete />
        }
      </div>
    </div>

  )
}

export default App