import React, { useEffect, useState } from 'react'
import '../styles/Home.css'
// import '../assets/food_img/hambuger.png'
import homepagebg from '../assets/homepagebg.png'
import FoodItem from '../component/FoodItem'
import { FiSearch } from 'react-icons/fi'
import { productsData } from '../db.js'

const Data = [
    {
        id: 1,
        name: 'food_name 1',
        price: '9000đ',
        imgurl: '../assets/food_img/hambuger.png'
    },
    {
        id: 2,
        price: '9000đ',
        name: 'food_name 2',
        imgurl: '../assets/food_img/hambuger.png'
    },
    {
        id: 3,
        name: 'food_name 1',
        price: '9000đ',
        imgurl: '../assets/food_img/hambuger.png'
    },
    {
        id: 4,
        name: 'food_name 1',
        price: '9000đ',
        imgurl: '../assets/food_img/hambuger.png'
    },
    {
        id: 5,
        name: 'food_name 1',
        price: '9000đ',
        imgurl: '../assets/food_img/hambuger.png'
    },
]

const Home = () => {
    const [allproduct,setAllProduct]= useState([])
    useEffect(()=>{
        setAllProduct(productsData)
    },[])
    return (
        <div className='home-main-container'>
            <div className="intro-container" >
                <img src='../assets/homepagebg.png' alt="this is an " />
                <div className="content-container">
                    <p>Food app</p>
                    <h1>Why stay hungry when you can order from Bella OnoJie</h1>
                    <p>Download food app</p>
                </div>
            </div>
            {/* <img src='../assets/hambuger.png' alt="this is an " /> */}
            {/* <FoodItem imgurl='../assets/food_img/hambuger.png' /> */}
            {/* search bar */}
            {/* start of search bar */}

            <div className="container-search-bar">
                <div className="container-inner">
                    <input type="text" placeholder='tìm món ăn yêu thích của bạn' />
                    <FiSearch className='icon-search' />
                </div>
            </div>

            {/* end of search bar */}

            <div className="food-item-container">
                {allproduct.map((item) => {
                    return (<FoodItem id={item.id} key={item.id} price={item.Price} imgurl={item.imgurl} name={item.Name} />)
                })}
            </div>
        </div>
    )
}

export default Home