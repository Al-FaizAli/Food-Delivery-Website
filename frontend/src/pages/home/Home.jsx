import React, { useState } from 'react'
import Items from "../../components/Items/Items.jsx"
import Menu from "../../components/Menu/Menu.jsx"
import './home.css'

const Home = () => {
    const [category, setCategory] = useState("All")
    return (
        <>

            <Menu category={category} setCategory={setCategory}/>
            <Items category={category}/>
        </>
    )
}

export default Home