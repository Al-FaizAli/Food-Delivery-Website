import React, { useState } from 'react'
import Items from "../../components/Items/Items.jsx"
import Menu from "../../components/Menu/Menu.jsx"
import './home.css'
import PlayStore from '../../assets/play_store.avif'
import AppStore from '../../assets/app_store.avif'
import FoodBanner from '../../components/FoodBanner/FoodBanner.jsx'

const Home = () => {
    const [category, setCategory] = useState("All")
    return (
        <div>
            <FoodBanner />
            <Menu category={category} setCategory={setCategory} />
            <Items category={category} />
            <div className='mobile-app'>
                <h3>For better experience,download the FoodCorner app now</h3>
                <div className='play-app-images'>
                    <img src={PlayStore} alt='' />
                    <img src={AppStore} alt='' />
                </div>
            </div>
        </div>
    )
}

export default Home