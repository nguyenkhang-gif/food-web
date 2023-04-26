import React, { useEffect, useState } from 'react'
import '../styles/FooditemPage.css'
import { productsData } from '../db.js'

const DATA = [
    {
        id: 1,
        deliveryInfo: "Delivered between Monday aug and thusday  20 from 8am to 21:00pm",
        returnPo: "Delivered between are double check before deliver"
    },
    {
        id: 2,
        deliveryInfo: "Delivered between Monday aug and thusday  20 from 8am to 21:00pm",
        returnPo: "Delivered between are double check before deliver"
    },
    {
        id: 3,
        deliveryInfo: "Delivered between Monday aug and thusday  20 from 8am to 21:00pm",
        returnPo: "Delivered between are double check before deliver"
    },
    {
        id: 4,
        deliveryInfo: "Delivered between Monday aug and thusday  20 from 8am to 21:00pm",
        returnPo: "Delivered between are double check before deliver"
    }
]



const FooditemPage = () => {
    const pathID = window.location.pathname
    const [foodInfo, setFoodInfo] = useState()
    const [foodNamePrice, setFoodNamePrice] = useState()
    useEffect(() => {
        DATA.forEach(item => {
            if (pathID.split('/')[2] == item.id) setFoodInfo(item);
        })
        productsData.forEach(item => {
            if (pathID.split('/')[2] == item.id) setFoodNamePrice(item);
        })
        // productsData
        console.log(pathID.split('/')[2])
    }, [])

    return (
        <div className='fooditempage-main-container'>
            <div className="item-info-container">
                {/* left nav */}
                <div className="left-nav-container">
                    <div className="img-container">
                        <img src={foodNamePrice?.imgurl} alt="" />
                    </div>
                    {/* item name price and add to cart button container  */}
                    {foodNamePrice ?
                        <div className="container-name-price-addtocartbtn">
                            <p className='Name'>{foodNamePrice.Name}</p>
                            <p className='Price'>{foodNamePrice.Price} đ</p>
                            <button>thêm vào giỏ </button>
                        </div>
                        : null}
                    {/* end of  item name price and add to cart button container  */}
                </div>
                {/* end of left nav */}
                {/* right nav */}
                <div className="right-nav-container">
                    
                </div>

                {/* end of right nav */}
            </div>
            {/* comment container */}
            {/*  end of comment container */}
        </div>
    )
}

export default FooditemPage