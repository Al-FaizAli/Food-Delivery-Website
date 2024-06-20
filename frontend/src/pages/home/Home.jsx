import React from 'react'
import Items from "../../components/Items/Items.jsx"
import Menu from "../../components/Menu/Menu.jsx"
import './home.css'
// import { useState } from "react"

const Home = () => {
    return (
        <>

            <Menu />
            <h1>Items</h1>
            <Items />
        </>
    )
}

export default Home