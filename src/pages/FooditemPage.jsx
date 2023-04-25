import React, { useEffect, useState } from 'react'
import '../styles/FooditemPage.css'


const DATA = [
    {
        id:1,
        deliveryInfo:"Delivered between Monday aug and thusday  20 from 8am to 21:00pm",
        returnPo:"Delivered between are double check before deliver"
    },
    {
        id:2,
        deliveryInfo:"Delivered between Monday aug and thusday  20 from 8am to 21:00pm",
        returnPo:"Delivered between are double check before deliver"
    },
    {
        id:3,
        deliveryInfo:"Delivered between Monday aug and thusday  20 from 8am to 21:00pm",
        returnPo:"Delivered between are double check before deliver"
    },
    {
        id:4,
        deliveryInfo:"Delivered between Monday aug and thusday  20 from 8am to 21:00pm",
        returnPo:"Delivered between are double check before deliver"
    }
]



const FooditemPage = () => {
    const pathID= window.location.pathname
    const [foodInfo,setFoodInfo]=useState()
    useEffect(()=>{ 
        DATA.forEach(item=>{
            if(pathID.split('/')[2]==item.id)setFoodInfo(item);
        })
        console.log(pathID.split('/')[2])
    },[])

  return (
    <div className='fooditempage-main-container'>
        <div className="left-nav-container">
            <div className="container-img">
                <img src="../assets/food_img/hambuger.png" alt="" />
            </div>
            <div className="container-item-price-name">
                <h1>Mac and cheese</h1>
                <p>9000$</p>
                <button className='btn-add-to-cart' onClick={()=>{alert("addd to cart function")}}>add to cart</button>
            </div>
        </div>
        <div className="right-nav-container">
            <h1>delivery Info:</h1>
            <p>
            {foodInfo? foodInfo.deliveryInfo:null}
            </p>
            <h1>return Info:</h1>
            <p>
            {foodInfo? foodInfo.returnPo :null}
            </p>

            <div className="comments-container">
                
            </div>
        </div>
    </div>
  )
}

export default FooditemPage